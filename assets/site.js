function setUpLightbox() {
  const dialog = document.querySelector(".lightbox");
  if (!dialog) return;
  const image = dialog.querySelector("img");
  const caption = dialog.querySelector("p");

  function open(source) {
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    caption.textContent = source.closest("figure")?.querySelector("figcaption")?.textContent ?? "";
    dialog.showModal();
  }

  for (const source of document.querySelectorAll("main img.screen")) {
    source.classList.add("zoomable");
    source.tabIndex = 0;
    source.setAttribute("role", "button");
    source.setAttribute("aria-haspopup", "dialog");
    source.addEventListener("click", () => open(source));
    source.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open(source);
    });
  }

  dialog.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => image.removeAttribute("src"));
}

// The home page sky stays daytime while the hero is in view, then turns to night over the
// next half screen of scrolling; the colour theme flips with it halfway. Text sits on the
// bare sky only in the hero, so the dusk in between is kept short.
function setUpSky() {
  if (!document.querySelector(".sky")) return;
  const root = document.documentElement;
  let pending = false;

  function update() {
    pending = false;
    const progress = Math.min(1, Math.max(0, (window.scrollY - window.innerHeight * 0.3) / (window.innerHeight * 0.5)));
    const night = progress * progress * (3 - 2 * progress);
    root.style.setProperty("--night", night.toFixed(3));
    root.dataset.theme = night >= 0.5 ? "dark" : "light";
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

setUpLightbox();
setUpSky();
