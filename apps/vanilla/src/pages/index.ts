import { store } from './../../../react/src/store/store';
import { ListAnime } from '@js-camp/core/models/listAnime';

import { $, Dom } from '../core/Dom';
import { $createAnimeTableElement } from '../components/AnimeTableComponents/animeTableElement';

import { animeApi, GetPaginatedListAnimeListResponse } from './../services/anime.service';

interface AnimeTableComponentState {
  elements: ListAnime[];
  paginationParams: {
    limit: number;
    offset: number;
    count: number;
  };
}

function $createAnimeTableComponent(selector: string) {
  const state: AnimeTableComponentState = {
    elements: [],
    paginationParams: {
      limit: 10,
      offset: 0,
      count: 0,
    },
  };

  // TODO: Хочу реализовать тут все методы взаимодействия с комопонентом
  const methods = {

  }

  const $root = $(selector);
  const $tbody = $.create('tbody');

  async function getData(): Promise<GetPaginatedListAnimeListResponse> {
    const response = await animeApi.getPaginatedListAnimeList({
      limit: state.paginationParams.limit,
      offset: state.paginationParams.limit,
      ordering: 'id',
    });

    return response;
  }

  function updateDomTableElements() {
    const $elements = state.elements.map(listAnime =>
      $createAnimeTableElement(listAnime));

    $tbody
      .clear()
      .append(
        ...$elements,
      );
  }

  async function afterRender(): Promise<void> {
    const { results } = await getData();
    state.elements = results
    updateDomTableElements()
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
