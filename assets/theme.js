(() => {
  const storageKey = "pulse-theme";
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const order = ["system", "light", "dark"];
  const labels = {
    system: "◐ System",
    light: "☀ Light",
    dark: "☾ Dark"
  };
  const names = {
    system: "System",
    light: "Light",
    dark: "Dark"
  };

  function readPreference() {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === "light" || saved === "dark" ? saved : "system";
    } catch {
      return "system";
    }
  }

  let preference = readPreference();

  function resolvedTheme() {
    if (preference !== "system") return preference;
    return systemTheme.matches ? "dark" : "light";
  }

  function updateThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute("content", resolvedTheme() === "dark" ? "#0f1117" : "#f7f8fb");
  }

  function updateButtons() {
    const next = order[(order.indexOf(preference) + 1) % order.length];
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.textContent = labels[preference];
      button.setAttribute(
        "aria-label",
        `Theme: ${names[preference]}. Switch to ${names[next].toLowerCase()} theme.`
      );
      button.title = `Theme: ${names[preference]}`;
    });
  }

  function applyPreference() {
    if (preference === "system") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = preference;
    }
    updateButtons();
    updateThemeColor();
  }

  function savePreference() {
    try {
      if (preference === "system") {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, preference);
      }
    } catch {}
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".theme-toggle");
    if (!button) return;

    preference = order[(order.indexOf(preference) + 1) % order.length];
    savePreference();
    applyPreference();
  });

  systemTheme.addEventListener?.("change", () => {
    if (preference === "system") updateThemeColor();
  });

  applyPreference();
})();
