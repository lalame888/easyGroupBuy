import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {easyGroupBuyStore} from '@easy-group-buy/redux'
import App from './app/app';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <Provider store={easyGroupBuyStore}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
