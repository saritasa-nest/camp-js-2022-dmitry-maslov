import '@js-camp/react/theme/style.css';
import { Box } from '@mui/material';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { AppHeader, AppLoadingSpinner } from './components';
import { AddUserWrapper } from './features/auth/components/AddUserWrapper/AddUserWrapper';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';

export const App: FC = () => (
  <Provider store={store}>
    <AddUserWrapper>
      <HashRouter>
        <AppHeader />
        <Box sx={{ px: 1 }}>
          <Suspense fallback={<AppLoadingSpinner />}>
            <RootRouter />
          </Suspense>
        </Box>
      </HashRouter>
    </AddUserWrapper>
  </Provider>
);
