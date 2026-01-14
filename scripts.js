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
      a.style.color = "";
      a.style.background = "";
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // Carousel
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector(".car-viewport");
  const slides = [...carousel.querySelectorAll(".car-slide")];
  const prevBtn = carousel.querySelector(".car-prev");
  const nextBtn = carousel.querySelector(".car-next");
  const dotsWrap = document.querySelector(".car-dots");
  const dots = dotsWrap ? [...dotsWrap.querySelectorAll(".dot")] : [];

  const slideWidth = () => viewport.clientWidth || 1;

  const goTo = (i) => {
    const idx = Math.max(0, Math.min(i, slides.length - 1));
    viewport.scrollTo({ left: idx * slideWidth(), behavior: "smooth" });
  };

  const currentIndex = () => Math.round(viewport.scrollLeft / slideWidth());

  const setDot = (idx) => {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  };

  prevBtn?.addEventListener("click", () => goTo(currentIndex() - 1));
  nextBtn?.addEventListener("click", () => goTo(currentIndex() + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  let t = null;
  viewport.addEventListener("scroll", () => {
    window.clearTimeout(t);
    t = window.setTimeout(() => setDot(currentIndex()), 80);
  }, { passive: true });

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(currentIndex() - 1);
    if (e.key === "ArrowRight") goTo(currentIndex() + 1);
  });

  setDot(0);
})();
