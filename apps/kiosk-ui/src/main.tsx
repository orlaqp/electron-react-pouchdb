import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';

import App from './app/app';
import { environment } from './environments/environment';
import { initializeDataStorage } from '@wawa-kiosk/ui/data-storage';

initializeDataStorage(environment.db);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
