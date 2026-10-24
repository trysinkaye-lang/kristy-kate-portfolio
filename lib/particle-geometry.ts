/** Pure geometry shared by the renderer and browser verification. */
export const clamp = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export function spherePoint(index: number, count: number, radius: number) {
  const y = 1 - 2 * (index + .5) / count, ring = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  return [radius * ring * Math.cos(angle), radius * y, radius * ring * Math.sin(angle)];
}
export type PortraitSample = { x: number; y: number; tone: number; depth: number };
/** Border-connected background segmentation retains enclosed bright facial pixels.
 * The source has a near-white studio background; no invented human outline. */
export function segmentPortrait(data: Uint8ClampedArray, width: number, height: number) {
  const background = new Uint8Array(width * height), queue = new Int32Array(width * height);
  let head = 0, tail = 0;
  const visit = (p: number) => {
    if (background[p]) return;
    const i = p * 4, r = data[i], g = data[i + 1], b = data[i + 2];
    if (Math.min(r, g, b) < 218 || Math.max(r, g, b) - Math.min(r, g, b) > 24) return;
    background[p] = 1; queue[tail++] = p;
  };
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (head < tail) {
    const p = queue[head++], x = p % width, y = Math.floor(p / width);
    if (x > 0) visit(p - 1); if (x < width - 1) visit(p + 1);
    if (y > 0) visit(p - width); if (y < height - 1) visit(p + width);
  }
  const samples: PortraitSample[] = [];
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (background[p] || data[p * 4 + 3] < 128) continue;
    const tone = (data[p * 4] * .2126 + data[p * 4 + 1] * .7152 + data[p * 4 + 2] * .0722) / 255;
    const nx = x / width - .5, ny = y / height - .5;
    // Shallow photographic relief, not a claimed 3D scan. Rotation stays subtle.
    const depth = Math.sqrt(Math.max(0, 1 - (nx / .5) ** 2)) * .08 + tone * .045;
    samples.push({ x: nx, y: ny, tone, depth });
  }
  return samples;
}
export function projectPhilippines(coordinates: number[][][][]) {
  const cos = Math.cos(12.5 * Math.PI / 180);
  const rings = coordinates.flatMap(polygon => polygon.map(ring => ring.map(([lon, lat]) => [lon * cos, -lat])));
  const points = rings.flat();
  const minX = Math.min(...points.map(p => p[0])), maxX = Math.max(...points.map(p => p[0]));
  const minY = Math.min(...points.map(p => p[1])), maxY = Math.max(...points.map(p => p[1]));
  return rings.map(ring => ring.map(([x, y]) => [(x - (minX + maxX) / 2) / (maxY - minY), (y - (minY + maxY) / 2) / (maxY - minY)]));
}
