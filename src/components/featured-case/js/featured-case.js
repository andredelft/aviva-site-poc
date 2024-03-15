const ctaEl = document.querySelector('.js-featured-case-cta');

if (ctaEl) {
  ctaEl.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.classList.add('featured-case__cta--pressed');

    setTimeout(() => {
      window.location.href = e.target.href;
    }, 100);
  });
}
