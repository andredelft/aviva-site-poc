const phraseElements = document.querySelectorAll('.js-home-hero-phrases > span');
const TYPING_DELAY_PER_CHARACTER = 0.1; // in seconds. It's delay, so lower is faster.

if (phraseElements.length > 0) {
  phraseElements.forEach((phrase) => {
    let typingIndex = 0;
    let innerHtml = '';
    const characters = [...phrase.textContent];

    characters.forEach((char, i) => {
      const charIsSpace = char === ' ';
      const typingDelay = typingIndex * TYPING_DELAY_PER_CHARACTER;

      typingIndex++;

      if (charIsSpace) {
        innerHtml =
          innerHtml +
          `<span class='char char--blank-space' style='--typing-delay: ${typingDelay}s'>&nbsp</span>`;
      } else {
        innerHtml =
          innerHtml + `<span class='char' style='--typing-delay: ${typingDelay}s'>${char}</span>`;
      }
    });

    phrase.style.setProperty('--typing-delay-per-char', `${TYPING_DELAY_PER_CHARACTER}s`);
    phrase.innerHTML = innerHtml;
  });

  // Infinite loop over the phrases to type a new word every x seconds:
  let phraseIndex = 0;
  typeNewPhrase();
  window.setInterval(typeNewPhrase, 5000);

  function typeNewPhrase() {
    phraseElements.forEach((phraseEl) => phraseEl.classList.remove('phrase--do-type'));

    window.setTimeout(() => {
      phraseElements[phraseIndex].classList.add('phrase--do-type');
      phraseIndex = phraseIndex === phraseElements.length - 1 ? 0 : phraseIndex + 1;
    }, 700);
  }
}
