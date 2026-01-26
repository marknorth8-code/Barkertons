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

/* ================= CAROUSEL (HOME ONLY) ================= */
// ================= CAROUSEL =================
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.project-box');
const left = document.querySelector('.carousel-arrow.left');
const right = document.querySelector('.carousel-arrow.right');

if (track && items.length && left && right && window.innerWidth > 768) {
  let index = 0;
  let currentTranslate = 0;
  const gap = 40;

  function update() {
    const visibleCards = Math.floor(track.offsetWidth / items[0].offsetWidth);
    const maxIndex = items.length - visibleCards;
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    currentTranslate = -index * (items[0].offsetWidth + gap);
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  left.addEventListener('click', () => { index--; update(); });
  right.addEventListener('click', () => { index++; update(); });

  update();

  // Optional: mouse drag support for desktop
  let dragging = false, startX = 0, prevTranslate = 0;

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    const moved = currentTranslate - prevTranslate;
    if (moved < -100) index++;
    if (moved > 100) index--;
    update();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    track.style.transform = `translateX(${currentTranslate}px)`;
  });
}

/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});
