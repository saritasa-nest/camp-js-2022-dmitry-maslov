/** Anime Types. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  ONA = 'ONA',
  Music = 'MUSIC',
  Unknown = 'UNKNOWN',
}

export namespace AnimeType {

  const TO_READABLE_MAP: Readonly<Record<AnimeType, string>> = {
    [AnimeType.TV]: 'TV',
    [AnimeType.OVA]: 'OVA',
    [AnimeType.Movie]: 'Movie',
    [AnimeType.Special]: 'Special',
    [AnimeType.ONA]: 'ONA',
    [AnimeType.Music]: 'Music',
    [AnimeType.Unknown]: 'Unknown',
  };

  /**
   * Converts a certain anime type into readable equivalent.
   * @param value Anime type.
   */
  export function toReadable(value: AnimeType): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime type.
   * @param value Value.
   */
  export function toAnimeType(value: string): AnimeType {
    const type = value as AnimeType;
    return TO_READABLE_MAP[type] ? type : AnimeType.Unknown;
  }
}
