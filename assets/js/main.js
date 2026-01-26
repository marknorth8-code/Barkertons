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

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.project-box');
  const left = document.querySelector('.carousel-arrow.left');
  const right = document.querySelector('.carousel-arrow.right');
  const wrapper = document.querySelector('.carousel-wrapper');

  if (!track || items.length === 0 || !left || !right || !wrapper) {
    console.warn('Carousel elements not found');
    return;
  }

  let currentTranslate = 0;
  const gap = parseInt(getComputedStyle(track).gap) || 40;
  const itemWidth = items[0].offsetWidth;
  const totalWidth = items.length * (itemWidth + gap) - gap;
  const wrapperWidth = wrapper.offsetWidth;
  const maxScroll = totalWidth - wrapperWidth;

  // Hide arrows if everything fits
  if (maxScroll <= 0) {
    left.style.display = 'none';
    right.style.display = 'none';
  }

  function updateTranslate() {
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < -maxScroll) currentTranslate = -maxScroll;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Continuous scrolling
  let scrollInterval = null;

  function startScroll(direction) {
    stopScroll();
    scrollInterval = setInterval(() => {
      currentTranslate -= direction * 10;
      updateTranslate();
    }, 16); // ~60fps
  }

  function stopScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('mouseleave', stopScroll);

  left.addEventListener('click', () => { currentTranslate += itemWidth + gap; updateTranslate(); });
  right.addEventListener('click', () => { currentTranslate -= itemWidth + gap; updateTranslate(); });

  updateTranslate();

  // Drag support
  let dragging = false, startX = 0, prevTranslate = 0;

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    stopScroll();
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    const moved = currentTranslate - prevTranslate;
    if (moved < -50) currentTranslate -= itemWidth + gap;
    if (moved > 50) currentTranslate += itemWidth + gap;
    updateTranslate();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    updateTranslate();
  });

  window.addEventListener('resize', () => {
    const newWrapperWidth = wrapper.offsetWidth;
    const newMaxScroll = totalWidth - newWrapperWidth;
    if (currentTranslate < -newMaxScroll) currentTranslate = -newMaxScroll;
    updateTranslate();
  });
});

/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});
