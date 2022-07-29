import { AnimeDTO } from '../dtos/anime.dto';
import { Anime } from '../models/anime/anime';
import { AnimeType } from '../models/anime/animeType';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto ListAnime dto.
   */
  export function fromDto(dto: AnimeDTO): Anime {
    return new Anime({
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
