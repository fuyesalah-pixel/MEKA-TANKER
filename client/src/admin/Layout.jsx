import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Boxes,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  X,
} from 'lucide-react';

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/orders', label: 'Orders', icon: FileText },
  { to: '/admin/messages', label: 'Enquiries', icon: Inbox },
  { to: '/admin/subscribers', label: 'Subscribers', icon: Mail },
  { to: '/admin/content', label: 'Content', icon: FileText },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ admin, onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="ad">
      <aside className={`ad-side ${open ? 'is-open' : ''}`.trim()}>
        <div className="ad-side__brand">
          <Link to="/admin" className="ad-side__logo">
            <img src="/images/blue%20back%20ground%20logo.png" alt="" />
            <span>
              <strong>MEKA</strong>
              <small>Admin</small>
            </span>
          </Link>
          <button type="button" className="ad-icon-btn ad-side__close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="ad-nav">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `ad-nav__link ${isActive ? 'is-active' : ''}`.trim()}
              >
                <Icon size={17} strokeWidth={1.7} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="ad-side__foot">
          <Link to="/" className="ad-side__site">
            View website <ArrowUpRight size={14} />
          </Link>
          <div className="ad-side__user">
            <span className="ad-avatar">{(admin?.name || 'M').slice(0, 1)}</span>
            <span>
              <strong>{admin?.name || 'Meka Admin'}</strong>
              <small>{admin?.email}</small>
            </span>
          </div>
          <button type="button" className="ad-side__logout" onClick={onLogout}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      {open ? <div className="ad-side__scrim" onClick={() => setOpen(false)} /> : null}

      <div className="ad-main">
        <header className="ad-topbar">
          <button type="button" className="ad-icon-btn ad-topbar__burger" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={19} />
          </button>
          <div className="ad-topbar__title">
            <span className="ad-topbar__dot" aria-hidden="true" />
            Meka control room
          </div>
          <div className="ad-topbar__right">
            <a href="/" className="ad-topbar__link">
              View site <ArrowUpRight size={14} />
            </a>
            <span className="ad-avatar ad-avatar--sm">{(admin?.name || 'M').slice(0, 1)}</span>
          </div>
        </header>
        <div className="ad-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
