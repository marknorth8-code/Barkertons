/* ================= FOOTER YEAR ================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ================= HEADER / FOOTER LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => header.innerHTML = html)
      .then(() => initMobileNav()); // init hamburger after load
  }

  if (footer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => footer.innerHTML = html);
  }
});

/* ================= MOBILE NAV ================= */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  });
}

/* ================= HOME PAGE CAROUSEL ================= */
window.addEventListener('load', () => { // wait for images
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.project-box');
  const left = document.querySelector('.carousel-arrow.left');
  const right = document.querySelector('.carousel-arrow.right');
  const wrapper = document.querySelector('.carousel-wrapper');

  if (!track || items.length === 0 || !left || !right || !wrapper) return;

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

  // Arrow click
  left.addEventListener('click', () => { currentTranslate += getItemWidth() + gap; updateTranslate(); });
  right.addEventListener('click', () => { currentTranslate -= getItemWidth() + gap; updateTranslate(); });

  // Arrow hold scrolling
  let scrollInterval = null;
  function startScroll(direction) {
    stopScroll();
    scrollInterval = setInterval(() => {
      currentTranslate -= direction * 10;
      updateTranslate();
    }, 16);
  }
  function stopScroll() { clearInterval(scrollInterval); scrollInterval = null; }

  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('mouseleave', stopScroll);

  // Drag
  let dragging = false, startX = 0, prevTranslate = 0;
  track.addEventListener('mousedown', e => { dragging = true; startX = e.pageX; prevTranslate = currentTranslate; stopScroll(); });
  window.addEventListener('mouseup', () => { dragging = false; });
  window.addEventListener('mousemove', e => { if (!dragging) return; currentTranslate = prevTranslate + (e.pageX - startX); updateTranslate(); });

  window.addEventListener('resize', updateTranslate);

  updateTranslate();
});
