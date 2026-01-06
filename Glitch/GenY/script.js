/* ===============================
   IMPORT DES PRESETS
================================ */
import p1980 from "./periods/1980.js";
import p1983 from "./periods/1983.js";
import p1986 from "./periods/1986.js";
import p1987 from "./periods/1987.js";
import p1989 from "./periods/1989.js";

/* ===============================
   LISTE DES PERIODES
================================ */
const presets = [p1980, p1983, p1986, p1987, p1989];

/* ===============================
   ELEMENTS DOM
================================ */
const section = document.querySelector("#genY");
const bgLayers = section.querySelectorAll(".bg");
const glitchText = section.querySelector(".glitch-text");
const yearEl = section.querySelector(".year");
const labelEl = section.querySelector(".label");
const scanlines = section.querySelector(".scanlines");
const buttons = section.querySelectorAll(".controls button");

/* ===============================
   ETAT COURANT
================================ */
let currentPreset = presets[0];
let t = 0;

/* ===============================
   APPLIQUER UNE PERIODE
================================ */
function applyPreset(preset) {
  currentPreset = preset;

  yearEl.textContent = preset.year;
  labelEl.textContent = preset.label;

  // image de fond
  bgLayers.forEach(bg => {
    bg.style.backgroundImage = `url(${preset.image})`;
  });

  // intensité scanlines
  scanlines.style.opacity = preset.scanlinesOpacity;
}

/* ===============================
   ANIMATION CONTINUE
================================ */
function animate() {
  t += currentPreset.speed;

  // animation image (RGB + mouvement)
  bgLayers.forEach((bg, index) => {
    bg.style.transform = `
      translateX(${Math.sin(t) * currentPreset.offset + index * currentPreset.rgbStrength}px)
      scale(${currentPreset.zoom})
    `;
  });

  // RGB split texte
  glitchText.style.textShadow = `
    ${currentPreset.rgbStrength}px 0 magenta,
    ${-currentPreset.rgbStrength}px 0 cyan
  `;

  requestAnimationFrame(animate);
}

/* ===============================
   PIXEL SORTING ARTISTIQUE
================================ */
setInterval(() => {
  if (!currentPreset.pixelSort) return;

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

/* ===============================
   GLITCH TEXTE (OFFSET)
================================ */
setInterval(() => {
  if (Math.random() > currentPreset.textGlitch) return;

  glitchText.style.transform =
    `translateX(${(Math.random() - 0.5) * currentPreset.offset}px)`;

  setTimeout(() => {
    glitchText.style.transform = "translateX(0)";
  }, 200);
}, 1200);

/* ===============================
   CONTROLES (BOUTONS)
================================ */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const index = Number(btn.dataset.year);
    applyPreset(presets[index]);
  });
});

/* ===============================
   INIT
================================ */
applyPreset(currentPreset);
animate();
