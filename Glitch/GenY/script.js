import p1980 from "./periods/1980.js";
import p1983 from "./periods/1983.js";
import p1986 from "./periods/1986.js";
import p1987 from "./periods/1987.js";
import p1989 from "./periods/1989.js";

const presets = [p1980, p1983, p1986, p1987, p1989];

const root = document.querySelector("#genY");
const bgLayers = root.querySelectorAll(".bg");
const text = root.querySelector(".glitch-text");
const yearEl = root.querySelector(".year");
const labelEl = root.querySelector(".label");
const scanlines = root.querySelector(".scanlines");
const buttons = root.querySelectorAll(".controls button");

let current = presets[0];
let t = 0;

function applyPreset(p) {
  current = p;
  yearEl.textContent = p.year;
  labelEl.textContent = p.label;

  bgLayers.forEach(bg => {
    bg.style.backgroundImage = `url(${p.image})`;
  });

  scanlines.style.opacity = p.scanlinesOpacity;
}

function animate() {
  t += current.speed;

  /* ===== ANALOGIQUE (1980) ===== */
  if (current.type === "analog") {
    bgLayers.forEach(bg => {
      bg.style.transform =
        `translateX(${Math.sin(t) * current.offset}px)
         scale(${current.zoom})`;
    });
  }

  /* ===== CALCUL / NUMÉRIQUE (1983) ===== */
  if (current.type === "compute") {
    if (Math.random() < 0.08) {
      bgLayers.forEach(bg => {
        bg.style.transform =
          `translateX(${(Math.random() - 0.5) * current.offset}px)
           scale(${current.zoom})`;
      });
    }
  }

  /* ===== GÉOMÉTRIQUE (1986+) ===== */
  if (current.type === "geometry") {
    bgLayers.forEach((bg, i) => {
      bg.style.transform =
        `translate(${i * current.rgbStrength}px, 0)
         scale(${current.zoom})`;
    });
  }

  /* ===== TEXTE (COMMUN) ===== */
  text.style.textShadow = `
    ${current.rgbStrength}px 0 magenta,
    ${-current.rgbStrength}px 0 cyan
  `;

  requestAnimationFrame(animate);
}

/* Pixel sorting analogique */
setInterval(() => {
  if (!current.pixelSort) return;

  const slice = Math.random() * 60;
  bgLayers.forEach(bg => {
    bg.style.clipPath =
      `inset(${slice}% 0 ${100 - slice - 10}% 0)`;
  });

  setTimeout(() => {
    bgLayers.forEach(bg => bg.style.clipPath = "inset(0)");
  }, 400);
}, 2200);

/* Text micro-glitch */
setInterval(() => {
  if (Math.random() > current.textGlitch) return;

  text.style.transform =
    `translateX(${(Math.random() - 0.5) * current.offset}px)`;

  setTimeout(() => {
    text.style.transform = "translateX(0)";
  }, 200);
}, 1200);

/* Preview controls */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    applyPreset(presets[Number(btn.dataset.year)]);
  });
});


applyPreset(current);
animate();
