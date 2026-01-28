/* ================= FOOTER YEAR ================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ================= MOBILE NAV ================= */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

/* ================= HOME PAGE CAROUSEL ================= */
window.addEventListener('load', () => {
  const track = document.querySelector('.home-carousel .carousel-track');
  const items = document.querySelectorAll('.home-carousel .project-box');
  const left = document.querySelector('.home-carousel .carousel-arrow.left');
  const right = document.querySelector('.home-carousel .carousel-arrow.right');
  const wrapper = document.querySelector('.home-carousel .carousel-wrapper');

  if (!track || items.length === 0 || !left || !right || !wrapper) return;

  let currentTranslate = 0;
  const gap = parseInt(getComputedStyle(track).gap) || 40;

  function getItemWidth() {
    return items[0].getBoundingClientRect().width;
  }

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

  // Arrow click
  left.addEventListener('click', () => {
    currentTranslate += getItemWidth() + gap;
    updateTranslate();
  });
  right.addEventListener('click', () => {
    currentTranslate -= getItemWidth() + gap;
    updateTranslate();
  });

  // Continuous arrow hold
  let scrollInterval = null;
  function startScroll(direction) {
    stopScroll();
    scrollInterval = setInterval(() => {
      currentTranslate -= direction * 10;
      updateTranslate();
    }, 16);
  }
  function stopScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }

  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('mouseleave', stopScroll);

  // Drag support
  let dragging = false,
    startX = 0,
    prevTranslate = 0;
  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    stopScroll();
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    updateTranslate();
  });

  // Recalculate on resize
  window.addEventListener('resize', updateTranslate);

  updateTranslate();
});
