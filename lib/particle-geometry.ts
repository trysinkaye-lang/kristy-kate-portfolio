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
  // Row-specific silhouette breadth supports a restrained 3D relief without stretching the face.
  // One frontal photograph cannot supply an authentic 360-degree reconstruction.
  const left = new Int32Array(height).fill(width);
  const right = new Int32Array(height).fill(-1);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (background[p] || data[p * 4 + 3] < 128) continue;
    left[y] = Math.min(left[y], x);
    right[y] = Math.max(right[y], x);
  }
  const samples: PortraitSample[] = [];
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (background[p] || data[p * 4 + 3] < 128) continue;
    const nx = x / width - .5, ny = y / height - .5;
    const midpoint = (left[y] + right[y]) / 2;
    const halfWidth = Math.max(1, (right[y] - left[y]) / 2);
    const u = Math.max(-1, Math.min(1, (x - midpoint) / halfWidth));
    const roundness = Math.sqrt(Math.max(0, 1 - u * u));
    // Uniform density / brightness creates a faceless silhouette without photo texture.
    const depth = roundness * (y < height * .66 ? .12 : .065);
    samples.push({ x: nx, y: ny, tone: .75, depth });
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
