import { AnimeBase } from '../models/anime-base';
import { AnimeType } from '../models/anime-type';

import { AnimeDTO } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { StudioMapper } from './studio.mapper';
import { GenreMapper } from './genre.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to base anime model.
   * @param dto Anime dto.
   */
  export function fromDtoToAnimeBase(dto: AnimeDTO): AnimeBase {
    return new AnimeBase({
      id: dto.id,
      image: dto.image,
      titleEng: dto.title_eng,
      titleJpn: dto.title_jpn,
      airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      type: AnimeType.toAnimeType(dto.type),
      status: dto.status,
    });
  }

  /**
   * Maps dto to anime model.
   * @param dto Anime dto.
   */
  export function fromDtoToAnime(dto: AnimeDTO): Anime {
    return new Anime({
      airing: dto.airing,
      id: dto.id,
      image: dto.image,
      titleEng: dto.title_eng,
      titleJpn: dto.title_jpn,
      airedRange: {
        airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
        airedFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
      },
      type: AnimeType.toAnimeType(dto.type),
      status: dto.status,
      synopsis: dto.synopsis,
      studios: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genres: dto.genres_data.map(genre => GenreMapper.fromDto(genre)),
    });
  }
}
