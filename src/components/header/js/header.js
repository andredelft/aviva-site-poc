const header = document.querySelector('.js-header');
const headerContent = document.querySelector('.js-header-content');

const topSlice = document.querySelector('.js-header-top-slice');
const bottomSlice = document.querySelector('.js-header-bottom-slice');

const topSliceContent = headerContent.cloneNode(true);
const bottomSliceContent = headerContent.cloneNode(true);

topSliceContent.className = 'header-top-slice__content';
bottomSliceContent.className = 'header-bottom-slice__content';

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
  const bgElements = document.querySelectorAll('[data-bg-dark], [data-bg-light]');

  let topSliceTextColor = 'black';
  let topSliceBgColor = 'rgba(255, 255, 255, 0.1)';
  let bottomSliceTextColor = 'black';
  let bottomSliceBgColor = 'rgba(0, 0, 0, 0.1)';

  let topSlicePercentage = 100;
  let bottomSlicePercentage = 0;

  const headerHeight = header.offsetHeight;

  bgElements.forEach((bgEl) => {
    const { top, bottom } = bgEl.getBoundingClientRect();
    const isBgForTopSlice = top <= 0 && bottom > 0;
    const isBgForBottomSlice = top > 0 && top < headerHeight;

    if (isBgForTopSlice) {
      [topSliceTextColor, topSliceBgColor] = getSliceTextAndBgColor(bgEl);
    } else if (isBgForBottomSlice) {
      /** The top slice is set, and also the percentage of the bottom slice. Now we only have to determine the text color of the bottom Slice: **/
      const bottomSlicePixelsOfHeader = headerHeight - top;

      bottomSlicePercentage = (bottomSlicePixelsOfHeader / headerHeight) * 100;
      topSlicePercentage = 100 - bottomSlicePercentage;

      [bottomSliceTextColor, bottomSliceBgColor] = getSliceTextAndBgColor(bgEl);
    }
  });

  topSlice.style.setProperty('--header-slice-height', `${topSlicePercentage}%`);
  bottomSlice.style.setProperty('--header-slice-height', `${bottomSlicePercentage}%`);

  topSlice.style.setProperty('--header-text-color', topSliceTextColor);
  bottomSlice.style.setProperty('--header-text-color', bottomSliceTextColor);

  topSlice.style.setProperty('--header-bg-color', topSliceBgColor);
  bottomSlice.style.setProperty('--header-bg-color', bottomSliceBgColor);
}

function handleResize() {
  header.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

function getSliceTextAndBgColor(bgEl) {
  if (bgEl.hasAttribute('data-bg-dark')) {
    return ['white', 'rgba(0, 0, 0, 0.1)'];
  }

  return ['black', 'rgba(255, 255, 255, 0.1)'];
}
