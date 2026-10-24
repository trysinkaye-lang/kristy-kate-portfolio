"use client";
import { useEffect, useState } from "react";
import styles from "./IntroSplash.module.css";

/** Metamorphosis-inspired entrance: numeric count and dust-to-form opening. */
export function IntroSplash() {
  const [count,setCount]=useState(0);
  useEffect(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    let frame=0, start=0;
    const duration=1500;
    const advance=(now:number)=>{
      if(!start)start=now;
      const t=Math.min(1,(now-start)/duration);
      setCount(Math.round((1-Math.pow(1-t,2.1))*100));
      if(t<1)frame=requestAnimationFrame(advance);
    };
    frame=requestAnimationFrame(advance);
    return ()=>cancelAnimationFrame(frame);
  },[]);
  return (
    <div data-intro-splash className={styles.splash} aria-hidden="true">
      <div className={styles.header}>
        <span>KRISTY KATE TAYLOR®</span><span>PORTFOLIO / 2026</span>
      </div>
      <div className={styles.center}>
        <div className={styles.dust} />
        <div className={styles.ring}><div className={styles.ringCore} /></div>
        <span className={styles.bigCount}>{String(count).padStart(3,"0")}</span>
        <span className={styles.label}>BUILDING THE EXPERIENCE</span>
      </div>
      <div className={styles.footer}>
        <span>EVERYTHING IS IN MOTION</span>
        <span className={styles.track}><span className={styles.fill}/></span>
        <span className={styles.counter}>{String(count).padStart(2,"0")}%</span>
      </div>
    </div>
  );
}
