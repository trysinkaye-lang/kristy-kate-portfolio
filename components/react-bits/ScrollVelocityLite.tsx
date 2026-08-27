"use client";

export function ScrollVelocityLite({ items }: { items: string[] }) {
  const content = [...items, ...items];
  return (
    <div className="rb-marquee" aria-label="Technology stack highlights">
      <div className="rb-marquee-track">
        {content.map((item, index) => (
          <span className="rb-marquee-item" key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
