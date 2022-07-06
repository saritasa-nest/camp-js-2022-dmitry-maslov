import { ListAnimeDTO } from '../dtos/animeList.dto';
import { ListAnime } from '../models/listAnime';

export namespace ListAnimeMapper {

  /**
   * Maps dto to model.
   * @param dto ListAnime dto.
   */
  export function fromDto(dto: ListAnimeDTO): ListAnime {
    return new ListAnime({
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
