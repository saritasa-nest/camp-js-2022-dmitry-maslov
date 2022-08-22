import { Grid } from '@mui/material';
import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';

import { AnimeList } from '../components/AnimeList/AnimeList';

const AnimePageComponent: FC = () => (
  <Grid container>
    <Grid item xs={3}>
      <AnimeList></AnimeList>
    </Grid>
    <Grid item xs={12}>
      <Outlet />
    </Grid>
  </Grid>
);

export const AnimePage = memo(AnimePageComponent);
