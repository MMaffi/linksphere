// =====================
// Fundo animado normal (estrelinhas)
// =====================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null, radius: 120 };
let isMatrixActive = false;

class Particle {
  constructor(x, y, radius, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 2) this.x += 2;
      else if (mouse.x > this.x && this.x > this.radius * 2) this.x -= 2;
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 2) this.y += 2;
      else if (mouse.y > this.y && this.y > this.radius * 2) this.y -= 2;
    }

    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 0.8;
    let speedY = (Math.random() - 0.5) * 0.8;
    particles.push(new Particle(x, y, radius, speedX, speedY));
  }
}
init();

function animate() {
  if (isMatrixActive) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (!isMatrixActive) init();
});

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});