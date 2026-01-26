/* ================= FOOTER YEAR ================= */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ================= HEADER / FOOTER LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => header.innerHTML = html);
  }

  if (footer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => footer.innerHTML = html);
  }
});

/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});

window.addEventListener('load', () => {
  const carousel = document.querySelector('.home-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const items = carousel.querySelectorAll('.project-box');
  const left = carousel.querySelector('.carousel-arrow.left');
  const right = carousel.querySelector('.carousel-arrow.right');
  const wrapper = carousel.querySelector('.carousel-wrapper');

  if (!track || items.length === 0 || !left || !right || !wrapper) {
    console.warn('Home carousel elements not found');
    return;
  }

  // Wait for images inside carousel to load
  let imagesLoaded = 0;
  items.forEach(item => {
    const img = item.querySelector('img');
    if (img.complete) imagesLoaded++;
    else img.addEventListener('load', () => {
      imagesLoaded++;
      if (imagesLoaded === items.length) initCarousel();
    });
  });

  if (imagesLoaded === items.length) initCarousel();

  function initCarousel() {
    let currentTranslate = 0;
    const gap = parseInt(getComputedStyle(track).gap) || 40;

    function getItemWidth() { return items[0].getBoundingClientRect().width; }
    function getMaxScroll() {
      const itemWidth = getItemWidth();
      const totalWidth = items.length * (itemWidth + gap) - gap;
      const wrapperWidth = wrapper.getBoundingClientRect().width;
      return Math.max(totalWidth - wrapperWidth, 0);
    }

    function updateTranslate() {
      const maxScroll = getMaxScroll();
      if (currentTranslate > 0) currentTranslate = 0;
      if (currentTranslate < -maxScroll) currentTranslate = -maxScroll;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    left.addEventListener('click', () => { currentTranslate += getItemWidth() + gap; updateTranslate(); });
    right.addEventListener('click', () => { currentTranslate -= getItemWidth() + gap; updateTranslate(); });

    // Drag support
    let dragging = false, startX = 0, prevTranslate = 0;
    track.addEventListener('mousedown', e => { dragging = true; startX = e.pageX; prevTranslate = currentTranslate; });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      currentTranslate = prevTranslate + (e.pageX - startX);
      updateTranslate();
    });

    window.addEventListener('resize', updateTranslate);

    updateTranslate();
  }
});

  /* ---------- Recalculate on Resize ---------- */
  window.addEventListener('resize', updateTranslate);

  updateTranslate();
});
