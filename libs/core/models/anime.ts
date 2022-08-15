import { Immerable, OmitImmerable } from './immerable';

import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { Genre } from './genre';
import { Studio } from './studios';
import { DateRange } from './date-range';
import { AnimeRating } from './anime-rating';
import { AnimeSource } from './anime-source';
import { AnimeSeason } from './anime-season';

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
  public readonly airedRange: DateRange;

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

  /** YouTube trailer id. */
  public readonly youTubeTrailerId: string;

  /** Rating. */
  public readonly rating: AnimeRating;

  /** Source. */
  public readonly source: AnimeSource;

  /** Season. */
  public readonly season: AnimeSeason;

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
    this.youTubeTrailerId = data.youTubeTrailerId;
    this.rating = data.rating;
    this.source = data.source;
    this.season = data.season;
  }
}

type InitArgs = OmitImmerable<Anime>;
