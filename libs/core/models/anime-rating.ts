/** Anime rating. */
export enum AnimeRating {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG_13',
  R_17 = 'R_17',
  R_PLUS = 'R_PLUS',
  R_X = 'R_X',
  Unknown = 'UNKNOWN',
}

export namespace AnimeRating {

  const TO_READABLE_MAP: Readonly<Record<AnimeRating, string>> = {
    [AnimeRating.G]: 'G',
    [AnimeRating.PG]: 'PG',
    [AnimeRating.PG_13]: 'PG_13',
    [AnimeRating.R_17]: 'R_17',
    [AnimeRating.R_PLUS]: 'R_PLUS',
    [AnimeRating.R_X]: 'R_X',
    [AnimeRating.Unknown]: 'Unknown',
  };

  /**
   * Converts a certain anime status into readable equivalent.
   * @param value Anime rating.
   */
  export function toReadable(value: AnimeRating): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime status.
   * @param value Value.
   */
  export function toAnimeRating(value: string): AnimeRating {
    const type = value as AnimeRating;
    return TO_READABLE_MAP[type] ? type : AnimeRating.Unknown;
  }
}

export const ANIME_RATING_READABLE_MAP = {
  [AnimeRating.G]: AnimeRating.toReadable(AnimeRating.G),
  [AnimeRating.PG]: AnimeRating.toReadable(AnimeRating.PG),
  [AnimeRating.PG_13]: AnimeRating.toReadable(AnimeRating.PG_13),
  [AnimeRating.R_17]: AnimeRating.toReadable(AnimeRating.R_17),
  [AnimeRating.R_PLUS]: AnimeRating.toReadable(AnimeRating.R_PLUS),
  [AnimeRating.R_X]: AnimeRating.toReadable(AnimeRating.R_X),
  [AnimeRating.Unknown]: AnimeRating.toReadable(AnimeRating.Unknown),
};
