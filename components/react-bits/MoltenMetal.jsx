'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './MoltenMetal.css';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const colorModeToFloat = mode => (mode === 'ember' ? 1 : mode === 'frost' ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;
  vec2 drift = vec2(0.0);
  if (uEnableMouse) drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  p += drift;
  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;
  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;
  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }
  c /= 6.0;
  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);
  float mid = 0.5;
  if (uColorMode > 1.5) mid = 0.65; else if (uColorMode > 0.5) mid = 0.35;
  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));
  float a = g;
  if (uGrain > 0.5) { float gr = hash(gl_FragCoord.xy + iTime); a += (gr - 0.5) * uGrainIntensity; }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}
`;

const ctxMap = new WeakMap();

const MoltenMetal = ({ color1='#5227FF', color2='#FF9FFC', color3='#FFFFFF', speed=.35, scale=4, detail=3, glow=1.6, coreSize=.1, swirl=1, fold=-.2, blackPoint=.05, brightness=1.3, colorMode='molten', grain=true, grainIntensity=.05, mouseInteraction=true, mouseStrength=.3, opacity=1, className='' }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const renderer = new Renderer({ webgl:2, alpha:true, premultipliedAlpha:true, antialias:false, dpr:Math.min(window.devicePixelRatio||1,1.5) });
    const gl=renderer.gl; gl.clearColor(0,0,0,0);
    const canvas=gl.canvas; canvas.style.width='100%'; canvas.style.height='100%'; canvas.style.display='block'; container.appendChild(canvas);
    const geometry=new Triangle(gl);
    const program=new Program(gl,{vertex,fragment,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:.35},uScale:{value:4},uDetail:{value:3},uGlow:{value:1.6},uCoreSize:{value:.1},uSwirl:{value:1},uFold:{value:-.2},uBlackPoint:{value:.05},uBrightness:{value:1.3},uColorMode:{value:0},uGrain:{value:1},uGrainIntensity:{value:.05},uOpacity:{value:1},uMouse:{value:new Float32Array([.5,.5])},uMouseStrength:{value:.3},uEnableMouse:{value:true},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}});
    const mesh=new Mesh(gl,{geometry,program}); ctxMap.set(container,{renderer,program,mesh});
    const setSize=()=>{const rect=container.getBoundingClientRect();renderer.setSize(Math.max(1,Math.floor(rect.width)),Math.max(1,Math.floor(rect.height)));const res=program.uniforms.iResolution.value;res[0]=gl.drawingBufferWidth;res[1]=gl.drawingBufferHeight;renderer.render({scene:mesh});};
    const ro=new ResizeObserver(setSize);ro.observe(container);setSize();
    const target=[.5,.5],current=[.5,.5];
    const move=e=>{const r=canvas.getBoundingClientRect();target[0]=(e.clientX-r.left)/r.width;target[1]=1-(e.clientY-r.top)/r.height;};
    const leave=()=>{target[0]=.5;target[1]=.5;};canvas.addEventListener('mousemove',move);canvas.addEventListener('mouseleave',leave);
    let raf=0,visible=true,pageVisible=!document.hidden;const t0=performance.now();
    const loop=t=>{program.uniforms.iTime.value=(t-t0)*.001;current[0]+=.05*(target[0]-current[0]);current[1]+=.05*(target[1]-current[1]);program.uniforms.uMouse.value[0]=current[0];program.uniforms.uMouse.value[1]=current[1];renderer.render({scene:mesh});raf=requestAnimationFrame(loop);};
    const start=()=>{if(visible&&pageVisible&&raf===0)raf=requestAnimationFrame(loop);};const stop=()=>{if(raf!==0){cancelAnimationFrame(raf);raf=0;}};
    const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;visible?start():stop();},{threshold:0});io.observe(container);
    const visibility=()=>{pageVisible=!document.hidden;pageVisible?start():stop();};document.addEventListener('visibilitychange',visibility);start();
    return()=>{stop();ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('mousemove',move);canvas.removeEventListener('mouseleave',leave);ctxMap.delete(container);try{container.removeChild(canvas);}catch{}gl.getExtension('WEBGL_lose_context')?.loseContext();};
  },[]);
  useEffect(()=>{const container=containerRef.current;if(!container)return;const ctx=ctxMap.get(container);if(!ctx)return;const u=ctx.program.uniforms;u.uSpeed.value=speed;u.uScale.value=scale;u.uDetail.value=detail;u.uGlow.value=glow;u.uCoreSize.value=Math.max(coreSize,.001);u.uSwirl.value=swirl;u.uFold.value=fold;u.uBlackPoint.value=blackPoint;u.uBrightness.value=brightness;u.uColorMode.value=colorModeToFloat(colorMode);u.uGrain.value=grain?1:0;u.uGrainIntensity.value=grainIntensity;u.uOpacity.value=opacity;u.uMouseStrength.value=mouseStrength;u.uEnableMouse.value=mouseInteraction;const c1=hexToRgb(color1),c2=hexToRgb(color2),c3=hexToRgb(color3);[u.uColor1.value,u.uColor2.value,u.uColor3.value].forEach((dest,i)=>{const src=[c1,c2,c3][i];dest[0]=src[0];dest[1]=src[1];dest[2]=src[2];});},[color1,color2,color3,speed,scale,detail,glow,coreSize,swirl,fold,blackPoint,brightness,colorMode,grain,grainIntensity,mouseInteraction,mouseStrength,opacity]);
  return <div ref={containerRef} className={`molten-metal-container ${className}`.trim()} />;
};
export default MoltenMetal;
