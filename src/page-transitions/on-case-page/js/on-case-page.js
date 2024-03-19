const transitionDiv = document.querySelector('.js-on-case-page-transition');
const caseHeroImage = document.querySelector('.js-case-hero-image');

if (transitionDiv) {
  if (caseHeroImage) {
    /** Only after the case hero image is loaded, we want to animate the transitionDiv away, so the page becomes visible: **/
    if (caseHeroImage.complete) {
      transitionDiv.classList.add('on-case-page-transition--do-transition');
    } else {
      caseHeroImage.addEventListener('load', () => {
        transitionDiv.classList.add('on-case-page-transition--do-transition');
      });
    }
  }

  /** If for some reason the image doesn't load, we still want to animate the transitionDiv away after some seconds, so the page becomes visible: **/
  window.setTimeout(() => {
    transitionDiv.classList.add('on-case-page-transition--do-transition');
  }, 5000);
}
