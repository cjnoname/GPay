import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { ApplicationState } from './store';
import Routes from './routes';
import { initialActions } from './components/Initial/actions';
import '../../public/css/global.css';

function importAll(r: any) {
  return r.keys().map(r);
}

importAll(require.context('../../public/images', false, /\.(png|jpe?g|svg)$/));

const history = createBrowserHistory({ basename: document.getElementsByTagName('base')[0].getAttribute('href')! });
const store = configureStore(history, (window as any).initialReduxState as ApplicationState);

async function renderApp() {
  await store.dispatch(initialActions.initialAction() as any);

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('react-app')
  );
}

renderApp();
