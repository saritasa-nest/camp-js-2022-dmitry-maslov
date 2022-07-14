import { Anime } from '@js-camp/core/models/anime';

import { elementStyles, tableStyles } from './animeTable.styles';

/**
 * Creates the HOME element of the anime table.
 * @param anime ListAnime prop.
 * @returns HTML element of anime table.
 */
export function createAnimeTableElement(anime: Anime): HTMLElement {

  const image = document.createElement('img');
  image.classList.add(...elementStyles.image);
  image.src = anime.image;

  const imageCol = createCol();
  imageCol.classList.add(...tableStyles.imageCol);
  imageCol.append(image);

  const titleCol = createCol();
  const engTitle = document.createElement('span');
  engTitle.textContent = anime.titleEng;
  titleCol.append(engTitle);

  const statusCol = createCol();
  const status = document.createElement('span');
  status.textContent = anime.status;
  statusCol.append(status);

  const typeCol = createCol();
  const type = document.createElement('span');
  type.textContent = anime.animeType;
  typeCol.append(type);

  const airedStartCol = createCol();
  const airedStart = document.createElement('span');
  airedStart.textContent =
    anime.airedStart !== null ? String(anime.airedStart.getFullYear()) : 'Not started';
  airedStartCol.append(airedStart);

  const row = document.createElement('tr');
  row.classList.add(...tableStyles.row);
  row.append(imageCol, titleCol, typeCol, statusCol, airedStartCol);

  return row;
}

/**
 * Create column element.
 */
function createCol(): HTMLElement {
  const col = document.createElement('td');
  col.classList.add(...elementStyles.col);
  return col;
}
