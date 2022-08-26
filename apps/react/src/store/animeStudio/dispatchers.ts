import { Studio } from '@js-camp/core/models/studio';
import { createAction } from '@reduxjs/toolkit';

export namespace AnimeStudioActions {
  export const addStudios = createAction<readonly Studio[]>('animeStudio/addStudios');
}
