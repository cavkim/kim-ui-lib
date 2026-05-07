"use client";

import React from "react";

export interface HeaderMarketingProps {
  /** Brand name */
  logo: string;
  /** Large headline text */
  headline: string;
  /** Optional supporting text below headline */
  subline?: string;
  /** Primary CTA button label */
  ctaLabel: string;
  /** Primary CTA button href */
  ctaHref: string;
  /** Optional secondary CTA */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /** Background variant */
  variant?: "light" | "dark" | "gradient";
  /** Optional custom className */
  className?: string;
}

/**
 * HeaderMarketing — A full hero-style marketing header.
 * Includes headline, subline, and CTA buttons.
 * Best for: landing pages, product pages, marketing sites.
 */
export function HeaderMarketing({
  logo,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  secondaryCta,
  variant = "light",
  className = "",
}: HeaderMarketingProps) {
  const variantStyles = {
    light: {
      wrapper: "bg-white",
      nav: "text-gray-900",
      headline: "text-gray-900",
      subline: "text-gray-600",
    },
    dark: {
      wrapper: "bg-gray-900",
      nav: "text-white",
      headline: "text-white",
      subline: "text-gray-400",
    },
    gradient: {
      wrapper: "bg-gradient-to-br from-brand-700 to-brand-900",
      nav: "text-white",
      headline: "text-white",
      subline: "text-brand-100",
    },
  }[variant];

  return (
    <header
      className={`w-full ${variantStyles.wrapper} ${className}`}
      role="banner"
    >
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className={`text-xl font-bold ${variantStyles.nav}`}>
            {logo}
          </span>
          <a
            href={ctaHref}
            className={`text-sm font-medium ${
              variant === "light"
                ? "text-brand-600 hover:text-brand-700"
                : "text-white opacity-80 hover:opacity-100"
            } transition-opacity`}
          >
            {ctaLabel} →
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${variantStyles.headline}`}
        >
          {headline}
        </h1>

        {subline && (
          <p
            className={`mt-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${variantStyles.subline}`}
          >
            {subline}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-600 text-white text-base font-semibold hover:bg-brand-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </a>

          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className={`inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold transition-all ${
                variant === "light"
                  ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
