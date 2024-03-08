function drawCardBackground(canvas, card) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const {offsetWidth: width, offsetHeight: height} = card;

  canvas.width = width;
  canvas.height = height;

  ctx.strokeStyle = "#1672f3";
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, [40]);
  ctx.fillStyle = "#1672f3";
  ctx.fill();
  ctx.stroke();
}

function handleDraw() {
  const cards = document.querySelectorAll('.js-card');

  cards.forEach(card => {
    const canvasEl = card.querySelector('canvas');

    if (!canvasEl) {
      return;
    }

    drawCardBackground(canvasEl, card);
  })
}

handleDraw();
window.addEventListener("resize", handleDraw);