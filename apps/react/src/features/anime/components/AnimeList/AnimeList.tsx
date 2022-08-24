import { AnimeListParams } from '@js-camp/react/api/services/animeService';
import { AppLoadingSpinner } from '@js-camp/react/components';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeBaseActions } from '@js-camp/react/store/animeBase/dispatchers';
import { selectAnimeBaseIsResultEmpty, selectAnimeBaseList } from '@js-camp/react/store/animeBase/selectors';
import { List, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { AnimeSortField, SortDirection } from '@js-camp/core/enums/anime/sort';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';
import { AnimeSortParams } from '@js-camp/react/core/models/animeSortParams';
import { useSearchParams } from 'react-router-dom';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

import { initialValues, ListManagerValue } from './form-setting';
import { AnimeListManager } from './AnimeListManager';

const DEFAULT_PARAMS: AnimeListParams = {
  filterParams: {
    search: '',
    type: [],
  },
  sortParams: {
    direction: SortDirection.NotSorted,
    sortBy: '',
  },
};

const getFilterParamsFromQuery = (
  queryParams: URLSearchParams,
): AnimeFilters => {
  const queryFilterType = queryParams.get(QUERY_PARAMS_MAP.filtersType);
  const filterType: AnimeType[] = [];

  if (queryFilterType != null) {
    const queryFilterTypeArray = queryFilterType.split(',');
    queryFilterTypeArray.forEach(animeType =>
      filterType.push(animeType as AnimeType));
  }

  return {
    search: (queryParams.get(QUERY_PARAMS_MAP.search) as string) ?? '',
    type: filterType,
  };
};

const createListQueryParamsFromListParams = (params: AnimeListParams): URLSearchParams => new URLSearchParams({
  [QUERY_PARAMS_MAP.search]: params.filterParams.search,
  [QUERY_PARAMS_MAP.filtersType]: params.filterParams.type.join(','),
  [QUERY_PARAMS_MAP.direction]: params.sortParams.direction,
  [QUERY_PARAMS_MAP.sortBy]: params.sortParams.sortBy,
});

const getSortParamsFromQuery = (
  queryParams: URLSearchParams,
): AnimeSortParams => ({
  direction:
    (queryParams.get(QUERY_PARAMS_MAP.direction) as SortDirection) ??
    DEFAULT_PARAMS.sortParams.direction,
  sortBy:
    (queryParams.get(QUERY_PARAMS_MAP.sortBy) as AnimeSortField) ??
    DEFAULT_PARAMS.sortParams.sortBy,
});

/** QueryParams for table. */
const QUERY_PARAMS_MAP = {
  limit: 'limit',
  page: 'page',
  search: 'search',
  sortBy: 'sortBy',
  direction: 'direction',
  filtersType: 'type',
} as const;

const getInitialListParamsFromQuery = (queryParams: URLSearchParams) => ({
  filterParams: getFilterParamsFromQuery(queryParams),
  sortParams: getSortParamsFromQuery(queryParams),
});

// eslint-disable-next-line max-lines-per-function
const AnimeListComponent: FC = () => {
  const animeList = useAppSelector(selectAnimeBaseList);
  const isResultEmpty = useAppSelector(selectAnimeBaseIsResultEmpty);
  const dispatch = useAppDispatch();
  const [queryParams, setSearchParams] = useSearchParams();
  const [listParams, setListParams] =
    useState<AnimeListParams>(getInitialListParamsFromQuery(queryParams));

  useEffect(() => {
    formik.setValues({
      filterParams: listParams.filterParams,
      sortParams: listParams.sortParams,
    });
  }, []);

  useEffect(() => {
    setSearchParams(createListQueryParamsFromListParams(listParams));
    dispatch(AnimeBaseActions.clearAnime());
  }, [listParams]);

  useEffect(() => {
    if (animeList.length === 0) {
      dispatch(AnimeBaseActions.fetchAnimeBase(listParams));
    }
  }, [animeList]);

  const getMoreAnime = () => {
    dispatch(AnimeBaseActions.fetchNextAnimeBase());
  };

  const handleSubmitListParamsButtonClick = useCallback(
    (values: ListManagerValue) => {
      setListParams(prev => ({
        ...prev,
        filterParams: values.filterParams,
        sortParams: values.sortParams,
      }));

      formik.setSubmitting(false);
    },
    [],
  );

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitListParamsButtonClick,
  });

  return (
    <>
      <Paper sx={{ m: 1 }}>
        <AnimeListManager formik={formik} />
      </Paper>
      <Paper sx={{ m: 1 }}>
        <List
          id="anime-list"
          sx={{
          overflowY: 'auto',
          maxHeight: '80vh',
          mt: 1,
          }}
        >
          <InfiniteScroll
            scrollableTarget="anime-list"
            hasMore={isResultEmpty != null}
            next={getMoreAnime}
            dataLength={animeList.length}
            loader={<AppLoadingSpinner />}
          >
            {animeList.map(anime => (
              <AnimeListItem anime={anime} key={anime.id}></AnimeListItem>
            ))}
          </InfiniteScroll>
        </List>
      </Paper>
    </>
  );
};

export const AnimeList = memo(AnimeListComponent);
