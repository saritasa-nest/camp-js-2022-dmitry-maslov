import { ListAnime } from './../../../../libs/core/models/listAnime';
const table = document.querySelector('#table');

if (table === null) {
  throw new Error('selector not found');
}

/**
 *
 * @returns
 */
function createDomListAnime(listAnime: ListAnime): HTMLElement {
  const engTitle = document.createElement('span');
  engTitle.textContent(listAnime.titleEng);

}
