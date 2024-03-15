const transitionDiv = document.querySelector('.js-to-case-page-transition');

if (transitionDiv) {
  const toCaseLinks = document.querySelectorAll('[href*=case]');
  toCaseLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const href = link.getAttribute('href');

      if (href.includes('greenchoice')) {
        transitionDiv.classList.add('client-greenchoice');
      } else if (href.includes('this-is-eindhoven')) {
        transitionDiv.classList.add('client-this-is-eindhoven');
      } else if (href.includes('plaisio')) {
        transitionDiv.classList.add('client-plaisio');
      } else {
        return;
      }

      transitionDiv.classList.add('to-case-page-transition--do-transition');

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}
