(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var iconOpen = document.getElementById('icon-open');
  var iconClose = document.getElementById('icon-close');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = !mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal (progressive enhancement: elements are visible by default
  // in CSS; only opt into the hidden-then-reveal animation once JS has an
  // IntersectionObserver ready to clear it, so content never gets stuck
  // invisible for no-JS users, crawlers, or before this script runs).
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      el.classList.add('js-reveal');
      observer.observe(el);
    });
  }

  // Newsletter form (front-end only demo; no backend wired up)
  var form = document.getElementById('newsletter-form');
  var status = document.getElementById('newsletter-status');

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = form.querySelector('#email');

      if (!email.checkValidity()) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      status.textContent = 'Thanks — you’re on the list. Look out for our next harvest update.';
      form.reset();
    });
  }
})();
