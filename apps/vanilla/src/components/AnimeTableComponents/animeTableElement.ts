import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';

import { elementStyles, tableStyles } from '../../constants/styles/animeTable';

/**
 * Creates the HOME element of the anime table.
 * @param anime Anime.
 */
export function createAnimeColumn(anime: Anime): HTMLElement {
  const image = document.createElement('img');
  image.classList.add(...elementStyles.image);
  image.src = anime.image;

  const imageColumn = createColumn();
  imageColumn.classList.add(...tableStyles.imageColumn);
  imageColumn.append(image);

  const titleColumn = createColumn();
  titleColumn.classList.add(...tableStyles.titleColumn);
  const title = document.createElement('span');
  title.textContent = `${anime.titleEng ? anime.titleEng : ''} (${anime.titleJpn})`.trim();
  titleColumn.append(title);

  const statusColumn = createColumn();
  const status = document.createElement('span');
  status.textContent = AnimeStatus.toReadable(anime.status);
  statusColumn.append(status);

  const typeColumn = createColumn();
  const type = document.createElement('span');
  type.textContent = AnimeType.toReadable(anime.animeType);
  typeColumn.append(type);

  const airedStartColumn = createColumn();
  const airedStart = document.createElement('span');
  airedStart.textContent =
    anime.airedStart !== null ? String(anime.airedStart.getFullYear()) : 'Not started';
  airedStartColumn.append(airedStart);

  const row = document.createElement('tr');
  row.classList.add(...tableStyles.row);
  row.append(imageColumn, titleColumn, typeColumn, statusColumn, airedStartColumn);

  return row;
}

/** Create column element. */
function createColumn(): HTMLElement {
  const column = document.createElement('td');
  column.classList.add(...tableStyles.column);
  return column;
}
