import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {easyGroupBuyStore} from '@easy-group-buy/redux'
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <Provider store={easyGroupBuyStore}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
