import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import { Provider } from 'react-redux';

import { Router } from './index.routes.tsx';
import DesignerContextProvider from './modules/core/components/Context/DesignerContext.tsx';
import appUrlConfigurator from './modules/core/utils/appUrlResolverHelper.ts';
import { store } from './modules/shared/state/store.ts';
import axios from 'axios';

appUrlConfigurator.setBaseHrefAndTenantCode();
axios.interceptors.request.use(
   (config: any) => {
    const token = localStorage.getItem('accessToken');
    console.log("actoken  ",token);
    console.log(":config ",config.url);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axios.defaults.baseURL = 'https://datajet-backend.onrender.com/';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignerContextProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </DesignerContextProvider>
  </React.StrictMode>
);
