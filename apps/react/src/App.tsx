import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { AppHeader } from './components/AppHeader/AppHeader';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <AppHeader></AppHeader>
      <Suspense fallback={<AppLoadingSpinner></AppLoadingSpinner>}>
        <RootRouter />
      </Suspense>
    </HashRouter>
  </Provider>
);
