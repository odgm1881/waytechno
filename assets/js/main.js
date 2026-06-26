/* ============================================================
   WayТехно — interactions
   Ported from the design prototype's DCLogic component to
   plain vanilla JS. Runs once the DOM is ready.
   ============================================================ */
(function () {
  'use strict';

  function setup() {
    var root = document;

    // ---- Reveal on scroll ----
    var revealEls = root.querySelectorAll('[data-reveal]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          var d = parseInt(el.getAttribute('data-delay') || '0', 10);
          el.style.transitionDelay = d + 'ms';
          el.style.opacity = '1';
          el.style.transform = 'none';
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });

    // ---- Animated counters ----
    var counters = root.querySelectorAll('[data-count]');
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });

    // ---- Hero parallax + cursor light ----
    var hero = root.querySelector('#top');
    var glow = root.querySelector('#wt-heroglow');
    var img = root.querySelector('#wt-heroimg');
    var cursor = root.querySelector('#wt-cursor');
    if (hero) {
      hero.addEventListener('mousemove', function (ev) {
        var r = hero.getBoundingClientRect();
        var x = ev.clientX - r.left, y = ev.clientY - r.top;
        var cx = (x / r.width - 0.5), cy = (y / r.height - 0.5);
        if (glow) glow.style.transform = 'translate(' + (cx * 40) + 'px,' + (cy * 40) + 'px)';
        if (img) img.style.transform = 'translate(' + (cx * -14) + 'px,' + (cy * -14) + 'px) scale(1.04)';
        if (cursor) { cursor.style.left = x + 'px'; cursor.style.top = y + 'px'; cursor.style.opacity = '1'; }
      });
      hero.addEventListener('mouseleave', function () {
        if (cursor) cursor.style.opacity = '0';
        if (glow) glow.style.transform = '';
        if (img) img.style.transform = '';
      });
    }

    // ---- Fork hover sweep + arrow ----
    root.querySelectorAll('.wt-fork').forEach(function (card) {
      var sweep = card.querySelector('.wt-fork-sweep');
      var arrow = card.querySelector('.wt-fork-arrow');
      card.addEventListener('mouseenter', function () {
        if (sweep) sweep.style.opacity = '1';
        if (arrow) { arrow.style.transform = 'translateX(4px)'; arrow.style.background = '#2f6bff'; arrow.style.borderColor = '#2f6bff'; }
      });
      card.addEventListener('mouseleave', function () {
        if (sweep) sweep.style.opacity = '0';
        if (arrow) { arrow.style.transform = ''; arrow.style.background = ''; arrow.style.borderColor = ''; }
      });
    });

    // ---- Magnetic buttons ----
    root.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        var mx = ev.clientX - r.left - r.width / 2;
        var my = ev.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + (mx * 0.06) + 'px,' + (my * 0.1 - 2) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });

    // ---- Nav scroll state + progress bar ----
    var nav = root.querySelector('#wt-nav');
    var prog = root.querySelector('#wt-progress');
    var onScroll = function () {
      var y = window.scrollY || 0;
      if (nav) {
        if (y > 12) {
          nav.style.background = 'rgba(8,9,11,.78)';
          nav.style.backdropFilter = 'blur(16px)';
          nav.style.webkitBackdropFilter = 'blur(16px)';
          nav.style.borderBottomColor = 'rgba(255,255,255,.07)';
        } else {
          nav.style.background = 'transparent';
          nav.style.backdropFilter = 'none';
          nav.style.webkitBackdropFilter = 'none';
          nav.style.borderBottomColor = 'rgba(255,255,255,0)';
        }
      }
      if (prog) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var dur = parseInt(el.getAttribute('data-dur') || '1500', 10);
    var scale = parseInt(el.getAttribute('data-scale') || '1', 10);
    var start = performance.now();
    var fmt = function (n) {
      if (scale > 1) return (n / scale).toFixed(1);
      return n >= 1000 ? n.toLocaleString('ru-RU') : String(n);
    };
    var tick = function (now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    };
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(setup); });
  } else {
    requestAnimationFrame(setup);
  }
})();
