import { AnimeType } from '../models/anime-type';

export namespace AnimeFiltersMapper {

  /**
   * Map from anime filter types to dto.
   * @param animeFilterTypes Filter types.
   */
  export function filterTypeToDto(animeFilterTypes: readonly AnimeType[]): string {
    return `${animeFilterTypes.join(',')}`;
  }
}
