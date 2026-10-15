// Theme: follow the system until the visitor chooses their own preference.
const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
let preference = null;
try {
  preference = localStorage.getItem("gap-theme");
} catch {}

function applyTheme() {
  const dark =
    preference === "dark" || (preference !== "light" && systemTheme.matches);
  root.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.title = dark ? "Ativar modo claro" : "Ativar modo escuro";
  document.querySelector('meta[name="theme-color"]').content = dark
    ? "#111112"
    : "#fafafa";
}
applyTheme();
themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  preference = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("gap-theme", preference);
  } catch {}
  applyTheme();
});
systemTheme.addEventListener("change", applyTheme);
window.addEventListener("storage", (event) => {
  if (event.key === "gap-theme" || event.key === null) {
    preference = event.newValue;
    applyTheme();
  }
});

// The links remain available when JavaScript is disabled.
const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");
const mobile = matchMedia("(max-width: 767px)");
function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector("span").textContent = open
    ? "Fechar menu"
    : "Abrir menu";
  navigation.hidden = mobile.matches && !open;
}
menuButton.hidden = false;
setMenu(false);
menuButton.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
mobile.addEventListener("change", () => setMenu(false));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-shell")) setMenu(false);
});
const navLinks = [...navigation.querySelectorAll("a")];
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    setMenu(false);
    const target = document.querySelector(link.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }),
);
const sections = [...document.querySelectorAll("main section[id]")];
function updateCurrentSection() {
  const current =
    sections
      .filter((section) => section.getBoundingClientRect().top <= 150)
      .at(-1) || sections[0];
  navLinks.forEach((link) => {
    if (link.hash === `#${current.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", updateCurrentSection, { passive: true });
updateCurrentSection();

// Always leave the username visible for manual copying.
const copyButton = document.querySelector("#copy-discord");
const copyStatus = document.querySelector("#copy-status");
copyButton.hidden = false;
copyButton.addEventListener("click", async () => {
  copyButton.disabled = true;
  copyStatus.textContent = "";
  try {
    await navigator.clipboard.writeText(
      document.querySelector("#discord-username").textContent.trim(),
    );
    copyStatus.textContent = "Usuário gapxz copiado. Até lá no Discord!";
  } catch {
    copyStatus.textContent =
      "Não foi possível copiar automaticamente. Selecione o nome gapxz acima e copie manualmente.";
  } finally {
    copyButton.disabled = false;
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
