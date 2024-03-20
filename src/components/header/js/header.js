const headerHeight = 94;

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
window.addEventListener('resize', handleScrollOrResize);
window.addEventListener('scroll', handleScrollOrResize);

function handleScrollOrResize() {
  const darkSections = document.querySelectorAll('[data-dark-bg]');
  let topSliceIsSet = false;
  let topSliceTextColor = 'dark';
  let bottomSliceTextColor = 'dark';

  darkSections.forEach((darkSection) => {
    const { top, bottom } = darkSection.getBoundingClientRect();

    if (!topSliceIsSet) {
      if (top <= 0 && bottom > 0) {
        const topSlicePixelsOfHeader = Math.min(headerHeight, bottom);
        const topSlicePercentage = (topSlicePixelsOfHeader / headerHeight) * 100;
        topSlice.style.setProperty('--header-slice-height', `${topSlicePercentage}%`);
        topSliceTextColor = 'white';

        const bottomSlicePercentage = 100 - topSlicePercentage;
        bottomSlice.style.setProperty('--header-slice-height', `${bottomSlicePercentage}%`);

        topSliceIsSet = true;
      }
    } else {
      /** The top slice is set. Also the percentage of the bottom slice. Now we only have to determine the text color of the bottom Slice: **/
      if (top > 0 && top < headerHeight) {
        bottomSliceTextColor = 'white';
      }
    }

    header.style.setProperty('--header-height', `${headerHeight}px`);
    topSlice.style.setProperty('--header-text-color', topSliceTextColor);
    bottomSlice.style.setProperty('--header-text-color', bottomSliceTextColor);
  });
}
