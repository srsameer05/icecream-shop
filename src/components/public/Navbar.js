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
        <Link href="/" className="navbar_brand w-nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 12.38 7.39 15.18 10.5 15.82V20C10.5 20.55 10.95 21 11.5 21H12.5C13.05 21 13.5 20.55 13.5 20V15.82C16.61 15.18 19 12.38 19 9C19 5.13 15.87 2 12 2ZM12 14C9.24 14 7 11.76 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.76 14.76 14 12 14Z" fill="#e8527a"/>
            <path d="M9 9C9 7.34 10.34 6 12 6C12.55 6 13 5.55 13 5C13 4.45 12.55 4 12 4C9.24 4 7 6.24 7 9C7 9.55 7.45 10 8 10C8.55 10 9 9.55 9 9Z" fill="#3dbf9a"/>
          </svg>
          <span style={{ fontSize: '24px', fontWeight: '900', color: '#e8527a', fontFamily: 'Nunito, sans-serif' }}>
            Scoop<span style={{ color: '#3dbf9a' }}>Bill</span>
          </span>
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
