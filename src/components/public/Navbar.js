'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div id="Navbar" role="banner" className="navbar w-nav" style={{ zIndex: 1000 }}>
      <div className="container-large navbar">
        <Link href="/" className="navbar_brand w-nav-brand">
          <img
            src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d053_Logo.svg"
            loading="lazy"
            alt="Minimelts Egypt"
            className="navbar_logo"
          />
        </Link>
        <div className="navbar_menu-container">
          <nav
            role="navigation"
            className={`navbar_links-wrapper w-nav-menu ${isOpen ? 'w--open' : ''}`}
            style={isOpen ? { display: 'block', transform: 'translateY(0)', opacity: 1 } : {}}
          >
            <Link
              href="/about-us"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${pathname === '/about-us' ? 'w--current' : ''}`}
            >
              About us
            </Link>
            <Link
              href="/our-products"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${pathname === '/our-products' ? 'w--current' : ''}`}
            >
              Our products
            </Link>
            <Link
              href="/locations"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${pathname === '/locations' ? 'w--current' : ''}`}
            >
              Locations
            </Link>
            <Link
              href="/our-world"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${pathname === '/our-world' ? 'w--current' : ''}`}
            >
              Our world
            </Link>
            <Link
              href="/partners"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${pathname === '/partners' ? 'w--current' : ''}`}
            >
              Partners
            </Link>
            <Link
              href="/contact-us"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${pathname === '/contact-us' ? 'w--current' : ''}`}
            >
              Contact us
            </Link>
            <a href="#" className="button show-tablet w-button">
              Download brochure
            </a>
          </nav>
          <a href="#" className="button hide-tablet w-button">
            Download brochure
          </a>
        </div>
        <div
          className={`menu-button w-nav-button ${isOpen ? 'w--open' : ''}`}
          onClick={toggleMenu}
          aria-label="menu"
          role="button"
          tabIndex={0}
        >
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}
