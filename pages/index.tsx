import { Space } from '@mantine/core';
import { CarouselTitle } from 'components';
import { MovieCarousel } from 'domains/movie';
import { MovieResponse } from 'types';

export default function HomePage({
  popularMovies,
  topRatadMovies,
}: {
  popularMovies: MovieResponse;
  topRatadMovies: MovieResponse;
}) {
  return (
    <>
      <CarouselTitle title="Popular Movies">
        <MovieCarousel data={popularMovies.results} />
      </CarouselTitle>

      <Space h="xl" />
      <Space h="xl" />

      <CarouselTitle title="Top Rated Movies">
        <MovieCarousel data={topRatadMovies.results} />
      </CarouselTitle>
    </>
  );
}

export async function getServerSideProps() {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`;
  const popularRes = await fetch(popularUrl);
  const topRatedRes = await fetch(topRatedUrl);

  const popularResponse: MovieResponse = await popularRes.json();
  const topRatedResponse: MovieResponse = await topRatedRes.json();
  return { props: { popularMovies: popularResponse, topRatadMovies: topRatedResponse } };
}
