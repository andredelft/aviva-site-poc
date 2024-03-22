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

let previousScrollY = null;

handleScrollOrResize(false);
handleResize();

window.addEventListener('scroll', () => handleScrollOrResize(true));
window.addEventListener('resize', () => {
  handleScrollOrResize(true);
  handleResize();
});

header.classList.add('header--initialized');

function handleScrollOrResize(setPrevScrollPosition) {
  handleHeaderIsHidden(setPrevScrollPosition);
  handleHeaderHasBackground();

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

function handleHeaderHasBackground() {
  const { scrollY } = window;
  const threshold = 100;

  if (scrollY > threshold) {
    header.classList.add('header--has-background');
  } else {
    header.classList.remove('header--has-background');
  }
}

/**
 * Sometimes the scroll event is triggered on page load (when the user didn't scroll).
 * This causes handleScroll to be executed twice. The setPrevScrollPosition parameter
 * is a work around to prevent the header from being hidden and directly shown again on page load.
 **/
function handleHeaderIsHidden(setPrevScrollPosition) {
  const { scrollY } = window;
  const threshold = 100;
  const isScrolledToTop = scrollY < threshold;
  const isScrollingDown = scrollY > previousScrollY;

  if (isScrolledToTop) {
    showHeader();
  } else if (previousScrollY === null) {
    hideHeaderWithoutTransition();
  } else if (isScrollingDown) {
    hideHeader();
  } else {
    showHeader();
  }

  if (setPrevScrollPosition) {
    previousScrollY = scrollY;
  }
}

function showHeader() {
  header.classList.remove('header--hidden');
  header.classList.remove('header--hidden-without-transition');
}

function hideHeader() {
  header.classList.add('header--hidden');
}

function hideHeaderWithoutTransition() {
  header.classList.add('header--hidden');
  header.classList.add('header--hidden-without-transition');
}
