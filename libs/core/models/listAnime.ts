import { AnimeStatus } from '../enums/anime/status.enum';
import { AnimeType } from '../enums/anime/type.enum';

import { Immerable, OmitImmerable } from './immerable';

/** ListAnime. */
export class ListAnime extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEng: string;

  /** Title in Japanese. */
  public readonly titleJpn: string;

  /** Aired start data. */
  public readonly airedStart: Date | null;

  /** Anime type. */
  public readonly animeType: AnimeType;

  /** Anime Status. */
  public readonly status: AnimeStatus;

  public constructor(data: PostInitArgs) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.airedStart = data.airedStart;
    this.animeType = data.animeType;
    this.status = data.status;
  }
}

type PostInitArgs = OmitImmerable<ListAnime>;
