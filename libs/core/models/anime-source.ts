/** Anime source. */
export enum AnimeSource {
  FourKomaManga = 'FOUR_KOMA_MANGA',
  Book = 'BOOK',
  CardGame = 'CARD_GAME',
  Game = 'GAME',
  LightNovel = 'LIGHT_NOVEL',
  Manga = 'MANGA',
  MixedMedia = 'MIXED_MEDIA',
  Music = 'MUSIC',
  Novel = 'NOVEL',
  Original = 'ORIGINAL',
  PictureBook = 'PICTURE_BOOK',
  Radio = 'RADIO',
  VisualNovel = 'VISUAL_NOVEL',
  WebManga = 'WEB_MANGA',
  WebNovel = 'WEB_NOVEL',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export namespace AnimeSource {

  const TO_READABLE_MAP: Readonly<Record<AnimeSource, string>> = {
    [AnimeSource.FourKomaManga]: 'Four Koma Manga',
    [AnimeSource.Book]: 'Book',
    [AnimeSource.CardGame]: 'Card game',
    [AnimeSource.LightNovel]: 'Light novel',
    [AnimeSource.Manga]: 'Manga',
    [AnimeSource.MixedMedia]: 'Mixed media',
    [AnimeSource.Music]: 'Music',
    [AnimeSource.Novel]: 'Novel',
    [AnimeSource.Original]: 'Original',
    [AnimeSource.Other]: 'Other',
    [AnimeSource.PictureBook]: 'Picture book',
    [AnimeSource.Radio]: 'Radio',
    [AnimeSource.Game]: 'Game',
    [AnimeSource.Unknown]: 'Unknown',
    [AnimeSource.VisualNovel]: 'Visual Novel',
    [AnimeSource.WebManga]: 'Web manga',
    [AnimeSource.WebNovel]: 'Web novel',
  };

  /**
   * Converts a certain anime status into readable equivalent.
   * @param value Anime rating.
   */
  export function toReadable(value: AnimeSource): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime status.
   * @param value Value.
   */
  export function toAnimeSource(value: string): AnimeSource {
    const type = value as AnimeSource;
    return TO_READABLE_MAP[type] ? type : AnimeSource.Unknown;
  }
}

export const ANIME_SOURCE_READABLE_MAP = {
  [AnimeSource.Book]: AnimeSource.toReadable(AnimeSource.Book),
  [AnimeSource.CardGame]: AnimeSource.toReadable(AnimeSource.CardGame),
  [AnimeSource.FourKomaManga]: AnimeSource.toReadable(AnimeSource.FourKomaManga),
  [AnimeSource.Game]: AnimeSource.toReadable(AnimeSource.Game),
  [AnimeSource.LightNovel]: AnimeSource.toReadable(AnimeSource.LightNovel),
  [AnimeSource.Manga]: AnimeSource.toReadable(AnimeSource.Manga),
  [AnimeSource.MixedMedia]: AnimeSource.toReadable(AnimeSource.MixedMedia),
  [AnimeSource.Music]: AnimeSource.toReadable(AnimeSource.Music),
  [AnimeSource.Novel]: AnimeSource.toReadable(AnimeSource.Novel),
  [AnimeSource.Original]: AnimeSource.toReadable(AnimeSource.Original),
  [AnimeSource.Other]: AnimeSource.toReadable(AnimeSource.Other),
  [AnimeSource.PictureBook]: AnimeSource.toReadable(AnimeSource.PictureBook),
  [AnimeSource.Radio]: AnimeSource.toReadable(AnimeSource.Radio),
  [AnimeSource.Unknown]: AnimeSource.toReadable(AnimeSource.Unknown),
  [AnimeSource.VisualNovel]: AnimeSource.toReadable(AnimeSource.VisualNovel),
  [AnimeSource.WebManga]: AnimeSource.toReadable(AnimeSource.WebManga),
  [AnimeSource.WebNovel]: AnimeSource.toReadable(AnimeSource.WebNovel),
};
