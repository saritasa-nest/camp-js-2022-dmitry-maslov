import { AnimeDTO } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

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
      airedStart: new Date(dto.aired.start),
      animeType: dto.type,
      status: dto.status,
    });
  }
}
