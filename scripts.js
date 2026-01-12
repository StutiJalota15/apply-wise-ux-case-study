(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active nav link on scroll (class-based)
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
      a.classList.toggle("is-active", isActive);
      // ✅ remove any old inline styles that may still exist from previous versions
      if (a.style) {
        a.style.color = "";
        a.style.background = "";
      }
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
