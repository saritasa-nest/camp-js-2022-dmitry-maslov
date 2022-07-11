import { ListAnime } from '@js-camp/core/models/listAnime';

/**
 * Creates the HOME element of the anime table.
 * @param listAnime ListAnime prop.
 * @returns HTML element of anime table.
 */
export function $createAnimeTableElement(listAnime: ListAnime): HTMLElement {
  const $image = document.createElement('img');
  $image.classList.add(
    'w-40',
    'flex-shrink-0',
    'flex',
    'flex-grow-1',
    'justify-between',
  );
  $image.src = listAnime.image;

  const $imageCol = document.createElement('td');
  $imageCol.classList.add('border-r');
  $imageCol.append($image);

  const $engTitle = document.createElement('span');
  $engTitle.textContent = listAnime.titleEng;
  const $titleCol = document.createElement('td');
  $imageCol.classList.add('border-r');
  $titleCol.append($engTitle);

  const $status = document.createElement('span');
  $status.textContent = listAnime.status;
  const $statusCol = document.createElement('td');
  $statusCol.classList.add('border-r');
  $statusCol.append($status);

  const $airedStart = document.createElement('span');
  $airedStart.textContent =
    listAnime.airedStart !== null ? String(listAnime.airedStart.getFullYear()) : 'Not started';
  const $airedStartCol = document.createElement('td');
  $airedStartCol.append($airedStart);

  const $row = document.createElement('tr');
  $row.classList.add('flex', 'border-y', 'my-1', 'w-full', 'justify-between');
  $row.append($imageCol, $titleCol, $statusCol, $airedStartCol);

  return $row;
}
