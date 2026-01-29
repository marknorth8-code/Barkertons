/* ================= HEADER / FOOTER LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("/header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        initMobileNav(); // re-init hamburger AFTER header loads
      });
  }

  if (footer) {
    fetch("/footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;

        // ✅ Year must be set AFTER footer loads
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      });
  }
});


/* ================= MOBILE NAV ================= */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav'); // ✅ scoped

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

  if (!track || !items.length || !left || !right || !wrapper) return;

  let currentTranslate = 0;
  const gap = parseInt(getComputedStyle(track).gap) || 40;

  function getItemWidth() {
    return items[0].getBoundingClientRect().width;
  }

  function getMaxScroll() {
    const totalWidth = items.length * (getItemWidth() + gap) - gap;
    return Math.max(totalWidth - wrapper.clientWidth, 0);
  }

  function updateTranslate() {
    const maxScroll = getMaxScroll();
    currentTranslate = Math.min(0, Math.max(currentTranslate, -maxScroll));
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

  // Continuous hold
  let scrollInterval;
  function startScroll(dir) {
    stopScroll();
    scrollInterval = setInterval(() => {
      currentTranslate -= dir * 10;
      updateTranslate();
    }, 16);
  }
  function stopScroll() {
    clearInterval(scrollInterval);
  }

  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('blur', stopScroll); // ✅ better than mouseleave

  // Drag
  let dragging = false, startX = 0, prevTranslate = 0;

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    stopScroll();
  });

  window.addEventListener('mouseup', () => dragging = false);

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    updateTranslate();
  });

  window.addEventListener('resize', updateTranslate);

  updateTranslate();
});
