const ctaEl = document.querySelector('.js-featured-case-cta');
const caseImageEl = document.querySelector('.js-featured-case-image');

if (ctaEl && caseImageEl) {
  ctaEl.addEventListener('click', (e) => {
    e.preventDefault();

    caseImageEl.style['view-transition-name'] = 'case-image';
    ctaEl.style['view-transition-name'] = 'case-content';

    ctaEl.classList.add('featured-case__cta--pressed');

    setTimeout(() => {
      window.location.href = ctaEl.href;
    }, 100);
  });
}
