'use strict';

/**
 * Accordéon des centres d'intérêt.
 * Contrat HTML : un conteneur [data-interests] contenant N boutons
 * .interest-btn (chacun avec aria-controls) et N panneaux .interest-panel
 * portant les id correspondants.
 * Un seul panneau ouvert à la fois ; recliquer sur le bouton ouvert referme.
 */
function setupInterests(root) {
  var buttons = Array.prototype.slice.call(root.querySelectorAll('.interest-btn'));
  if (!buttons.length) return;

  function closeAll() {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('interest-btn--open');
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = true;
        panel.classList.remove('interest-panel--open');
      }
    });
  }

  closeAll();

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (wasOpen) return;
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('interest-btn--open');
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = false;
        panel.classList.add('interest-panel--open');
      }
    });
  });
}

/**
 * Apparition progressive des éléments [data-reveal] à l'entrée dans le viewport.
 * Repris de setupReveal() de l'artifact d'origine.
 */
function setupReveal() {
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!nodes.length) return;

  function show(el) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  }

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(show);
    return;
  }

  nodes.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition =
      'opacity 720ms cubic-bezier(.16,.8,.28,1) ' + ((i % 4) * 70) + 'ms, ' +
      'transform 820ms cubic-bezier(.16,.8,.28,1) ' + ((i % 4) * 70) + 'ms';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  nodes.forEach(function (el) { io.observe(el); });

  setTimeout(function () {
    nodes.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    });
  }, 400);
}

/**
 * Parallaxe des couches décoratives [data-parallax].
 * Repris de setupParallax() de l'artifact d'origine.
 */
function setupParallax() {
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!layers.length) return;

  var queued = false;

  function apply() {
    queued = false;
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      var r = el.parentElement.getBoundingClientRect();
      var progress = (vh - r.top) / (vh + r.height);
      el.style.transform = 'translate3d(0,' + ((progress - 0.5) * speed * 220).toFixed(2) + 'px,0)';
    });
  }

  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(apply); }
  }, { passive: true });

  apply();
}

document.addEventListener('DOMContentLoaded', function () {
  var interests = document.querySelector('[data-interests]');
  if (interests) setupInterests(interests);
  setupReveal();
  setupParallax();
});
