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

// The sky stays daytime while the top of the page is in view, then turns to night over the
// next half screen of scrolling; the colour theme flips with it halfway. Text sits on the
// bare sky only near the top, so the dusk in between is kept short.
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

// Blinks at uneven gaps, sometimes twice in a row, so it looks alive rather than on a loop.
// The blink's own length lives in site.css; the next one waits for it to finish.
function setUpOwlBlink() {
  const owl = document.querySelector(".sky-owl");
  const lid = owl?.querySelector(".owl-lids circle");
  if (!lid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let blinksLeft = 0;

  function blink(times) {
    blinksLeft = times;
    owl.classList.add("blink");
  }

  lid.addEventListener("animationend", () => {
    owl.classList.remove("blink");
    blinksLeft--;
    if (blinksLeft > 0) setTimeout(() => blink(blinksLeft), 300);
    else setTimeout(() => blink(Math.random() < 0.25 ? 2 : 1), 4000 + Math.random() * 6000);
  });

  setTimeout(() => blink(1), 1500 + Math.random() * 2000);
}

setUpLightbox();
setUpSky();
setUpOwlBlink();
