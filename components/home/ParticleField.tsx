"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number; tx: number; ty: number; tz: number; bx: number; by: number; bz: number; alpha: number; radius: number };

function rng(seed: number) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
}
const blend = (a: number, b: number, t: number) => a + (b-a) * t;
const smooth = (t: number) => t*t*(3-2*t);

/**
 * A single canvas holds the same points throughout the two-chapter introduction.
 * It constructs a portrait-shaped point cloud (using the portfolio's own photo)
 * and morphs those particles through abstract waves as the visitor scrolls.
 * No WebGL dependency and respects reduced-motion and low-power devices.
 */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.closest("section");
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;
    const motionOff = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const random = rng(27651);
    const image = new Image();
    image.src = "/media/kristy-kate-professional-portrait-v2.webp";
    let points: Point[] = [];
    let w = 0, h = 0, ratio = 1, raf = 0, last = 0, time = 0, visible = true;
    let progress = 0, pointerX = .76, pointerY = .44, mouseX = .76, mouseY = .44;
    let frameCount = 0;

    const makeMask = () => {
      const el = document.createElement("canvas");
      el.width = 180; el.height = 260;
      const paint = el.getContext("2d", { willReadFrequently:true });
      if (!paint) return null;
      // Human silhouette: fallback remains recognizable while the portrait
      // image provides individual density / photographic depth where available.
      paint.fillStyle = "#fff";
      paint.beginPath();
      paint.ellipse(88, 69, 43, 56, -.06, 0, Math.PI*2);
      paint.fill();
      paint.beginPath();
      paint.moveTo(66,118); paint.bezierCurveTo(67,138,52,142,31,153);
      paint.bezierCurveTo(4,169,0,208,-4,260);
      paint.lineTo(184,260);
      paint.bezierCurveTo(182,206,170,169,145,155);
      paint.bezierCurveTo(123,140,109,135,110,118);
      paint.closePath(); paint.fill();
      const silhouette = paint.getImageData(0,0,180,260);
      if (image.complete && image.naturalWidth > 0) {
        const photo = document.createElement("canvas");
        photo.width=180; photo.height=260;
        const brush=photo.getContext("2d", { willReadFrequently:true });
        if (brush) {
          const scale=Math.max(180/image.naturalWidth,260/image.naturalHeight);
          const iw=image.naturalWidth*scale, ih=image.naturalHeight*scale;
          brush.drawImage(image,(180-iw)/2,(260-ih)/2,iw,ih);
          try {
            const bitmap=brush.getImageData(0,0,180,260);
            return { silhouette, bitmap };
          } catch { /* cross-origin browser policy: keep the generated mask */ }
        }
      }
      return { silhouette, bitmap:null };
    };

    const create = () => {
      const mask = makeMask();
      if (!mask) return;
      const img = mask.bitmap?.data;
      const data = mask.silhouette.data;
      const count = w < 650 ? 2200 : w < 1024 ? 3700 : 6000;
      const gridW=180, gridH=260;
      // Estimate the photographic backdrop from the image corners.
      let bg=[25,25,25];
      if(img) {
        const locations=[[3,3],[176,3],[3,257],[176,257]];
        bg=[0,0,0];
        locations.forEach(([x,y])=>{const k=(y*180+x)*4; bg[0]+=img[k]/4;bg[1]+=img[k+1]/4;bg[2]+=img[k+2]/4;});
      }
      points=[];
      let tries=0;
      while(points.length<count && tries<count*27){
        tries++;
        const x=Math.floor(random()*gridW), y=Math.floor(random()*gridH), k=(y*gridW+x)*4;
        if(data[k+3]<50) continue;
        const fade=img ? Math.hypot(img[k]-bg[0],img[k+1]-bg[1],img[k+2]-bg[2])/300 : .8;
        // Facial features and photo depth influence particle opacity rather than
        // replacing the consistent silhouette shape with a rectangular photo.
        const imageValue=img ? .45 + .48*Math.min(1,fade) : .85;
        if(random() > (.44 + imageValue*.46)) continue;
        const ix=(x/gridW-.5)*2.0, iy=(y/gridH-.48)*2.3;
        const theta=random()*Math.PI*2;
        const r=Math.sqrt(random())*.86;
        const wave=random()*2-1;
        points.push({
          x:ix, y:iy, z:random()*2-1,
          tx:Math.cos(theta)*r*(1+.22*Math.sin(theta*4)), ty:Math.sin(theta)*r*.82,
          tz:random()*2-1,
          bx:(random()*2-1)*1.55,
          by:wave*1.22+.12*Math.sin(x*.11),
          bz:random()*2-1,
          alpha:imageValue*(.3+random()*.7),
          radius:.44+random()*.67
        });
      }
    };

    const resize = () => {
      w=innerWidth; h=innerHeight;
      ratio=Math.min(devicePixelRatio||1,1.5);
      canvas.width=Math.floor(w*ratio); canvas.height=Math.floor(h*ratio);
      canvas.style.width=w+"px"; canvas.style.height=h+"px";
      ctx.setTransform(ratio,0,0,ratio,0,0);
      create();
      draw();
    };
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      const mobile=w<767;
      const s=Math.min(w*(mobile?.38:.275), h*(mobile?.32:.42), 460);
      const cx=w*(mobile?.73:.727), cy=h*(mobile?.41:.52);
      const p=Math.max(0,Math.min(2,progress));
      const first=smooth(Math.max(0,Math.min(1,p)));
      const second=smooth(Math.max(0,Math.min(1,p-1)));
      const cursorDistance=Math.hypot(mouseX*w-cx,mouseY*h-cy);
      const flashlight=Math.max(.1,1-cursorDistance/Math.max(s*2,1));
      const glow=ctx.createRadialGradient(mouseX*w,mouseY*h,1,mouseX*w,mouseY*h,s*1.7);
      glow.addColorStop(0,"rgba(226,221,202,.11)");
      glow.addColorStop(.3,"rgba(204,202,185,.035)");
      glow.addColorStop(1,"rgba(204,202,185,0)");
      ctx.fillStyle=glow; ctx.fillRect(0,0,w,h);

      const spin=time*.00007;
      for(const dot of points) {
        const ripple=Math.sin(spin*8+dot.z*5+dot.y*3)*.045;
        const firstX=blend(dot.x,dot.tx*1.12,first);
        const firstY=blend(dot.y,dot.ty*.95,first);
        const x=blend(firstX,dot.bx,second);
        const y=blend(firstY,dot.by,second);
        const depth=blend(dot.z,dot.tz,first)*(1-second)+dot.bz*second;
        const rx=x*Math.cos(spin*.36)-depth*Math.sin(spin*.36);
        const rz=x*Math.sin(spin*.36)+depth*Math.cos(spin*.36);
        const persp=1/(1-rz*.13);
        const px=cx+(rx+ripple)*s*persp+(mouseX-.5)*depth*19;
        const py=cy+y*s*persp+(mouseY-.5)*depth*13;
        const influence=Math.max(0,1-Math.hypot(px-mouseX*w,py-mouseY*h)/(s*.78));
        const opacity=Math.min(1, (.16+flashlight*.28+influence*.8)*dot.alpha*(1-second*.28));
        const rad=dot.radius*(mobile?.63:1)*persp + influence*.28;
        ctx.fillStyle="rgba(232,229,217,"+opacity.toFixed(3)+")";
        ctx.fillRect(px,py,Math.max(.45,rad),Math.max(.45,rad));
      }
    };

    const onScroll=()=>{
      const bounds=section.getBoundingClientRect();
      const span=Math.max(1,section.getBoundingClientRect().height-innerHeight);
      progress=Math.min(2,Math.max(0,-bounds.top/span*2.1));
      visible=bounds.bottom > 0 && bounds.top < innerHeight;
      if(motionOff) draw();
    };
    const onMove=(e:PointerEvent)=>{
      pointerX=e.clientX/innerWidth;pointerY=e.clientY/innerHeight;
    };
    const tick=(now:number)=>{
      if(!last)last=now;
      const diff=Math.min(now-last,50);
      if(diff>0) time+=diff;
      last=now;
      mouseX+=(pointerX-mouseX)*.055;
      mouseY+=(pointerY-mouseY)*.055;
      if(visible && (frameCount++ % 2===0)) draw();
      raf=requestAnimationFrame(tick);
    };
    const onVisibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else if(!motionOff&&!raf){last=0;raf=requestAnimationFrame(tick);}};
    const onImg=()=>{create();draw();};
    window.addEventListener("resize",resize,{passive:true});
    window.addEventListener("scroll",onScroll,{passive:true});
    if(fine && !motionOff)window.addEventListener("pointermove",onMove,{passive:true});
    document.addEventListener("visibilitychange",onVisibility);
    image.addEventListener("load",onImg);
    resize(); onScroll();
    if(!motionOff)raf=requestAnimationFrame(tick);
    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",resize);
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("pointermove",onMove);
      document.removeEventListener("visibilitychange",onVisibility);
      image.removeEventListener("load",onImg);
    };
  },[]);
  return <canvas ref={ref} data-particle-field aria-hidden="true" style={{
    position:"sticky",top:0,zIndex:1,display:"block",width:"100%",height:"100svh",
    marginBottom:"-100svh",pointerEvents:"none"
  }}/>;
}
