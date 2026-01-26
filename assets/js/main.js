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

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.project-box');
const left = document.querySelector('.carousel-arrow.left');
const right = document.querySelector('.carousel-arrow.right');

if (track && items.length && left && right) {
  const wrapper = document.querySelector('.carousel-wrapper');
  let currentTranslate = 0;
  const itemWidth = items[0].offsetWidth;
  const gap = parseInt(getComputedStyle(track).gap) || 40;
  const maxScroll = (itemWidth + gap) * items.length - wrapper.offsetWidth;
  let scrollInterval = null;

  function updateTranslate() {
    // Clamp translate between 0 and maxScroll
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < -maxScroll) currentTranslate = -maxScroll;

    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function startScroll(direction) {
    stopScroll();
    scrollInterval = setInterval(() => {
      currentTranslate -= direction * (itemWidth + gap) * 0.2; // scroll fractionally for smooth effect
      updateTranslate();
    }, 16); // ~60fps
  }

  function stopScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  // Arrow click + hold
  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('mouseleave', stopScroll);

  // Arrow single click
  left.addEventListener('click', () => { currentTranslate += itemWidth + gap; updateTranslate(); });
  right.addEventListener('click', () => { currentTranslate -= itemWidth + gap; updateTranslate(); });

  updateTranslate();

  // Optional: mouse drag support
  let dragging = false, startX = 0, prevTranslate = 0;

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    stopScroll(); // stop arrows if dragging
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

  // Update on window resize
  window.addEventListener('resize', () => {
    const newMax = (itemWidth + gap) * items.length - wrapper.offsetWidth;
    if (currentTranslate < -newMax) currentTranslate = -newMax;
    updateTranslate();
  });
}

/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});
