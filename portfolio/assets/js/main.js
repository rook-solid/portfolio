/**
 * Portfolio – main.js
 * Handles: header scroll, mobile nav, skill bar animations,
 *          AOS (scroll reveal), back-to-top, contact form demo.
 */
(function () {
  'use strict';

  /* ── Elements ── */
  const header     = document.getElementById('header');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');
  const backToTop  = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');

  /* =====================================================
     1. Header – add .scrolled class on scroll
     ===================================================== */
  const onScroll = () => {
    const scrollY = window.scrollY;

    // Header shadow
    header.classList.toggle('scrolled', scrollY > 20);

    // Back to top visibility
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 300);

    // Active nav link based on visible section
    highlightActiveNav(scrollY);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial call

  /* =====================================================
     2. Active nav highlight (intersection-style via scroll)
     ===================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__link');

  function highlightActiveNav(scrollY) {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (scrollY >= top) current = sec.id;
    });
    navLinkEls.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* =====================================================
     3. Mobile nav toggle
     ===================================================== */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* =====================================================
     4. Back to top
     ===================================================== */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =====================================================
     5. Scroll-reveal (AOS lite)
     ===================================================== */
  const aosEls = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children if present
          const delay = entry.target.dataset.aosDelay || 0;
          setTimeout(() => entry.target.classList.add('aos-in'), Number(delay));
          aosObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  aosEls.forEach((el, i) => {
    el.dataset.aosDelay = i * 80; // stagger by index
    aosObserver.observe(el);
  });

  // ページロード時に既に viewport 内にある要素を即表示
  window.addEventListener('load', () => {
    aosEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = el.dataset.aosDelay || 0;
        setTimeout(() => el.classList.add('aos-in'), Number(delay));
        aosObserver.unobserve(el);
      }
    });
  });

  /* =====================================================
     6. Skill bar animation (triggered on visibility)
     ===================================================== */
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => barObserver.observe(bar));

  /* =====================================================
     7. Contact form – demo validation & success message
     ===================================================== */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-input.error').forEach((el) =>
        el.classList.remove('error')
      );

      // Simple validation
      const required = contactForm.querySelectorAll('[required]');
      required.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      // Email format
      const emailField = document.getElementById('contact-email-input');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      // Show success (demo)
      showFormSuccess();
    });

    function showFormSuccess() {
      // Replace form content with success message
      contactForm.innerHTML = `
        <div class="form-success visible">
          <div class="form-success__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p class="form-success__title">送信いただきありがとうございます！</p>
          <p class="form-success__desc">2営業日以内にご連絡いたします。<br/>（これはデモのため実際には送信されていません）</p>
        </div>
      `;
    }
  }

  /* =====================================================
     8. Smooth scroll for anchor links (enhancement)
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* =====================================================
     9. Hero text entrance animation (CSS-based trigger)
     ===================================================== */
  const heroText = document.querySelector('.hero__text');
  if (heroText) {
    heroText.style.animation = 'fade-in-up .8s var(--ease-out) both';
  }

})();
