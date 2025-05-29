function hexToHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r, g, b;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (x) => {
    const hex = Math.round((x + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateScale(baseHex) {
  const hsl = hexToHSL(baseHex);
  const baseLightness = hsl.l;

  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const targetLightness = [97, 93, 87, 77, 67, 57, 31, 24, 18, 12, 7];

  // találd meg a legközelebbi pozíciót
  const closestIndex = targetLightness.reduce((best, curr, i) => {
    return Math.abs(curr - baseLightness) <
      Math.abs(targetLightness[best] - baseLightness)
      ? i
      : best;
  }, 0);

  const scale = {};

  for (let i = 0; i < keys.length; i++) {
    if (i === closestIndex) {
      scale[keys[i]] = baseHex;
    } else {
      const lightness = targetLightness[i];
      const adjustedL =
        lightness + (baseLightness - targetLightness[closestIndex]);
      const clampedL = Math.max(5, Math.min(95, adjustedL));
      scale[keys[i]] = hslToHex(hsl.h, hsl.s, clampedL);
    }
  }

  // const cssOutput = `:root {\n${Object.entries(scale)
  //   .map(([key, value]) => `  --primary-color-${key}: ${value};`)
  //   .join('\n')}\n}`;
  // return cssOutput;
  const cssVariables = Object.entries(scale).reduce((acc, [key, value]) => {
    acc[`--primary-color-${key}`] = value;
    return acc;
  }, {});
  return cssVariables;
}

window.generateScale = generateScale;
