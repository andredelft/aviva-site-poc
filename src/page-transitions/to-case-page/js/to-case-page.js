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
        window.location.href = href;
        return;
      }

      transitionDiv.classList.add('to-case-page-transition--do-transition');

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });

  /** https://stackoverflow.com/questions/43043113/how-to-force-reloading-a-page-when-using-browser-back-button#answer-43043658 **/
  window.addEventListener('pageshow', function ({ persisted }) {
    const { performance, location } = window;
    const backButtonIsClicked =
      persisted ||
      (typeof performance != 'undefined' &&
        performance.getEntriesByType('navigation')[0].type === 'back_forward');

    if (backButtonIsClicked) {
      /** Reset the transition div when the back button is clicked (important for Safari, since otherwise, the old state of the div covers the whole page): **/
      transitionDiv.classList.remove('to-case-page-transition--do-transition');
      transitionDiv.classList.remove('client-greenchoice');
      transitionDiv.classList.remove('client-this-is-eindhoven');
      transitionDiv.classList.remove('client-plaisio');
    }
  });
}
