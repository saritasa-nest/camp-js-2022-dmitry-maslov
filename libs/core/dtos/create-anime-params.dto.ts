import { AnimeDTO } from './anime.dto';

export type CreateAnimeData = Omit<
  AnimeDTO,
  'id' | 'title' | 'genres_data' | 'studios_data'
>;
