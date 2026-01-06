import p1980 from "./ periods/1980.js";
import p1983 from "./periods/1983.js";
import p1986 from "./periods/1986.js";
import p1987 from "./periods/1987.js";
import p1989 from "./periods/1989.js";

const presets = [p1980, p1983, p1986, p1987, p1989];
let currentIndex = 0;
let preset = presets[currentIndex];

const section = document.querySelector("#genY");
const bgLayers = section.querySelectorAll(".bg");
const text = section.querySelector(".glitch-text");
const yearEl = section.querySelector(".year");
const labelEl = section.querySelector(".label");
const scanlines = section.querySelector(".scanlines");

let t = 0;

/* ---------- APPLY PRESET ---------- */
function applyPreset(p) {
  preset = p;

  yearEl.textContent = p.year;
  labelEl.textContent = p.label;

  bgLayers.forEach(bg => {
    bg.style.backgroundImage = `url(${p.image})`;
  });

  scanlines.style.opacity = p.scanlinesOpacity;
}

/* ---------- ANIMATION LOOP ---------- */
function animate() {
  t += preset.speed;

  bgLayers.forEach((bg, i) => {
    bg.style.transform = `
      translateX(${Math.sin(t) * preset.offset + i * preset.rgbStrength}px)
      scale(${preset.zoom})
    `;
  });

  text.style.textShadow = `
    ${preset.rgbStrength}px 0 magenta,
    ${-preset.rgbStrength}px 0 cyan
  `;

  requestAnimationFrame(animate);
}

/* ---------- PIXEL SORTING (ARTISTIQUE) ---------- */
setInterval(() => {
  if (!preset.pixelSort) return;

  const slice = Math.random() * 60;
  bgLayers.forEach(bg => {
    bg.style.clipPath =
      `inset(${slice}% 0 ${100 - slice - 10}% 0)`;
  });

  setTimeout(() => {
    bgLayers.forEach(bg => {
      bg.style.clipPath = "inset(0)";
    });
  }, 400);
}, 2200);

/* ---------- TEXT GLITCH ---------- */
setInterval(() => {
  if (Math.random() > preset.textGlitch) return;

  text.style.transform =
    `translateX(${(Math.random() - 0.5) * preset.offset}px)`;

  setTimeout(() => {
    text.style.transform = "translateX(0)";
  }, 200);
}, 1200);

/* ---------- DEMO SWITCH (WORKSHOP) ---------- */
document.addEventListener("keydown", () => {
  currentIndex = (currentIndex + 1) % presets.length;
  applyPreset(presets[currentIndex]);
});

/* ---------- START ---------- */
applyPreset(preset);
animate();
