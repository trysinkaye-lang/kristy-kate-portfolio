import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { spherePoint, segmentPortrait, projectPhilippines } from "../lib/particle-geometry";

test("sphere has equal projected axes and actual front/back depth at every angle", () => {
  const points = Array.from({length: 10000}, (_, i) => spherePoint(i, 10000, 200));
  for (const angle of [0, .3, 1.2, 2.7]) {
    const rotated = points.map(([x,y,z]) => [x*Math.cos(angle)+z*Math.sin(angle), y, z*Math.cos(angle)-x*Math.sin(angle)]);
    const spans = [0,1,2].map(axis => Math.max(...rotated.map(p=>p[axis]))-Math.min(...rotated.map(p=>p[axis])));
    expect(spans[0]/spans[1]).toBeCloseTo(1, 2);
    expect(spans[2]).toBeGreaterThan(399);
    for (const p of rotated.filter((_,i)=>i%100===0)) expect(Math.hypot(...p)).toBeCloseTo(200, 6);
  }
});
test("segmentation removes connected studio background without erasing enclosed highlights", () => {
  const data = new Uint8ClampedArray(7*7*4).fill(255);
  for (let y=1;y<6;y++) for(let x=1;x<6;x++) {
    const offset=(y*7+x)*4;data[offset]=30;data[offset+1]=25;data[offset+2]=20;
  }
  data.set([250,250,250,255],(3*7+3)*4);
  const result=segmentPortrait(data,7,7);
  expect(result).toHaveLength(25);
  expect(result.some(p=>p.tone>.95)).toBe(true);
  expect(result.every(p=>Math.abs(p.x)<.5 && Math.abs(p.y)<.5)).toBe(true);
});
test("geographic map preserves archipelago bounds and a uniform projection", () => {
  const geometry=JSON.parse(readFileSync("public/media/philippines.geo.json","utf8"));
  expect(geometry.type).toBe("MultiPolygon");
  expect(geometry.coordinates.length).toBeGreaterThan(50);
  const points=projectPhilippines(geometry.coordinates).flat();
  const width=Math.max(...points.map(p=>p[0]))-Math.min(...points.map(p=>p[0]));
  const height=Math.max(...points.map(p=>p[1]))-Math.min(...points.map(p=>p[1]));
  expect(height).toBeCloseTo(1,6);expect(width).toBeGreaterThan(.55);expect(width).toBeLessThan(.8);
});
