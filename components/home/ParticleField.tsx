"use client";

import { useEffect, useRef } from "react";
import { PHILIPPINES_OUTLINE } from "@/lib/philippines-outline";

type Shape = "portrait" | "portraitRight" | "sphere" | "philippines" | "ribbon" | "work" | "torus" | "orb" | "ribbonLow" | "frame";
type Cloud = { x: Float32Array; y: Float32Array; z: Float32Array };
const ORDER: Shape[] = ["portrait", "portraitRight", "sphere", "philippines", "ribbon", "work", "torus", "orb", "ribbonLow", "frame"];
const TAU = Math.PI * 2;
const PHI = Math.PI * (3 - Math.sqrt(5));
function ease(x: number) { const t = Math.max(0, Math.min(1, x)); return t*t*(3-2*t); }
function mix(a: number,b: number,t: number) { return a+(b-a)*t; }
function randomMaker() {
  let state=902103;
  return () => { state=(1664525*state+1013904223)>>>0; return state/4294967296; };
}
function polygon(ctx: CanvasRenderingContext2D, coords: number[]) {
  ctx.beginPath();
  ctx.moveTo(coords[0],coords[1]);
  for(let i=2;i<coords.length;i+=2)ctx.lineTo(coords[i],coords[i+1]);
  ctx.closePath(); ctx.fill();
}
function makeMask(kind: "portrait" | "philippines"): { samples: Float32Array; count: number } {
  const mask=document.createElement("canvas");
  mask.width=256;mask.height=360;
  const p=mask.getContext("2d",{willReadFrequently:true});
  if(!p)return {samples:new Float32Array([0,0]),count:1};
  p.fillStyle="#fff";
  if(kind==="portrait") {
    // Bust, neck, head, and irregular hair contour as a point-cloud sculptural mask.
    p.beginPath();p.moveTo(105,190);
    p.bezierCurveTo(107,227,88,233,55,248);
    p.bezierCurveTo(19,260,5,302,-18,368);
    p.lineTo(277,368);
    p.bezierCurveTo(267,310,238,262,195,247);
    p.bezierCurveTo(161,236,147,222,150,189);
    p.closePath();p.fill();
    p.beginPath();p.ellipse(126,126,63,92,-.015,0,TAU);p.fill();
    p.beginPath();p.moveTo(61,148);
    p.bezierCurveTo(51,125,37,108,52,84);
    p.lineTo(45,69);p.lineTo(63,61);p.lineTo(65,42);
    p.lineTo(80,49);p.lineTo(85,26);p.lineTo(102,36);
    p.lineTo(119,19);p.lineTo(136,35);p.lineTo(153,20);
    p.lineTo(164,41);p.lineTo(185,31);p.lineTo(184,51);
    p.lineTo(208,52);p.lineTo(196,73);p.lineTo(214,81);
    p.lineTo(199,98);p.lineTo(205,123);p.lineTo(188,125);
    p.bezierCurveTo(185,73,156,53,127,55);
    p.bezierCurveTo(91,51,76,81,66,123);
    p.closePath();p.fill();
  } else {
    // Reconstruct the Philippines from the user's actual map reference.
    // The bitmap was traced into polygon contours to preserve the archipelago.
    p.save();
    p.scale(256 / 306, 360 / 461);
    for (const outline of PHILIPPINES_OUTLINE) {
      const values = outline.split(",").flatMap(pair => pair.trim().split(" ").map(Number));
      if(values.length>=6) polygon(p,values);
    }
    p.restore();
  }
  const alpha=p.getImageData(0,0,256,360).data;
  const candidates:number[]=[];
  for(let y=0;y<360;y++)for(let x=0;x<256;x++) {
    if(alpha[(y*256+x)*4+3]>100)candidates.push(x,y);
  }
  return {samples:new Float32Array(candidates),count:candidates.length/2};
}
function buildClouds(w:number,h:number,n:number, portrait:ReturnType<typeof makeMask>, country:ReturnType<typeof makeMask>):Record<Shape,Cloud>{
  const result={} as Record<Shape,Cloud>;
  const rand=randomMaker();
  for(const scene of ORDER)result[scene]={x:new Float32Array(n),y:new Float32Array(n),z:new Float32Array(n)};
  const mobile=w<768;
  const portraitWidth=Math.min(w*(mobile?.55:.40),490);
  const portraitHeight=Math.min(h*(mobile?.43:.56),530);
  const sphereR=Math.min(w*(mobile?.36:.34),h*.40,390);
  const mapR=Math.min(w*(mobile?.36:.33),h*.46,420);
  const orbitR=Math.min(w*(mobile?.37:.32),h*.36,410);
  const frameWidth=Math.min(w*(mobile?.79:.69),1020);
  const frameHeight=Math.min(h*(mobile?.35:.37),370);
  const pcx=w*.50,pcy=h*.59;
  for(let i=0;i<n;i++){
    const u=(i+.5)/n, angle=i*PHI;
    const a=rand()*TAU,b=rand()*TAU;
    const seed=rand(),jitter=rand();
    const pp=Math.floor(rand()*portrait.count)*2;
    const portraitX=(portrait.samples[pp]/256-.5)*2;
    const portraitY=(portrait.samples[pp+1]/360-.48)*2;
    const targets=result;
    const set=(key:Shape,x:number,y:number,z:number)=>{
      targets[key].x[i]=x; targets[key].y[i]=y; targets[key].z[i]=z;
    };
    const px=pcx+portraitX*portraitWidth;
    const py=pcy+portraitY*portraitHeight;
    set("portrait",px,py,(seed-.5)*50);
    set("portraitRight",w*(mobile?.68:.69)+portraitX*portraitWidth*(mobile?.82:.90),
      h*.57+portraitY*portraitHeight*.91,(seed-.5)*50);
    const sy=1-2*u,rr=Math.sqrt(Math.max(0,1-sy*sy));
    // A front-facing, perfectly circular filled globe. Depth comes from subtle
    // brightness variation, not a rotating edge-on projection.
    const discR = sphereR * Math.sqrt(rand());
    const discA = rand() * TAU;
    set("sphere",w*.50+discR*Math.cos(discA),h*.53+discR*Math.sin(discA),sphereR*Math.sqrt(Math.max(0,1-discR*discR/(sphereR*sphereR))));
    const mp=Math.floor(rand()*country.count)*2;
    const mx=(country.samples[mp]/256-.5)*2;
    const my=(country.samples[mp+1]/360-.49)*2;
    set("philippines",w*.49+mx*mapR*.60,h*.50+my*mapR,(seed-.5)*33);
    const ribbonT=2*u-1;
    const strand=i%2===0?1:-1;
    const tw=a;
    set("ribbon",w*.5+ribbonT*w*.91,
      h*.47+Math.sin(ribbonT*5.3)*h*.18+strand*Math.cos(ribbonT*13.7+tw)*h*.09,
      (jitter-.5)*95);
    set("work",w*.51+ribbonT*w*.79,
      h*.44+Math.sin(ribbonT*5.1+1)*h*.17+strand*Math.cos(ribbonT*11+tw)*h*.045,
      (seed-.5)*60);
    const major=orbitR*.75,minor=orbitR*.33;
    const torusA=rand()*TAU,torusB=rand()*TAU;
    const tX=(major+minor*Math.cos(torusB))*Math.cos(torusA);
    const tY=(major+minor*Math.cos(torusB))*Math.sin(torusA);
    const tZ=minor*Math.sin(torusB);
    set("torus",w*.51+tX,h*.51+tY*.72+tZ*.35,tZ);
    const whirlA=rand()*TAU,whirlB=rand()*TAU;
    const whirlR=orbitR*(.48+.42*rand());
    set("orb",w*.53+Math.cos(whirlA)*whirlR,
      h*.50+Math.sin(whirlA)*whirlR*.85,
      Math.sin(whirlB+whirlA*1.6)*orbitR*.26);
    set("ribbonLow",w*.48+ribbonT*w*.89,
      h*.5+Math.sin(ribbonT*7.5+1.8)*h*.2+Math.cos(ribbonT*19+tw)*h*.035,
      (seed-.5)*70);
    const perimeter=rand()*4;
    const edge=Math.floor(perimeter);
    const v=perimeter-edge;
    const halfX=frameWidth*.5,halfY=frameHeight*.5;
    const jitterX=(rand()-.5)*27,jitterY=(rand()-.5)*27;
    const x=edge===0?mix(-halfX,halfX,v):edge===1?halfX:edge===2?mix(halfX,-halfX,v):-halfX;
    const y=edge===0?-halfY:edge===1?mix(-halfY,halfY,v):edge===2?halfY:mix(halfY,-halfY,v);
    set("frame",w*.5+x+jitterX,h*.49+y+jitterY,(seed-.5)*33);
  }
  return result;
}

