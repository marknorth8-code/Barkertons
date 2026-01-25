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
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.project-box');
const left = document.querySelector('.carousel-arrow.left');
const right = document.querySelector('.carousel-arrow.right');

if (track && items.length && left && right) {

  let index = 0, startX = 0, prevTranslate = 0, currentTranslate = 0, dragging = false;

  function update() {
    const w = items[0].offsetWidth + 20;
    currentTranslate = -index * w;
    track.style.transform = `translateX(${currentTranslate}px)`;
    left.style.display = index === 0 ? 'none' : 'block';
    right.style.display = index >= items.length - 1 ? 'none' : 'block';
  }

  left.onclick = () => { if (index > 0) { index--; update(); } };
  right.onclick = () => { if (index < items.length - 1) { index++; update(); } };

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    const moved = currentTranslate - prevTranslate;
    if (moved < -100 && index < items.length - 1) index++;
    if (moved > 100 && index > 0) index--;
    update();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  update();
}

/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});
