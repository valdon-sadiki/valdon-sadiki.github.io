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

document.addEventListener('DOMContentLoaded', function () {
  var interests = document.querySelector('[data-interests]');
  if (interests) setupInterests(interests);
});
