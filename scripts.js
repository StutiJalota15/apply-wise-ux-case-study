(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active nav link on scroll (simple)
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 120;
    let activeId = "";
    for (const s of sections) {
      if (s.offsetTop <= y) activeId = s.id;
    }
    links.forEach(a => {
      const isActive = a.getAttribute("href") === `#${activeId}`;
      a.style.color = isActive ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.72)";
      a.style.background = isActive ? "rgba(255,255,255,.06)" : "transparent";
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();

