const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 200;
const images = [];
const imageSeq = {
  frame: 0
};

/* Image path function */
const currentFrame = index =>
  `images/ezgif-48bae485a9fc49bf-jpg/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

/* Preload images */
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

/* Draw image */
images[0].onload = () => {
  ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

/* Scroll animation */
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex));
});

function updateImage(index) {
  const img = images[index];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

/* Resize support */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
