/** If browser back button was used, flush the cache: https://stackoverflow.com/questions/43043113/how-to-force-reloading-a-page-when-using-browser-back-button#answer-43043658 **/
window.addEventListener('pageshow', function ({ persisted }) {
  const { performance, location } = window;
  const historyTraversal =
    persisted ||
    (typeof performance != 'undefined' &&
      performance.getEntriesByType('navigation')[0].type === 'back_forward');

  if (historyTraversal) {
    location.reload();
  }
});
