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
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // =========================
  // Carousel (Key screens)
  // =========================
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector(".car-viewport");
  const slides = [...carousel.querySelectorAll(".car-slide")];
  const prevBtn = carousel.querySelector(".car-prev");
  const nextBtn = carousel.querySelector(".car-next");
  const dotsWrap = document.querySelector(".car-dots");
  const dots = dotsWrap ? [...dotsWrap.querySelectorAll(".dot")] : [];

  if (!viewport || slides.length === 0) return;

  const goTo = (i) => {
    const idx = Math.max(0, Math.min(i, slides.length - 1));
    // ✅ correct scroll target even with padding/gap
    viewport.scrollTo({ left: slides[idx].offsetLeft, behavior: "smooth" });
    setDot(idx);
  };

  const setDot = (idx) => {
    if (!dots.length) return;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  };

  const currentIndex = () => {
    // ✅ find the slide whose center is closest to viewport center
    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;

    slides.forEach((s, i) => {
      const slideCenter = s.offsetLeft + s.clientWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    return best;
  };

  prevBtn?.addEventListener("click", () => goTo(currentIndex() - 1));
  nextBtn?.addEventListener("click", () => goTo(currentIndex() + 1));

  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  // Update dots on scroll (debounced)
  let t = null;
  viewport.addEventListener("scroll", () => {
    window.clearTimeout(t);
    t = window.setTimeout(() => setDot(currentIndex()), 80);
  }, { passive: true });

  // Keyboard support
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(currentIndex() - 1);
    if (e.key === "ArrowRight") goTo(currentIndex() + 1);
  });

  // Init
  setDot(0);

  // Re-sync on resize
  window.addEventListener("resize", () => {
    setDot(currentIndex());
  }, { passive: true });
})();
