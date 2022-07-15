import { Anime } from '@js-camp/core/models/anime';

import { elementStyles, tableStyles } from '../../constants/styles/animeTable';

/**
 * Creates the HOME element of the anime table.
 * @param anime Anime prop.
 * @returns HTML element of anime table.
 */
export function createAnimeColumn(anime: Anime): HTMLElement {

  const image = document.createElement('img');
  image.classList.add(...elementStyles.image);
  image.src = anime.image;

  const imageColumn = createColumn();
  imageColumn.classList.add(...tableStyles.imageColumn);
  imageColumn.append(image);

  const titleColumn = createColumn();
  const engTitle = document.createElement('span');
  engTitle.textContent = anime.titleEng;
  titleColumn.append(engTitle);

  const statusColumn = createColumn();
  const status = document.createElement('span');
  status.textContent = anime.status;
  statusColumn.append(status);

  const typeColumn = createColumn();
  const type = document.createElement('span');
  type.textContent = anime.animeType;
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
  column.classList.add(...elementStyles.column);
  return column;
}
