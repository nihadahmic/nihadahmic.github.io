/* ============================================
   ENVIRONMENT FLAG
   ============================================ */

if (window.location.hostname === 'nihadahmic.com' || window.location.hostname === 'www.nihadahmic.com') {
  document.documentElement.classList.add('is-prod');
} else if (window.location.hostname.endsWith('github.io')) {
  const robots = document.createElement('meta');
  robots.name = 'robots';
  robots.content = 'noindex, nofollow';
  document.head.appendChild(robots);
}

/* ============================================
   SCROLL REVEAL
   ============================================ */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ============================================
   DARK MODE TOGGLE
   ============================================ */

const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================
   NAV BACKGROUND ON SCROLL
   ============================================ */

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 10) {
    nav.style.backdropFilter = 'blur(12px)';
    nav.style.webkitBackdropFilter = 'blur(12px)';
  } else {
    nav.style.backdropFilter = 'none';
    nav.style.webkitBackdropFilter = 'none';
  }
  lastScroll = scrollY;
}, { passive: true });

/* ============================================
   ACTIVE NAV STATE
   ============================================ */

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('#hero, #work, #process, #about, #testimonials, #contact');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => navObserver.observe(section));
}
