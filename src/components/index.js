import './home-hero';
import './case-hero';

import './card-row-intro';
import './card-row';
import './card';

import './featured-case';
import './conversion-block';

/* If browser back button was used, flush cache */
(function () {
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
})();
