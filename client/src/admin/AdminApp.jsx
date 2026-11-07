import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api, getToken, setToken } from '../lib/api.js';
import Login from './Login.jsx';
import Layout from './Layout.jsx';
import Dashboard from './Dashboard.jsx';
import ProductsAdmin from './ProductsAdmin.jsx';
import OrdersAdmin from './OrdersAdmin.jsx';
import MessagesAdmin from './MessagesAdmin.jsx';
import SubscribersAdmin from './SubscribersAdmin.jsx';
import ContentAdmin from './ContentAdmin.jsx';
import SettingsAdmin from './SettingsAdmin.jsx';

export default function AdminApp() {
  const [token, setTokenState] = useState(() => getToken());
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(Boolean(getToken()));

  useEffect(() => {
    let alive = true;
    if (!token) {
      setChecking(false);
      return undefined;
    }
    api
      .adminGet('/me')
      .then((data) => alive && setAdmin(data.admin))
      .catch(() => {
        if (!alive) return;
        setToken(null);
        setTokenState(null);
      })
      .finally(() => alive && setChecking(false));
    return () => {
      alive = false;
    };
  }, [token]);

  const logout = () => {
    setToken(null);
    setTokenState(null);
    setAdmin(null);
  };

  if (checking) {
    return (
      <div className="ad-boot">
        <span className="ad-boot__mark">MEKA</span>
        <span className="ad-boot__line" />
      </div>
    );
  }

  if (!token) {
    return (
      <Login
        onLogin={(nextToken, nextAdmin) => {
          setToken(nextToken);
          setTokenState(nextToken);
          setAdmin(nextAdmin);
        }}
      />
    );
  }

  return (
    <Routes>
      <Route path="/admin" element={<Layout admin={admin} onLogout={logout} />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="orders" element={<OrdersAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="subscribers" element={<SubscribersAdmin />} />
        <Route path="content" element={<ContentAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
