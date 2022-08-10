import { Immerable, OmitImmerable } from './immerable';

import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { Genre } from './genre';
import { Studio } from './studios';

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

  /** Synopsis. */
  public readonly synopsis: string;

  /** Genres. */
  public readonly genres: readonly Genre[];

  /** Studios. */
  public readonly studios: readonly Studio[];

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
    this.synopsis = data.synopsis;
    this.genres = data.genres;
    this.studios = data.studios;
  }
}

type InitArgs = OmitImmerable<Anime>;
