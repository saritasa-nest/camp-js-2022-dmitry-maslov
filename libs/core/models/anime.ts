import { Immerable, OmitImmerable } from './immerable';

import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

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

  /** Aired Range. */
  public readonly airedRange: {
    readonly airedStart: Date | null;
    readonly airedFinish: Date | null;
  };

  /** Anime type. */
  public readonly type: AnimeType;

  /** Anime Status. */
  public readonly status: AnimeStatus;

  /** Airing. */
  public readonly airing: boolean;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.airing = data.airing;
    this.image = data.image;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.airedRange = data.airedRange;
    this.type = data.type;
    this.status = data.status;
  }
}

type InitArgs = OmitImmerable<Anime>;
