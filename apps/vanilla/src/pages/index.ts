import { ListAnime } from '@js-camp/core/models/listAnime';

import { $ } from '../core/Dom';
import { $createAnimeTableElement } from '../components/AnimeTableComponents/animeTableElement';

import { animeApi, GetPaginatedListAnimeListResponse } from './../services/anime.service';

interface AnimeTableState {
  elements: ListAnime[];
  paginationParams: {
    limit: number;
    offset: number;
    count: number;
  };
}

interface AnimeTableMethods {
  getData(): Promise<GetPaginatedListAnimeListResponse>;
  updateDomTableElements(): void;
}

function $createAnimeTableComponent(selector: string) {
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

  const $root = $(selector);
  const $tbody = $.create('tbody');

  async function afterRender(): Promise<void> {
    const { results } = await methods.getData();
    state.elements = results;
    methods.updateDomTableElements();
  }

  function render(): void {
    $root.append(
      $.create('table')
        .append(
          $.create('thead'),
          $tbody,
        ),
    );
  }

  render();
  afterRender();
}

$createAnimeTableComponent('#table');
