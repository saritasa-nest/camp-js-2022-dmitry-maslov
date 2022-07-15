import { AnimeStatus } from '../enums/anime/status';
import { AnimeType } from '../enums/anime/type';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

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

  public constructor(data: InitArgs) {
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

type InitArgs = OmitImmerable<Anime>;
