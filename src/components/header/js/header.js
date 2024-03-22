const header = document.querySelector('.js-header');
const headerContent = document.querySelector('.js-header-content');

const topSlice = document.querySelector('.js-header-slice-top');
const bottomSlice = document.querySelector('.js-header-slice-bottom');

const bgElements = document.querySelectorAll('[data-bg-dark], [data-bg-light]');

const topSliceContent = headerContent.cloneNode(true);
const bottomSliceContent = headerContent.cloneNode(true);

topSliceContent.className = 'header-slice__content';
bottomSliceContent.className = 'header-slice__content';

topSlice.appendChild(topSliceContent);
bottomSlice.appendChild(bottomSliceContent);

handleScrollOrResize();
handleResize();

window.addEventListener('resize', () => {
  handleScrollOrResize();
  handleResize();
});
window.addEventListener('scroll', handleScrollOrResize);

header.classList.add('header--initialized');

function handleScrollOrResize() {
  const headerHeight = header.offsetHeight;

  let bgElForTopSlice;
  let bgElForBottomSlice;

  bgElements.forEach((bgEl) => {
    const { top, bottom } = bgEl.getBoundingClientRect();
    const isBgElForTopSlice = top <= 0 && bottom > 0;
    const isBgElForBottomSlice = top > 0 && top < headerHeight;

    if (isBgElForTopSlice) {
      bgElForTopSlice = bgEl;
    } else if (isBgElForBottomSlice) {
      bgElForBottomSlice = bgEl;
    }
  });

  if (bgElForBottomSlice) {
    const { top } = bgElForBottomSlice.getBoundingClientRect();
    const bottomSlicePixelsOfHeader = headerHeight - top;

    const bottomSlicePercentage = (bottomSlicePixelsOfHeader / headerHeight) * 100;
    setSliceHeight(topSlice, 100 - bottomSlicePercentage);
    setSliceHeight(bottomSlice, bottomSlicePercentage);
  } else {
    setSliceHeight(topSlice, 100);
    setSliceHeight(bottomSlice, 0);
  }

  setSliceBgClass(topSlice, bgElForTopSlice);
  setSliceBgClass(bottomSlice, bgElForBottomSlice);
}

function handleResize() {
  header.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

function setSliceBgClass(sliceEl, bgEl) {
  if (bgEl?.hasAttribute('data-bg-dark')) {
    sliceEl.classList.add('header-slice--bg-dark');
    sliceEl.classList.remove('header-slice--bg-light');
  } else {
    sliceEl.classList.add('header-slice--bg-light');
    sliceEl.classList.remove('header-slice--bg-dark');
  }
}

function setSliceHeight(sliceEl, percentage) {
  sliceEl.style.setProperty('--header-slice-height', `${percentage}%`);
}
