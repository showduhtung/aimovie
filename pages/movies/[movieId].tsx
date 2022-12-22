import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Movie } from 'types';

export default function MoviePage({ movie }: { movie: Movie }) {
  // const router = useRouter();
  // const { movieId } = router.query;
  console.log({ movie });

  return (
    <p>
      {/* Movie: {movieId} */}
      {JSON.stringify(movie)}
      hi
    </p>
  );
}

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

// [{ page: 1, name: "Troll"}, { page: 2, name: "Avatar"}, { page: 3, name: "Black Adam"}]

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/movie/${params!.movieId}?api_key=${
    process.env.THE_MOVIE_DB_API_KEY
  }&language=en-US`;
  const res = await fetch(url);

  const movie: Movie = await res.json();
  return { props: { movie } };
};
