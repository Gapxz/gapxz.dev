"""Local portfolio editor. Standard library only; bind to loopback behind Next.js."""
import hashlib
import hmac
import json
import os
from pathlib import Path
import re
import secrets
import shutil
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
DATA = Path(os.environ.get("PORTFOLIO_DATA", ROOT / "src/data/projects.json"))
KEY_FILE = ROOT / ".portfolio-admin.key"
LOCK = threading.RLock()


def validate_project(value):
    if not isinstance(value, dict):
        raise ValueError("Projeto inválido.")
    limits = {"id": 80, "name": 100, "category": 50, "kind": 100, "description": 240,
              "summary": 2000, "status": 80, "learning": 1500}
    result = {}
    for key, limit in limits.items():
        text = value.get(key)
        if not isinstance(text, str) or not text.strip() or len(text) > limit:
            raise ValueError(f"Campo {key}: preencha entre 1 e {limit} caracteres.")
        result[key] = text.strip()
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", result["id"]):
        raise ValueError("Identificador: use letras minúsculas, números e hífens.")
    for key, limit in {"languages": 40, "tags": 60, "details": 500}.items():
        values = value.get(key)
        if not isinstance(values, list) or not 1 <= len(values) <= 12:
            raise ValueError(f"Informe de 1 a 12 itens em {key}.")
        if any(not isinstance(item, str) or not item.strip() or len(item) > limit for item in values):
            raise ValueError(f"Itens de {key} precisam ter até {limit} caracteres.")
        result[key] = list(dict.fromkeys(item.strip() for item in values))
    for key in ("url", "demo"):
        url = value.get(key, "")
        if not isinstance(url, str) or len(url) > 1000:
            raise ValueError("Link inválido.")
        if url.strip():
            parsed = urlsplit(url.strip())
            if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
                raise ValueError("Use links HTTPS sem credenciais.")
            result[key] = url.strip()
    return result


def read_catalog():
    return json.loads(DATA.read_text(encoding="utf-8-sig"))


def version(projects):
    return '"' + hashlib.sha256(json.dumps(projects, sort_keys=True).encode()).hexdigest() + '"'


def save_catalog(projects):
    DATA.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=DATA.parent, suffix=".tmp", delete=False) as temp:
        pending = Path(temp.name)
        json.dump(projects, temp, ensure_ascii=False, indent=2)
        temp.write("\n")
        temp.flush()
        os.fsync(temp.fileno())
    try:
        if DATA.exists():
            shutil.copy2(DATA, DATA.with_suffix(".json.bak"))
        os.replace(pending, DATA)
    finally:
        pending.unlink(missing_ok=True)


class Handler(BaseHTTPRequestHandler):
    server_version = "PortfolioAPI"

    def log_message(self, *_args):
        pass  # Never log request credentials or user-entered content.

    def reply(self, status, data, etag=None):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        if etag:
            self.send_header("ETag", etag)
        self.end_headers()
        self.wfile.write(body)

    def authenticated(self):
        now = time.monotonic()
        with LOCK:
            self.server.failures = [t for t in self.server.failures if now - t < 60]
            if len(self.server.failures) >= 20:
                self.reply(429, {"error": "Muitas tentativas. Aguarde um minuto."})
                return False
            supplied = self.headers.get("Authorization", "")
            if not hmac.compare_digest(supplied.encode(), ("Bearer " + self.server.admin_key).encode()):
                self.server.failures.append(now)
                self.reply(401, {"error": "Senha administrativa inválida."})
                return False
        return True

    def do_GET(self):
        path = urlsplit(self.path).path
        if path not in ("/api/projects", "/api/admin/projects"):
            self.reply(404, {"error": "Rota não encontrada."})
            return
        if path.startswith("/api/admin") and not self.authenticated():
            return
        try:
            with LOCK:
                projects = read_catalog()
            self.reply(200, projects, version(projects))
        except (OSError, ValueError):
            self.reply(500, {"error": "Não foi possível ler o catálogo. Os arquivos foram preservados."})

    def mutate(self):
        path = urlsplit(self.path).path
        prefix = "/api/admin/projects"
        if path != prefix and not path.startswith(prefix + "/"):
            self.reply(404, {"error": "Rota não encontrada."})
            return
        if not self.authenticated():
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 <= length <= 65536:
                self.reply(413, {"error": "Projeto muito grande."})
                return
            value = json.loads(self.rfile.read(length)) if length else None
            with LOCK:
                projects = read_catalog()
                if self.headers.get("If-Match") != version(projects):
                    self.reply(409, {"error": "O catálogo mudou. Recarregue os projetos antes de salvar."})
                    return
                project_id = path[len(prefix):].lstrip("/")
                index = next((i for i, p in enumerate(projects) if p["id"] == project_id), None)
                if self.command == "POST" and path == prefix:
                    item = validate_project(value)
                    if len(projects) >= 100 or any(p["id"] == item["id"] for p in projects):
                        raise ValueError("Identificador já usado ou limite de 100 projetos atingido.")
                    projects.append(item)
                elif self.command in ("PUT", "DELETE") and index is not None:
                    if self.command == "DELETE":
                        projects.pop(index)
                    else:
                        item = validate_project(value)
                        if item["id"] != project_id:
                            raise ValueError("O identificador de um projeto existente não pode mudar.")
                        projects[index] = item
                else:
                    self.reply(404, {"error": "Projeto não encontrado."})
                    return
                save_catalog(projects)
                self.reply(200, projects, version(projects))
        except (ValueError, TypeError) as error:
            self.reply(400, {"error": str(error)})
        except OSError:
            self.reply(500, {"error": "Não foi possível salvar. Confira as permissões do arquivo."})

    do_POST = mutate
    do_PUT = mutate
    do_DELETE = mutate


def main():
    key = os.environ.get("PORTFOLIO_ADMIN_KEY")
    if not key:
        if not KEY_FILE.exists():
            KEY_FILE.write_text(secrets.token_urlsafe(32), encoding="utf-8")
        key = KEY_FILE.read_text(encoding="utf-8").strip()
    if len(key) < 24:
        raise SystemExit("Use uma senha administrativa de pelo menos 24 caracteres.")
    server = ThreadingHTTPServer(("127.0.0.1", int(os.environ.get("PORTFOLIO_API_PORT", "8766"))), Handler)
    server.admin_key, server.failures = key, []
    print(f"Editor Python em http://127.0.0.1:{server.server_port}", flush=True)
    print("Abra /admin no portfólio. A senha fica em .portfolio-admin.key (não versionada).", flush=True)
    server.serve_forever()

if __name__ == "__main__":
    main()
