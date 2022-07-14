import { Anime } from '@js-camp/core/models/anime';

import { elementStyles, tableStyles } from './animeTable.styles';

/**
 * Creates the HOME element of the anime table.
 * @param listAnime ListAnime prop.
 * @returns HTML element of anime table.
 */
export function createAnimeTableElement(listAnime: Anime): HTMLElement {

  const image = document.createElement('img');
  image.classList.add(...elementStyles.image);
  image.src = listAnime.image;

  const imageCol = createCol();
  imageCol.classList.add(...tableStyles.imageCol);
  imageCol.append(image);

  const titleCol = createCol();
  const engTitle = document.createElement('span');
  engTitle.textContent = listAnime.titleEng;
  titleCol.append(engTitle);

  const status = document.createElement('span');
  status.textContent = listAnime.status;
  const statusCol = createCol();
  statusCol.append(status);

  const airedStartCol = createCol();
  const airedStart = document.createElement('span');
  airedStart.textContent =
    listAnime.airedStart !== null ? String(listAnime.airedStart.getFullYear()) : 'Not started';
  airedStartCol.append(airedStart);

  const row = document.createElement('tr');
  row.classList.add(...tableStyles.row);
  row.append(imageCol, titleCol, statusCol, airedStartCol);

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
