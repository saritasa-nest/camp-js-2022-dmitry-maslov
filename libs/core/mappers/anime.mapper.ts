
import { AnimeBase } from '../models/anime-base';
import { AnimeType } from '../models/anime-type';

import { AnimeDTO } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

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
      airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      type: AnimeType.toAnimeType(dto.type),
      status: dto.status,
    });
  }
}
