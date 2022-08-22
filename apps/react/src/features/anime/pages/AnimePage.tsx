import { Grid } from '@mui/material';
import { FC, memo } from 'react';

import { AnimeList } from '../components/AnimeList/AnimeList';

const AnimePageComponent: FC = () => (
  <Grid container>
    <Grid item xs={3}>
      <AnimeList></AnimeList>
    </Grid>
    <Grid item xs={9}>
      <h1>Hello friend! </h1>
    </Grid>
  </Grid>
);

export const AnimePage = memo(AnimePageComponent);
