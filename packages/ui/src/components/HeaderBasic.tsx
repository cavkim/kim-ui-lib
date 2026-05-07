"use client";

import React from "react";

export interface HeaderBasicProps {
  /** The brand name or logo text */
  logo: string;
  /** Optional tagline displayed next to the logo */
  tagline?: string;
  /** Optional custom className for the wrapper */
  className?: string;
}

/**
 * HeaderBasic — A minimal, clean header with logo and optional tagline.
 * Best for: simple pages, internal tools, admin panels.
 */
export function HeaderBasic({
  logo,
  tagline,
  className = "",
}: HeaderBasicProps) {
  return (
    <header
      className={`w-full bg-white border-b border-gray-200 shadow-sm ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        {/* Logo */}
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          {logo}
        </span>

        {/* Divider + tagline */}
        {tagline && (
          <>
            <span className="text-gray-300 select-none">|</span>
            <span className="text-sm text-gray-500 font-medium">{tagline}</span>
          </>
        )}
      </div>
    </header>
  );
}
