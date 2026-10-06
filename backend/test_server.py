"""Run with python backend/test_server.py. Uses a temporary catalog only."""
import json
from pathlib import Path
import tempfile
import threading
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from http.server import ThreadingHTTPServer
import server


def check():
    original = server.DATA
    with tempfile.TemporaryDirectory() as directory:
        server.DATA = Path(directory) / "projects.json"
        server.DATA.write_text("[]", encoding="utf-8")
        http = ThreadingHTTPServer(("127.0.0.1", 0), server.Handler)
        http.admin_key, http.failures = "test-secret-at-least-24-characters", []
        worker = threading.Thread(target=http.serve_forever, daemon=True)
        worker.start()
        def request(method, path, value=None, token=http.admin_key, etag=None):
            headers = {"Content-Type": "application/json", "Authorization": "Bearer " + token}
            if etag:
                headers["If-Match"] = etag
            req = Request(f"http://127.0.0.1:{http.server_port}{path}", data=json.dumps(value).encode() if value is not None else None, headers=headers, method=method)
            try:
                response = urlopen(req, timeout=3)
            except HTTPError as error:
                response = error
            with response:
                return response.status, json.load(response), response.headers.get("ETag")
        try:
            status, projects, initial = request("GET", "/api/projects", token="")
            assert status == 200 and projects == []
            assert request("GET", "/api/admin/projects", token="wrong")[0] == 401
            sample = {"id":"test-project", "name":"Projeto de teste", "category":"Web", "kind":"Site", "description":"Descrição", "summary":"Resumo", "languages":["Python"], "tags":["Python"], "status":"Concluído", "details":["Funcionalidade"], "learning":"Aprendizado", "url":"https://github.com/Gapxz"}
            assert request("POST", "/api/admin/projects", sample, token="wrong", etag=initial)[0] == 401
            assert request("POST", "/api/admin/projects", {**sample, "url":"javascript:alert(1)"}, etag=initial)[0] == 400
            assert request("POST", "/api/admin/projects", {**sample, "id":"../bad"}, etag=initial)[0] == 400
            status, projects, current = request("POST", "/api/admin/projects", sample, etag=initial)
            assert status == 200 and projects[0]["id"] == "test-project"
            assert server.read_catalog() == projects
            assert request("PUT", "/api/admin/projects/test-project", sample, etag=initial)[0] == 409
            assert request("POST", "/api/admin/projects", sample, etag=current)[0] == 400
            status, projects, current = request("PUT", "/api/admin/projects/test-project", {**sample,"name":"Editado"}, etag=current)
            assert status == 200 and projects[0]["name"] == "Editado"
            assert server.DATA.with_suffix(".json.bak").exists()
            assert request("DELETE", "/api/admin/projects/test-project", token="wrong", etag=current)[0] == 401
            assert request("DELETE", "/api/admin/projects/test-project", etag=current)[1] == []
            assert server.read_catalog() == []
            print("Authentication, validation, persistence, update conflicts, backup and CRUD passed.")
        finally:
            http.shutdown()
            http.server_close()
            worker.join()
            server.DATA = original

if __name__ == "__main__":
    check()
