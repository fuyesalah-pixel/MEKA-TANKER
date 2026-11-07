import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './lib/i18n.jsx';
import { SiteProvider } from './lib/site.jsx';
import { OrderProvider } from './lib/order.jsx';
import './styles/global.css';
import './styles/admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SiteProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </SiteProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
