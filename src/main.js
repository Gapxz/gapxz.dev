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

// Navigation stays visible at every screen size, including without JavaScript.
const navigation = document.querySelector("#navigation");
const navLinks = [...navigation.querySelectorAll("a")];
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    const target = document.querySelector(link.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }),
);
const sections = [...document.querySelectorAll("main section[id]")];
function updateCurrentSection() {
  const atBottom =
    window.scrollY > 0 &&
    Math.ceil(window.scrollY + window.innerHeight) >= root.scrollHeight;
  const current = atBottom
    ? sections.at(-1)
    : sections
        .filter((section) => section.getBoundingClientRect().top <= 150)
        .at(-1) || sections[0];
  navLinks.forEach((link) => {
    if (link.hash === `#${current.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", updateCurrentSection, { passive: true });
window.addEventListener("resize", updateCurrentSection);
updateCurrentSection();

// Move only the glass reflection; navigation stays still and readable.
const glassNavigation = document.querySelector(".nav-shell");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const reducedTransparency = matchMedia(
  "(prefers-reduced-transparency: reduce)",
);
glassNavigation.addEventListener("pointermove", (event) => {
  if (
    reducedMotion.matches ||
    reducedTransparency.matches ||
    event.pointerType !== "mouse"
  )
    return;
  const bounds = glassNavigation.getBoundingClientRect();
  glassNavigation.style.setProperty(
    "--light-x",
    `${event.clientX - bounds.left}px`,
  );
  glassNavigation.style.setProperty(
    "--light-y",
    `${event.clientY - bounds.top}px`,
  );
});
glassNavigation.addEventListener("pointerleave", () => {
  glassNavigation.style.removeProperty("--light-x");
  glassNavigation.style.removeProperty("--light-y");
});

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
