document.addEventListener('DOMContentLoaded', () => {
    
  // --- 1. SISTEMA DE IDIOMAS ---
  let currentLang = 'en'; 
  const langBtn = document.querySelector('.btn-lang');

  function updateTexts() {
    const dictionary = currentLang === 'en' ? en : es; 
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dictionary[key];
        } else {
          el.textContent = dictionary[key];
        }
      }
    });
    document.documentElement.lang = currentLang;
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      updateTexts();
    });
  }

  // --- 2. EFECTO DEL NAVBAR ---
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'var(--white)';
      nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
      nav.style.padding = '15px 0';
    } else {
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
      nav.style.padding = '20px 0';
    }
  });

  // --- 3. ANIMACIONES REVEAL ---
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // --- 4. SLIDER DE TESTIMONIOS ---
  const track = document.getElementById('testiTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = document.querySelectorAll('.testi-card');

  if (track && cards.length > 0) {
    let currentIndex = 0;
    function moveSlider() {
      const cardWidth = cards.offsetWidth;
      const gap = 30; 
      const moveAmount = cardWidth + gap;
      track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    }

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 2) { 
        currentIndex++;
        moveSlider();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        moveSlider();
      }
    });
    window.addEventListener('resize', moveSlider);
  }
});

const track = document.getElementById("testiTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let scrollAmount = 0;
const cardWidth = 430; // 400px card + 30px gap (según tu CSS)

const maxScroll = cardWidth; // SOLO 1 movimiento

nextBtn.addEventListener("click", () => {
  if (scrollAmount < maxScroll) {
    scrollAmount += cardWidth;
    track.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount -= cardWidth;
    track.style.transform = `translateX(-${scrollAmount}px)`;
  }
});