/** One persistent scroll-scrubbed particle field across the entire homepage. */
export function ParticleField() {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;
    const ctx=canvas?.getContext("2d",{alpha:true});
    if(!canvas||!ctx)return;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse=matchMedia("(pointer: coarse)").matches;
    const portrait=makeMask("portrait");
    const country=makeMask("philippines");
    const scenes=Array.from(document.querySelectorAll<HTMLElement>("[data-particle-scene]"))
      .filter(e=>ORDER.includes(e.dataset.particleScene as Shape));
    const order=scenes.map(e=>e.dataset.particleScene as Shape);
    const n=coarse?3400:matchMedia("(max-width: 1080px)").matches?5600:9800;
    let width=1,height=1,dpr=1, clouds:Record<Shape,Cloud>|null=null;
    let centers:number[]=[],desired=0,current=0,frame=0,last=0,clock=0,visible=true;
    let targetX=.5,targetY=.5,mouseX=.5,mouseY=.5;
    const size=()=> {
      width=innerWidth;height=innerHeight;
      dpr=Math.min(devicePixelRatio||1,1.5);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      clouds=buildClouds(width,height,n,portrait,country);
      centers=scenes.map(el=>el.getBoundingClientRect().top+scrollY+el.offsetHeight*.5);
      onScroll();
      draw();
    };
    const onScroll=()=>{
      const mid=scrollY+innerHeight*.5;
      if(centers.length===0)return;
      if(mid<=centers[0]){desired=0;return;}
      if(mid>=centers[centers.length-1]){desired=centers.length-1;return;}
      for(let i=0;i<centers.length-1;i++){
        if(mid>=centers[i]&&mid<centers[i+1]){
          // Give each shape a stable hold around its own chapter. Morph
          // only between the inner transition bands rather than all the time.
          const sectionProgress=(mid-centers[i])/Math.max(1,centers[i+1]-centers[i]);
          desired=i+ease((sectionProgress-.28)/.44);
          break;
        }
      }
      if(reduced){current=desired;draw();}
    };
    const draw=()=>{
      if(!clouds)return;
      ctx.clearRect(0,0,width,height);
      const start=Math.max(0,Math.min(order.length-1,Math.floor(current)));
      const end=Math.min(order.length-1,start+1);
      const f=ease(current-start);
      const from=clouds[order[start]],to=clouds[order[end]];
      canvas.dataset.activeShape=order[Math.round(current)] || "portrait";
      const orbWeight=(["sphere","torus","orb"].includes(order[start])?1-f:0)+
        (["sphere","torus","orb"].includes(order[end])?f:0);
      const rotation=clock*.00013;
      // A subdued spot of light follows the cursor through the scene.
      const glow=ctx.createRadialGradient(mouseX*width,mouseY*height,0,mouseX*width,mouseY*height,Math.min(width*.4,430));
      glow.addColorStop(0,"rgba(225,226,219,.047)");
      glow.addColorStop(1,"rgba(225,226,219,0)");
      ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
      ctx.fillStyle="#f3f2ed";
      const vignette=Math.min(width,height)*.23;
      const projectDim=(order[start]==="work"?1-f:0)+(order[end]==="work"?f:0);
      for(let i=0;i<n;i++){
        let x=mix(from.x[i],to.x[i],f);
        let y=mix(from.y[i],to.y[i],f);
        const z=mix(from.z[i],to.z[i],f);
        const relX=x-width*.5;
        const globeMix=(order[start]==="sphere"?1-f:0)+(order[end]==="sphere"?f:0);
        x+=orbWeight*(1-globeMix)*(Math.cos(rotation)*relX-Math.sin(rotation)*z-relX)*.46;
        y+=Math.sin(rotation*2+i*.73)*(.7+orbWeight*1.8);
        const md=Math.hypot(x-mouseX*width,y-mouseY*height);
        const near=Math.max(0,1-md/vignette);
        const wave=Math.sin(clock*.0009+i*.14)*.11;
        const light=(.19+Math.max(0,z/(Math.min(width,height)*.6))*.27+
          near*.63+wave)*(.83-projectDim*.30);
        ctx.globalAlpha=Math.max(.09,Math.min(.92,light));
        const r=coarse?.83:1.08;
        ctx.fillRect(x,y,r+near*.7,r+near*.7);
      }
      ctx.globalAlpha=1;
    };
    const onPointer=(event:PointerEvent)=>{
      targetX=event.clientX/width;targetY=event.clientY/height;
    };
    const tick=(stamp:number)=>{
      if(!last)last=stamp;
      const delta=Math.min(stamp-last,50);last=stamp;
      clock+=delta;
      current+=(desired-current)*Math.min(1,delta/110);
      mouseX+=(targetX-mouseX)*Math.min(1,delta/160);
      mouseY+=(targetY-mouseY)*Math.min(1,delta/160);
      if(visible && (!coarse || Math.floor(clock/32)!==Math.floor((clock-delta)/32)))draw();
      frame=requestAnimationFrame(tick);
    };
    const onVisibility=()=>{
      visible=!document.hidden;
      if(!visible){cancelAnimationFrame(frame);frame=0;}
      else if(!reduced&&frame===0){last=0;frame=requestAnimationFrame(tick);}
    };
    const onResize=()=>size();
    size();
    if(!reduced)frame=requestAnimationFrame(tick);
    addEventListener("scroll",onScroll,{passive:true});
    addEventListener("resize",onResize,{passive:true});
    if(!reduced&&!coarse)addEventListener("pointermove",onPointer,{passive:true});
    document.addEventListener("visibilitychange",onVisibility);
    return()=>{
      cancelAnimationFrame(frame);
      removeEventListener("scroll",onScroll);
      removeEventListener("resize",onResize);
      removeEventListener("pointermove",onPointer);
      document.removeEventListener("visibilitychange",onVisibility);
    };
  },[]);
  return <canvas data-particle-field ref={ref} aria-hidden="true" style={{
    position:"sticky",top:0,zIndex:0,width:"100%",height:"100svh",display:"block",
    marginBottom:"-100svh",pointerEvents:"none"
  }}/>;
}
