// SUMMER, WINTER, SPRING, FALL, NON_SEASONAL

/** Anime statuses. */
export enum AnimeSeason {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
  NonSeasonal = 'NON_SEASONAL',
}

export namespace AnimeSeason {

  const TO_READABLE_MAP: Readonly<Record<AnimeSeason, string>> = {
    [AnimeSeason.Summer]: 'Summer',
    [AnimeSeason.Winter]: 'Winter',
    [AnimeSeason.Spring]: 'Spring',
    [AnimeSeason.Fall]: 'Fall',
    [AnimeSeason.NonSeasonal]: 'Non seasonal',
  };

  /**
   * Converts a certain anime status into readable equivalent.
   * @param value AnimeListItem type.
   */
  export function toReadable(value: AnimeSeason): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime status.
   * @param value Value.
   */
  export function toAnimeSeason(value: string): AnimeSeason {
    const type = value as AnimeSeason;
    return TO_READABLE_MAP[type] ? type : AnimeSeason.NonSeasonal;
  }
}

export const ANIME_SEASON_READABLE_MAP = {
  [AnimeSeason.Winter]: AnimeSeason.toReadable(AnimeSeason.Winter),
  [AnimeSeason.Summer]: AnimeSeason.toReadable(AnimeSeason.Summer),
  [AnimeSeason.Spring]: AnimeSeason.toReadable(AnimeSeason.Spring),
  [AnimeSeason.Fall]: AnimeSeason.toReadable(AnimeSeason.Fall),
  [AnimeSeason.NonSeasonal]: AnimeSeason.toReadable(AnimeSeason.NonSeasonal),
};
