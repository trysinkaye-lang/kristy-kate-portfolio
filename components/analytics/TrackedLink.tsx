"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  trackPortfolioEvent,
  type PortfolioEventName,
} from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  eventName: PortfolioEventName;
  eventData?: Record<string, string | number | boolean | null>;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function TrackedLink({
  href,
  eventName,
  eventData,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
    trackPortfolioEvent(eventName, eventData);
    onClick?.(event);
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
