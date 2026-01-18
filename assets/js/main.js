
document.getElementById('year').textContent = new Date().getFullYear();

let index = 0;
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.project-box');
const left = document.querySelector('.carousel-arrow.left');
const right = document.querySelector('.carousel-arrow.right');

function updateCarousel() {
  const itemWidth = items[0].offsetWidth + 20;
  track.style.transform = `translateX(-${index * itemWidth}px)`;
  left.style.display = index === 0 ? 'none' : 'block';
  right.style.display = index >= items.length - 1 ? 'none' : 'block';
}

left.onclick = () => { index--; updateCarousel(); };
right.onclick = () => { index++; updateCarousel(); };

updateCarousel();
