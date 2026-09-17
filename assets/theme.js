(() => {
  const storageKey = "pulse-theme";
  const modes = ["system", "light", "dark"];
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function getMode() {
    try {
      const saved = localStorage.getItem(storageKey);
      return modes.includes(saved) ? saved : "system";
    } catch {
      return "system";
    }
  }

  function resolvedTheme(mode) {
    return mode === "system" ? (media.matches ? "dark" : "light") : mode;
  }

  function apply(mode) {
    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = mode;
    }

    const resolved = resolvedTheme(mode);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", resolved === "dark" ? "#0f1218" : "#f7f8fb");
    }

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.dataset.mode = mode;
      button.setAttribute("aria-label", `Theme: ${mode}. Activate to switch theme.`);
      button.setAttribute("title", `Theme: ${mode}`);

      const icon = button.querySelector("[data-theme-icon]");
      const label = button.querySelector("[data-theme-label]");
      if (icon) icon.textContent = mode === "dark" ? "☾" : mode === "light" ? "☀" : "◐";
      if (label) label.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    });
  }

  function setMode(mode) {
    try {
      if (mode === "system") localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, mode);
    } catch {}
    apply(mode);
  }

  function cycleMode() {
    const current = getMode();
    setMode(modes[(modes.indexOf(current) + 1) % modes.length]);
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply(getMode());
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", cycleMode);
    });
  });

  const onSystemChange = () => {
    if (getMode() === "system") apply("system");
  };

  if (typeof media.addEventListener === "function") media.addEventListener("change", onSystemChange);
  else if (typeof media.addListener === "function") media.addListener(onSystemChange);
})();
