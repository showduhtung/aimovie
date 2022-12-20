import { useState } from 'react';
import { ActionIcon, Box, Card, Text, UnstyledButton } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons';
import { Movie } from 'types';

interface MovieVideoResponseInterface {
  id: number;
  results: MovieVideoInterface[];
}

interface MovieVideoInterface {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published: Date;
  id: string;
}

export const MovieThumbnail = ({ movie }: { movie: Movie }) => {
  const { backdrop_path, id, title, release_date } = movie;
  const [isHovering, setIsHovering] = useState(false);
  const [source, setSource] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  async function fetchMovie(_: any) {
    const results = await fetchMovieTrailer(id);
    const movieWithTrailers = results.filter((movie) => movie.type === 'Trailer');
    setHasSearched(true);
    if (movieWithTrailers.length) setSource(movieWithTrailers[0].key);
    // TODO: no false data handling
  }

  const ThumbnailCard = (
    <Box
      style={{
        height: '215px',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundImage: `${
          isHovering ? 'linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), ' : ''
        } url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        margin: 0,
      }}
    >
      {isHovering && (
        <Box style={{ position: 'absolute', left: '50%', top: '40%' }}>
          <ActionIcon component="button" variant="filled" onClick={fetchMovie}>
            <IconPlayerPlay color="white" />
          </ActionIcon>
        </Box>
      )}

      <Box style={{ position: 'absolute', bottom: '0px', padding: '8px' }}>
        <UnstyledButton>
          <Text color="white">{title}</Text>
          <Text color="white">{new Date(release_date).getFullYear()}</Text>
        </UnstyledButton>
      </Box>
    </Box>
  );

  const EmbeddedYoutubeVideo = (
    <iframe
      style={{ borderRadius: '10px' }}
      width="100%"
      height="215"
      src={`https://www.youtube.com/embed/${source}`}
    />
  );

  return (
    <Card>
      <Card.Section
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {source ? EmbeddedYoutubeVideo : !hasSearched && ThumbnailCard}
      </Card.Section>
    </Card>
  );
};

async function fetchMovieTrailer(movieId: number) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_THE_MOVIE_DB_API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  const response: MovieVideoResponseInterface = await res.json();
  return response.results;
}
