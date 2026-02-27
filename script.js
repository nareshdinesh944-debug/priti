/**
 * COMFI SHOES — script.js
 * Smooth scroll, animations, navbar, newsletter, cart toast
 */

/* =============================================
   1. NAVBAR — Scroll effect + Hamburger Menu
============================================= */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  handleBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* =============================================
   2. SMOOTH SCROLL — All anchor links
============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   3. INTERSECTION OBSERVER — Scroll Animations
============================================= */
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target); // animate once
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

/* =============================================
   4. HERO SHOE — Parallax Tilt on Mouse Move
============================================= */
const heroSection = document.querySelector('.hero');
const heroShoe = document.getElementById('heroShoe');

if (heroSection && heroShoe) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    heroShoe.style.transform = `translateY(calc(-50% + ${y}px)) rotate(${x * 0.3}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroShoe.style.transform = '';
  });
}

/* =============================================
   5. PRODUCT CARDS — Buy Button Toast
============================================= */
const products = [
  { id: 'buyBtnX1',      name: 'COMFI X1 Pro',       price: '₹4,999' },
  { id: 'buyBtnShadow',  name: 'COMFI Shadow Elite',  price: '₹6,499' },
  { id: 'buyBtnForce',   name: 'COMFI Force Max',     price: '₹5,799' },
  { id: 'buyBtnVoid',    name: 'COMFI Void Runner',   price: '₹7,299' },
  { id: 'buyBtnStealth', name: 'COMFI Stealth Low',   price: '₹3,999' },
  { id: 'buyBtnPhantom', name: 'COMFI Phantom High',  price: '₹8,499' },
  { id: 'buyX1',         name: 'COMFI X1 Pro',        price: '₹4,999' },
  { id: 'buyShadow',     name: 'COMFI Shadow Elite',  price: '₹6,499' },
  { id: 'buyForce',      name: 'COMFI Force Max',     price: '₹5,799' },
  { id: 'buyVoid',       name: 'COMFI Void Runner',   price: '₹7,299' },
  { id: 'buyStealth',    name: 'COMFI Stealth Low',   price: '₹3,999' },
  { id: 'buyPhantom',    name: 'COMFI Phantom High',  price: '₹8,499' },
];

products.forEach(({ id, name, price }) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      showToast(`🛒 ${name} (${price}) added to cart!`);
    });
  }
});

/* =============================================
   6. TOAST NOTIFICATION
============================================= */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* =============================================
   7. NEWSLETTER FORM
============================================= */
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');
const emailInput = document.getElementById('emailInput');
const subscribeBtn = document.getElementById('subscribeBtn');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      emailInput.style.borderColor = 'rgba(255,80,80,0.5)';
      showToast('⚠️ Please enter a valid email address.');
      setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
      return;
    }

    // Simulate success
    subscribeBtn.textContent = '✓ Subscribed!';
    subscribeBtn.disabled = true;
    newsletterForm.style.display = 'none';
    newsletterSuccess.style.display = 'flex';
    showToast('🎉 Welcome to COMFI! Check your inbox.');
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =============================================
   8. BACK TO TOP BUTTON
============================================= */
const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =============================================
   9. ACTIVE NAV LINK — Highlight Current Section
============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--white)';
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

/* =============================================
   10. PRODUCT CARD — Count-up animation on stats
============================================= */
function animateCountUp(element, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

// Trigger stats count-up when hero is in view
const heroStats = document.querySelector('.hero-stats');
let statsAnimated = false;

if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        const statNums = document.querySelectorAll('.stat-num');
        // 50K+, 120+, 4.9★ — animate first two numerically
        animateCountUp(statNums[0], 50, 'K+');
        animateCountUp(statNums[1], 120, '+');
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(heroStats);
}

/* =============================================
   11. HERO CTA — ripple effect on click
============================================= */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      top: ${e.clientY - rect.top - size / 2}px;
      left: ${e.clientX - rect.left - size / 2}px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-anim 0.6s ease-out forwards;
      pointer-events: none;
    `;

    // Inject ripple keyframe once
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple-anim {
          to { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* =============================================
   12. INIT — trigger on load
============================================= */
window.addEventListener('load', () => {
  // Animate hero immediately
  document.querySelectorAll('.hero [data-animate]').forEach(el => {
    setTimeout(() => el.classList.add('animated'), 200);
  });
});

console.log('%cCOMFI SHOES ✦ Walk Bold. Walk Comfi.', 'color:#fff;background:#000;font-size:14px;font-weight:bold;padding:8px 16px;border-radius:4px;');
