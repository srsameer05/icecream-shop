'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/billing', label: 'New Bill', icon: '🧾' },
  { href: '/products', label: 'Products', icon: '🍨' },
  { href: '/inventory', label: 'Inventory', icon: '📦' },
  { href: '/analytics', label: 'Analytics', icon: '📈' },
  { href: '/settings', label: 'Profile', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="ico">🍦</div>
        <div>
          <div className="name">ScoopBill</div>
          <div className="sub">Ice Cream Shop</div>
        </div>
      </div>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-btn ${pathname === item.href ? 'active' : ''}`}
        >
          <span className="nav-ico">{item.icon}</span>
          {item.label}
        </Link>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ color: 'rgba(255,255,255,.3)', fontSize: '11px', padding: '8px' }}>
        v2.0 · ScoopBill
      </div>
    </nav>
  );
}
