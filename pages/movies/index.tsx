import { useState } from 'react';
import { useQuery } from 'react-query';
import { MovieResponse } from 'types';
import { MoviePages } from 'domains/movie/MoviePages';

export default function MoviePage() {
  const [activePage, setPage] = useState(1);
  const { data, isLoading } = useQuery(['movie', activePage], () => fetchPopularMovie(activePage), {
    keepPreviousData: true,
  });
  if (typeof data === 'undefined' || isLoading) return <>Loading</>;

  return <MoviePages movies={data.results} page={activePage} onChange={setPage} total={500} />;
}

async function fetchPopularMovie(page = 1) {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_THE_MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
  const popularRes = await fetch(popularUrl);
  const popularResponse: MovieResponse = await popularRes.json();
  return popularResponse;
}
