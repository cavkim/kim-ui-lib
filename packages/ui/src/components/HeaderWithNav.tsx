"use client";

import React, { useState } from "react";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderWithNavProps {
  /** The brand name */
  logo: string;
  /** Navigation links */
  links: NavLink[];
  /** Optional CTA button */
  cta?: {
    label: string;
    href: string;
  };
  /** Optional custom className */
  className?: string;
}

/**
 * HeaderWithNav — A full navigation header with links and optional CTA button.
 * Includes a mobile hamburger menu.
 * Best for: marketing sites, SaaS apps, portfolios.
 */
export function HeaderWithNav({
  logo,
  links,
  cta,
  className = "",
}: HeaderWithNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`w-full bg-white border-b border-gray-200 ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-brand-600 transition-colors"
          >
            {logo}
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                aria-current={link.isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {cta && (
              <a
                href={cta.href}
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                {cta.label}
              </a>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-gray-100 py-3 pb-4"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            {cta && (
              <div className="px-4 pt-3 border-t border-gray-100 mt-3">
                <a
                  href={cta.href}
                  className="block text-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  {cta.label}
                </a>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
