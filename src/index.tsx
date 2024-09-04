import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import {store} from '../src/app/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>
)