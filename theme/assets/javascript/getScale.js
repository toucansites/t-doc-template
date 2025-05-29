/**
 * Find the closest Tailwind color palette based on Delta E 2000.
 * @param {string} color - Input HEX color.
 * @returns {object} Tailwind palette object { '--primary-color-50': hex, ... }
 */

// Utility: Validate if string is a valid 6-digit HEX color
function isValidHex(hex) {
  return /^#?[0-9A-Fa-f]{6}$/.test(hex);
}

// Utility: Convert HEX to RGB
function hexToRgb(hex) {
  if (hex.startsWith('#')) hex = hex.slice(1);
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToLab({ r, g, b }) {
  // Convert RGB [0,255] to XYZ
  r /= 255;
  g /= 255;
  b /= 255;

  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  const fx = x > 0.008856 ? Math.cbrt(x) : 7.787 * x + 16 / 116;
  const fy = y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
  const fz = z > 0.008856 ? Math.cbrt(z) : 7.787 * z + 16 / 116;

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

// TODO: Tailwind palette import
const tailwindPalettes = [
  {
    name: 'Slate',
    palettes: [
      { hex: '#f8fafc', number: 50 },
      { hex: '#f1f5f9', number: 100 },
      { hex: '#e2e8f0', number: 200 },
      { hex: '#cbd5e1', number: 300 },
      { hex: '#94a3b8', number: 400 },
      { hex: '#64748b', number: 500 },
      { hex: '#475569', number: 600 },
      { hex: '#334155', number: 700 },
      { hex: '#1e293b', number: 800 },
      { hex: '#0f172a', number: 900 },
      { hex: '#020617', number: 950 },
    ],
  },
  {
    name: 'Gray',
    palettes: [
      { hex: '#f9fafb', number: 50 },
      { hex: '#f3f4f6', number: 100 },
      { hex: '#e5e7eb', number: 200 },
      { hex: '#d1d5db', number: 300 },
      { hex: '#9ca3af', number: 400 },
      { hex: '#6b7280', number: 500 },
      { hex: '#4b5563', number: 600 },
      { hex: '#374151', number: 700 },
      { hex: '#1f2937', number: 800 },
      { hex: '#111827', number: 900 },
      { hex: '#030712', number: 950 },
    ],
  },
  {
    name: 'Zinc',
    palettes: [
      { hex: '#fafafa', number: 50 },
      { hex: '#f4f4f5', number: 100 },
      { hex: '#e4e4e7', number: 200 },
      { hex: '#d4d4d8', number: 300 },
      { hex: '#a1a1aa', number: 400 },
      { hex: '#71717a', number: 500 },
      { hex: '#52525b', number: 600 },
      { hex: '#3f3f46', number: 700 },
      { hex: '#27272a', number: 800 },
      { hex: '#18181b', number: 900 },
      { hex: '#09090b', number: 950 },
    ],
  },
  {
    name: 'Neutral',
    palettes: [
      { hex: '#fafafa', number: 50 },
      { hex: '#f5f5f5', number: 100 },
      { hex: '#e5e5e5', number: 200 },
      { hex: '#d4d4d4', number: 300 },
      { hex: '#a3a3a3', number: 400 },
      { hex: '#737373', number: 500 },
      { hex: '#525252', number: 600 },
      { hex: '#404040', number: 700 },
      { hex: '#262626', number: 800 },
      { hex: '#171717', number: 900 },
      { hex: '#0a0a0a', number: 950 },
    ],
  },
  {
    name: 'Stone',
    palettes: [
      { hex: '#fafaf9', number: 50 },
      { hex: '#f5f5f4', number: 100 },
      { hex: '#e7e5e4', number: 200 },
      { hex: '#d6d3d1', number: 300 },
      { hex: '#a8a29e', number: 400 },
      { hex: '#78716c', number: 500 },
      { hex: '#57534e', number: 600 },
      { hex: '#44403c', number: 700 },
      { hex: '#292524', number: 800 },
      { hex: '#1c1917', number: 900 },
      { hex: '#0c0a09', number: 950 },
    ],
  },
  {
    name: 'Red',
    palettes: [
      { hex: '#fef2f2', number: 50 },
      { hex: '#fee2e2', number: 100 },
      { hex: '#fecaca', number: 200 },
      { hex: '#fca5a5', number: 300 },
      { hex: '#f87171', number: 400 },
      { hex: '#ef4444', number: 500 },
      { hex: '#dc2626', number: 600 },
      { hex: '#b91c1c', number: 700 },
      { hex: '#991b1b', number: 800 },
      { hex: '#7f1d1d', number: 900 },
      { hex: '#450a0a', number: 950 },
    ],
  },
  {
    name: 'Orange',
    palettes: [
      { hex: '#fff7ed', number: 50 },
      { hex: '#ffedd5', number: 100 },
      { hex: '#fed7aa', number: 200 },
      { hex: '#fdba74', number: 300 },
      { hex: '#fb923c', number: 400 },
      { hex: '#f97316', number: 500 },
      { hex: '#ea580c', number: 600 },
      { hex: '#c2410c', number: 700 },
      { hex: '#9a3412', number: 800 },
      { hex: '#7c2d12', number: 900 },
      { hex: '#431407', number: 950 },
    ],
  },
  {
    name: 'Amber',
    palettes: [
      { hex: '#fffbeb', number: 50 },
      { hex: '#fef3c7', number: 100 },
      { hex: '#fde68a', number: 200 },
      { hex: '#fcd34d', number: 300 },
      { hex: '#fbbf24', number: 400 },
      { hex: '#f59e0b', number: 500 },
      { hex: '#d97706', number: 600 },
      { hex: '#b45309', number: 700 },
      { hex: '#92400e', number: 800 },
      { hex: '#78350f', number: 900 },
      { hex: '#451a03', number: 950 },
    ],
  },
  {
    name: 'Yellow',
    palettes: [
      { hex: '#fefce8', number: 50 },
      { hex: '#fef9c3', number: 100 },
      { hex: '#fef08a', number: 200 },
      { hex: '#fde047', number: 300 },
      { hex: '#facc15', number: 400 },
      { hex: '#eab308', number: 500 },
      { hex: '#ca8a04', number: 600 },
      { hex: '#a16207', number: 700 },
      { hex: '#854d0e', number: 800 },
      { hex: '#713f12', number: 900 },
      { hex: '#422006', number: 950 },
    ],
  },
  {
    name: 'Lime',
    palettes: [
      { hex: '#f7fee7', number: 50 },
      { hex: '#ecfccb', number: 100 },
      { hex: '#d9f99d', number: 200 },
      { hex: '#bef264', number: 300 },
      { hex: '#a3e635', number: 400 },
      { hex: '#84cc16', number: 500 },
      { hex: '#65a30d', number: 600 },
      { hex: '#4d7c0f', number: 700 },
      { hex: '#3f6212', number: 800 },
      { hex: '#365314', number: 900 },
      { hex: '#1a2e05', number: 950 },
    ],
  },
  {
    name: 'Green',
    palettes: [
      { hex: '#f0fdf4', number: 50 },
      { hex: '#dcfce7', number: 100 },
      { hex: '#bbf7d0', number: 200 },
      { hex: '#86efac', number: 300 },
      { hex: '#4ade80', number: 400 },
      { hex: '#22c55e', number: 500 },
      { hex: '#16a34a', number: 600 },
      { hex: '#15803d', number: 700 },
      { hex: '#166534', number: 800 },
      { hex: '#14532d', number: 900 },
      { hex: '#052e16', number: 950 },
    ],
  },
  {
    name: 'Emerald',
    palettes: [
      { hex: '#ecfdf5', number: 50 },
      { hex: '#d1fae5', number: 100 },
      { hex: '#a7f3d0', number: 200 },
      { hex: '#6ee7b7', number: 300 },
      { hex: '#34d399', number: 400 },
      { hex: '#10b981', number: 500 },
      { hex: '#059669', number: 600 },
      { hex: '#047857', number: 700 },
      { hex: '#065f46', number: 800 },
      { hex: '#064e3b', number: 900 },
      { hex: '#022c22', number: 950 },
    ],
  },
  {
    name: 'Teal',
    palettes: [
      { hex: '#f0fdfa', number: 50 },
      { hex: '#ccfbf1', number: 100 },
      { hex: '#99f6e4', number: 200 },
      { hex: '#5eead4', number: 300 },
      { hex: '#2dd4bf', number: 400 },
      { hex: '#14b8a6', number: 500 },
      { hex: '#0d9488', number: 600 },
      { hex: '#0f766e', number: 700 },
      { hex: '#115e59', number: 800 },
      { hex: '#134e4a', number: 900 },
      { hex: '#042f2e', number: 950 },
    ],
  },
  {
    name: 'Cyan',
    palettes: [
      { hex: '#ecfeff', number: 50 },
      { hex: '#cffafe', number: 100 },
      { hex: '#a5f3fc', number: 200 },
      { hex: '#67e8f9', number: 300 },
      { hex: '#22d3ee', number: 400 },
      { hex: '#06b6d4', number: 500 },
      { hex: '#0891b2', number: 600 },
      { hex: '#0e7490', number: 700 },
      { hex: '#155e75', number: 800 },
      { hex: '#164e63', number: 900 },
      { hex: '#083344', number: 950 },
    ],
  },
  {
    name: 'Sky',
    palettes: [
      { hex: '#f0f9ff', number: 50 },
      { hex: '#e0f2fe', number: 100 },
      { hex: '#bae6fd', number: 200 },
      { hex: '#7dd3fc', number: 300 },
      { hex: '#38bdf8', number: 400 },
      { hex: '#0ea5e9', number: 500 },
      { hex: '#0284c7', number: 600 },
      { hex: '#0369a1', number: 700 },
      { hex: '#075985', number: 800 },
      { hex: '#0c4a6e', number: 900 },
      { hex: '#082f49', number: 950 },
    ],
  },
  {
    name: 'Blue',
    palettes: [
      { hex: '#eff6ff', number: 50 },
      { hex: '#dbeafe', number: 100 },
      { hex: '#bfdbfe', number: 200 },
      { hex: '#93c5fd', number: 300 },
      { hex: '#60a5fa', number: 400 },
      { hex: '#3b82f6', number: 500 },
      { hex: '#2563eb', number: 600 },
      { hex: '#1d4ed8', number: 700 },
      { hex: '#1e40af', number: 800 },
      { hex: '#1e3a8a', number: 900 },
      { hex: '#172554', number: 950 },
    ],
  },
  {
    name: 'Indigo',
    palettes: [
      { hex: '#eef2ff', number: 50 },
      { hex: '#e0e7ff', number: 100 },
      { hex: '#c7d2fe', number: 200 },
      { hex: '#a5b4fc', number: 300 },
      { hex: '#818cf8', number: 400 },
      { hex: '#6366f1', number: 500 },
      { hex: '#4f46e5', number: 600 },
      { hex: '#4338ca', number: 700 },
      { hex: '#3730a3', number: 800 },
      { hex: '#312e81', number: 900 },
      { hex: '#1e1b4b', number: 950 },
    ],
  },
  {
    name: 'Violet',
    palettes: [
      { hex: '#f5f3ff', number: 50 },
      { hex: '#ede9fe', number: 100 },
      { hex: '#ddd6fe', number: 200 },
      { hex: '#c4b5fd', number: 300 },
      { hex: '#a78bfa', number: 400 },
      { hex: '#8b5cf6', number: 500 },
      { hex: '#7c3aed', number: 600 },
      { hex: '#6d28d9', number: 700 },
      { hex: '#5b21b6', number: 800 },
      { hex: '#4c1d95', number: 900 },
      { hex: '#2e1065', number: 950 },
    ],
  },
  {
    name: 'Purple',
    palettes: [
      { hex: '#faf5ff', number: 50 },
      { hex: '#f3e8ff', number: 100 },
      { hex: '#e9d5ff', number: 200 },
      { hex: '#d8b4fe', number: 300 },
      { hex: '#c084fc', number: 400 },
      { hex: '#a855f7', number: 500 },
      { hex: '#9333ea', number: 600 },
      { hex: '#7e22ce', number: 700 },
      { hex: '#6b21a8', number: 800 },
      { hex: '#581c87', number: 900 },
      { hex: '#3b0764', number: 950 },
    ],
  },
  {
    name: 'Fuchsia',
    palettes: [
      { hex: '#fdf4ff', number: 50 },
      { hex: '#fae8ff', number: 100 },
      { hex: '#f5d0fe', number: 200 },
      { hex: '#f0abfc', number: 300 },
      { hex: '#e879f9', number: 400 },
      { hex: '#d946ef', number: 500 },
      { hex: '#c026d3', number: 600 },
      { hex: '#a21caf', number: 700 },
      { hex: '#86198f', number: 800 },
      { hex: '#701a75', number: 900 },
      { hex: '#4a044e', number: 950 },
    ],
  },
  {
    name: 'Pink',
    palettes: [
      { hex: '#fdf2f8', number: 50 },
      { hex: '#fce7f3', number: 100 },
      { hex: '#fbcfe8', number: 200 },
      { hex: '#f9a8d4', number: 300 },
      { hex: '#f472b6', number: 400 },
      { hex: '#ec4899', number: 500 },
      { hex: '#db2777', number: 600 },
      { hex: '#be185d', number: 700 },
      { hex: '#9d174d', number: 800 },
      { hex: '#831843', number: 900 },
      { hex: '#500724', number: 950 },
    ],
  },
  {
    name: 'Rose',
    palettes: [
      { hex: '#fff1f2', number: 50 },
      { hex: '#ffe4e6', number: 100 },
      { hex: '#fecdd3', number: 200 },
      { hex: '#fda4af', number: 300 },
      { hex: '#fb7185', number: 400 },
      { hex: '#f43f5e', number: 500 },
      { hex: '#e11d48', number: 600 },
      { hex: '#be123c', number: 700 },
      { hex: '#9f1239', number: 800 },
      { hex: '#881337', number: 900 },
      { hex: '#4c0519', number: 950 },
    ],
  },
];

function getScale(color) {
  console.log('🧪 Manual hslToHex test:', hslToHex({ h: 0, s: 1, l: 0.5 }));
  if (!isValidHex(color)) {
    throw new Error('Invalid HEX color input');
  }
  console.log('📢 getScale called with', color);
  const inputRgb = hexToRgb(color);
  const inputLab = rgbToLab(inputRgb);

  let closestPaletteGroup = null;
  let minDistance = Infinity;

  tailwindPalettes.forEach((paletteGroup) => {
    // Precompute LAB for all colors in this palette
    const labColors = paletteGroup.palettes.map((p) =>
      rgbToLab(hexToRgb(p.hex))
    );
    // Find minimal delta E for this palette
    let groupMinDeltaE = Infinity;
    for (let i = 0; i < labColors.length; i++) {
      const deltaE = getDeltaE00(inputLab, labColors[i]);
      if (deltaE < groupMinDeltaE) {
        groupMinDeltaE = deltaE;
      }
    }
    if (groupMinDeltaE < minDistance) {
      minDistance = groupMinDeltaE;
      closestPaletteGroup = paletteGroup;
      //console.log('🎯 Closest palette group:', paletteGroup.name);
    }
  });

  // If no palette group found, return empty
  if (!closestPaletteGroup || !closestPaletteGroup.palettes) {
    return {};
  }

  // Find the 500 reference color in the palette
  const ref500 = closestPaletteGroup.palettes.find((p) => p.number === 500);
  if (!ref500) {
    // fallback: just return the palette as is
    const result = {};
    closestPaletteGroup.palettes.forEach((p) => {
      result[`--primary-color-${p.number}`] = p.hex;
    });
    return result;
  }

  // HSL transform logic
  const inputHsl = hexToHsl(color);
  const refHsl = hexToHsl(ref500.hex);
  const deltaH = inputHsl.h - refHsl.h;
  const sRatio = refHsl.s === 0 ? 1 : inputHsl.s / refHsl.s;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const result = {};
  closestPaletteGroup.palettes.forEach((p) => {
    // For the 500, use the input color directly
    if (p.number === 500) {
      result[`--primary-color-${p.number}`] = color.startsWith('#')
        ? color
        : `#${color}`;
      return;
    }
    // Transform the palette color's HSL (mimic uicolors.app logic)
    const hsl = hexToHsl(p.hex);
    console.log(`🔧 Transforming color ${p.hex} → HSL:`, hsl);
    if (isNaN(hsl.h) || isNaN(hsl.s) || isNaN(hsl.l)) {
      console.error(`❌ HSL conversion failed for ${p.hex}`, hsl);
    }
    const { h: h3, s: s3, l } = hsl;
    // Use modular arithmetic to ensure newH is always in 0-360
    const newH = (h3 + deltaH + 360) % 360;
    // Clamp newS to [0,1]
    const newS = Math.max(0, Math.min(1, s3 * sRatio));
    // Updated log and NaN check for newH, newS, l
    console.log(`🔄 Adjusted HSL for ${p.hex}:`, { newH, newS, l });
    // NaN check before conversion
    if (isNaN(newH) || isNaN(newS) || isNaN(l)) {
      console.error(`❌ Skipping color due to invalid HSL values:`, {
        newH,
        newS,
        l,
      });
      return;
    }
    const newHex = hslToHex({ h: newH, s: newS, l });
    result[`--primary-color-${p.number}`] = newHex;
  });

  console.log('✅ Final generated palette:', result);
  return result;
}

// Delta E 2000 implementation
function getDeltaE00(color1, color2) {
  const { l: l1, a: a1, b: b1 } = color1;
  const { l: l2, a: a2, b: b2 } = color2;

  const rad2deg = 180 / Math.PI;
  const deg2rad = Math.PI / 180;

  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const mc = (c1 + c2) / 2;
  const ml = (l1 + l2) / 2;

  const c7 = Math.pow(mc, 7);
  const g = 0.5 * (1 - Math.sqrt(c7 / (c7 + Math.pow(25, 7))));

  const a11 = a1 * (1 + g);
  const a22 = a2 * (1 + g);

  const c11 = Math.sqrt(a11 * a11 + b1 * b1);
  const c22 = Math.sqrt(a22 * a22 + b2 * b2);
  const mc1 = (c11 + c22) / 2;

  let h1 = Math.atan2(b1, a11) * rad2deg;
  let h2 = Math.atan2(b2, a22) * rad2deg;

  if (h1 < 0) h1 += 360;
  if (h2 < 0) h2 += 360;

  let dh = h2 - h1;
  const dhAbs = Math.abs(dh);
  if (dhAbs > 180) {
    dh += dh < 0 ? 360 : -360;
  }

  let H = (h1 + h2) / 2;
  if (dhAbs > 180) {
    H = (h1 + h2 + 360) / 2;
  }

  const T =
    1 -
    0.17 * Math.cos(deg2rad * (H - 30)) +
    0.24 * Math.cos(deg2rad * 2 * H) +
    0.32 * Math.cos(deg2rad * (3 * H + 6)) -
    0.2 * Math.cos(deg2rad * (4 * H - 63));

  const dL = l2 - l1;
  const dC = c22 - c11;
  const dH = 2 * Math.sqrt(c11 * c22) * Math.sin(deg2rad * (dh / 2));

  const sL =
    1 + (0.015 * Math.pow(ml - 50, 2)) / Math.sqrt(20 + Math.pow(ml - 50, 2));
  const sC = 1 + 0.045 * mc1;
  const sH = 1 + 0.015 * mc1 * T;

  const dTheta = 30 * Math.exp(-Math.pow((H - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(c7 / (c7 + Math.pow(25, 7)));
  const Rt = -Rc * Math.sin(deg2rad * 2 * dTheta);

  const kl = 1;
  const kc = 1;
  const kh = 1;

  return Math.sqrt(
    Math.pow(dL / (kl * sL), 2) +
      Math.pow(dC / (kc * sC), 2) +
      Math.pow(dH / (kh * sH), 2) +
      Rt * (dC / (kc * sC)) * (dH / (kh * sH))
  );
}

window.getScale = getScale;

// HEX to HSL util
function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  const r1 = r / 255,
    g1 = g / 255,
    b1 = b / 255;
  const max = Math.max(r1, g1, b1),
    min = Math.min(r1, g1, b1);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
        break;
      case g1:
        h = (b1 - r1) / d + 2;
        break;
      case b1:
        h = (r1 - g1) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s, l };
}

function hslToHex({ h, s, l }) {
  try {
    console.log('🟢 hslToHex called with:', h, s, l);
    if (
      typeof h !== 'number' ||
      typeof s !== 'number' ||
      typeof l !== 'number'
    ) {
      console.error('❌ hslToHex received non-number:', { h, s, l });
    }

    // Debug: function entry, log values and types
    console.log('🟢 hslToHex START:', {
      h,
      s,
      l,
      types: { h: typeof h, s: typeof s, l: typeof l },
    });

    // NaN/type checks with error output
    if (
      typeof h !== 'number' ||
      isNaN(h) ||
      typeof s !== 'number' ||
      isNaN(s) ||
      typeof l !== 'number' ||
      isNaN(l)
    ) {
      console.error('❌ Invalid HSL in hslToHex:', { h, s, l });
      return '#000000';
    }

    // Normalized HSL values log
    console.log('🔁 Normalizing HSL values...');
    h = h % 360;
    if (h < 0) h += 360;
    s = Math.max(0, Math.min(1, s));
    l = Math.max(0, Math.min(1, l));
    console.log('📏 Normalized HSL:', { h, s, l });

    // Intermediates log (c, x, m)
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    console.log('🧪 Intermediates:', { c, x, m });

    let r = 0,
      g = 0,
      b = 0;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    // Final RGB values before converting to hex
    console.log('🎨 Final RGB values before hex:', { r, g, b });

    // Detailed per-channel toHex computation logs
    const toHex = (n) => {
      const result = Math.round((n + m) * 255);
      console.log('🔢 Converting toHex:', { n, m, result });
      return result.toString(16).padStart(2, '0');
    };

    const hexString = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    console.log('🎯 Final HEX:', hexString);
    return hexString;
  } catch (e) {
    console.error('💥 Exception in hslToHex:', e);
    return '#000000';
  }
}
