import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { PaginatedDataDto } from '@js-camp/core/dtos/paginated-data.dto';

import { http } from '..';

const url = 'anime/genres/';

export namespace GenresService {

  /** Fetches a list of genres. */
  export async function fetchGenres(): Promise<Genre[]> {
    const { data } = await http.get<PaginatedDataDto<GenreDto>>(url);
    return data.results.map(dto => GenreMapper.fromDto(dto));
  }
}
