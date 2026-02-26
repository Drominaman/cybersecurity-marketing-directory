"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    ...(siteConfig.navigation.showBlog
      ? [{ label: "Blog", href: "/blog" }]
      : []),
    ...(siteConfig.navigation.showComparison
      ? [{ label: "Compare", href: `/best-${siteConfig.listing.singular}` }]
      : []),
    ...(siteConfig.navigation.customLinks || []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Site Name */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            {siteConfig.branding.logo ? (
              <img
                src={siteConfig.branding.logo}
                alt={siteConfig.name}
                className="h-8 w-auto"
              />
            ) : (
              <span>{siteConfig.name}</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            ))}
            <Button size="sm">
              Browse {siteConfig.listing.pluralCapitalized}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              ))}
              <Button size="sm" fullWidth className="mt-2">
                Browse {siteConfig.listing.pluralCapitalized}
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
