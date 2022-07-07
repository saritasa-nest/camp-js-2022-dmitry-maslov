import { ListAnime } from '@js-camp/core/models/listAnime';

import { $ } from '../../core/Dom';

import { Dom } from './../../core/Dom';

import { animeApi, GetPaginatedListAnimeListResponse } from './../../services/anime.service';

// Components
import { $createAnimeTableElement } from './animeTableElement';
import { $createAnimeTableHeader } from './animeTableHeader';

interface AnimeTableState {

  /** Anime Table Item Data. */
  elements: ListAnime[];

  /** Parameters for working with pagination. */
  paginationParams: {

    /** Limiting the amount of data. */
    limit: number;

    /** Offset. */
    offset: number;

    /** Number of elements on the server. */
    count: number;
  };
}

interface AnimeTableMethods {

  /** Gets anime list data and pagination data from the server. */
  getData(): Promise<GetPaginatedListAnimeListResponse>;

  /** Updates elements in an html table. */
  updateDomTableElements(): void;
}

/**
 * Render an anime table on the page.
 * @param selector The selector inside which we create the table. Example: '#app'.
 */
export function $createAnimeTableComponent(selector: string): Dom {
  const $root = $(selector);
  const $tbody = $.create('tbody');
  const $thead = $createAnimeTableHeader();

  const state: AnimeTableState = {
    elements: [],
    paginationParams: {
      limit: 10,
      offset: 0,
      count: 0,
    },
  };

  const methods: AnimeTableMethods = {
    async getData() {
      const response = await animeApi.getPaginatedListAnimeList({
        limit: state.paginationParams.limit,
        offset: state.paginationParams.limit,
        ordering: 'id',
      });

      return response;
    },
    updateDomTableElements() {
      const $elements = state.elements.map(listAnime => $createAnimeTableElement(listAnime));

      $tbody
        .clear()
        .append(...$elements);
    },
  };

  /**
   * The method is called right after the component is rendered.
   */
  async function didMount(): Promise<void> {
    const { results } = await methods.getData();
    state.elements = results;

    methods.updateDomTableElements();
  }

  /**
   * Mount the component on the root element.
   */
  function mount(): void {
    $root.append(
      $.create('table')
        .append(
          $thead,
          $tbody,
        ),
    );

    didMount();
  }

  mount();
  return $root;
}
