import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { Provider } from 'react-redux';
import './style/style.scss'

import store from './store';

import debounce from './utils/debounce';
import {saveState} from './services/browserStorage';

import {StrictMode} from 'react';

store.subscribe(
  debounce(() => {
      saveState(store.getState())
  }, 800)
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);


