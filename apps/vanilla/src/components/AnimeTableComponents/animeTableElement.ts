import { ListAnime } from '@js-camp/core/models/listAnime';

import { $, Dom } from '../../core/Dom';

/**
 * Creates the HOME element of the anime table.
 * @param listAnime ListAnime prop.
 * @returns Instance HOUSE describing element of anime table.
 */
export function $createAnimeTableElement(listAnime: ListAnime): Dom {

  const $image = $.create<HTMLImageElement>('img', 'w-40 flex-shrink-0 flex-grow-1 justify-between');
  $image.$el.src = listAnime.image;
  const $imageCol = $.create('td', 'border-r')
    .append($image);

  const $engTitle = $.create('span')
    .setTextContent(listAnime.titleEng);
  const $titleCol = $.create('td', 'border-r').append($engTitle);

  const $status = $.create('span').setTextContent(listAnime.status);
  const $statusCol = $.create('td', 'border-r').append($status);

  const $airedStart = $.create('span').setTextContent(String(listAnime.airedStart ? listAnime.airedStart.getFullYear() : 'Unknown'));
  const $airedStartCol = $.create('td', 'border-r').append($airedStart);

  return (
    $.create('tr', 'flex border-y my-1 w-full justify-between')
      .append(
        $imageCol,
        $titleCol,
        $statusCol,
        $airedStartCol,
      )
  );
}
