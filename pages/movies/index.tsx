import { useQuery } from 'react-query';
import { MoviesResponse } from 'types';
import { useDebouncedState } from '@mantine/hooks';
import { MovieSearchPages } from 'domains/movie/MovieSearchPages';
import { useEffect } from 'react';

export default function MoviePage({ response }) {
  const [activePage, setPage] = useDebouncedState(1, 500);
  const [search, setSearch] = useDebouncedState('', 500);

  const { data: popularData, isLoading: isPopularLoading } = useQuery(
    ['movie', activePage],
    () => fetchPopularMovie(activePage),
    {
      keepPreviousData: true,
      enabled: !search,
    },
  );
  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    ['movie_search', activePage],
    () => fetchSearchedMovie(search, activePage),
    {
      keepPreviousData: true,
      enabled: Boolean(search),
    },
  );

  if (isSearchLoading) console.log({ popularData, searchData, isPopularLoading });

  if (typeof popularData === 'undefined' || isPopularLoading || isSearchLoading) {
    return <>Loading</>;
  }

  function handleSearch(newSearch = '') {
    setPage(1);
    setSearch(newSearch);
  }

  const data = !search || typeof searchData === 'undefined' ? popularData : searchData;
  console.log({ data });

  return (
    <MovieSearchPages
      movies={data.results}
      page={activePage}
      onSearch={handleSearch}
      onChange={setPage}
      total={data.total_pages > 500 ? 500 : data.total_pages}
    />
  );
}

export function getServerSideProps() {
  return { props: { response: {} } };
}

async function fetchPopularMovie(page = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_THE_MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
  const res = await fetch(url);
  const response: MoviesResponse = await res.json();
  return response;
}

async function fetchSearchedMovie(search = '', page = 1) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.NEXT_PUBLIC_THE_MOVIE_DB_API_KEY
  }&language=en-US&page=${page}&include_adult=false${search ? `&query=${search}` : ''}`;

  const res = await fetch(url);
  const response: MoviesResponse = await res.json();
  return response;
}
