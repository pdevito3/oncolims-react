import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './apis/constants'
import { ReactLocation } from 'react-location';

const baseUrl = (document.getElementsByTagName('base')[0] || {}).href;

ReactDOM.render(
  <React.StrictMode>
    <ReactLocation>
      {/* <BrowserRouter basename={baseUrl}> */}
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      {/* </BrowserRouter> */}
    </ReactLocation>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
