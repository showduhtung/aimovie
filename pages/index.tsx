import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Space,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { NavigationSidebar, ColorSchemeToggle } from '../components';
import { createStyles } from '@mantine/core';
import { IconChevronRight, IconPlayerPlay } from '@tabler/icons';
import { useState } from 'react';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export default function HomePage({
  popularMovies,
  topRatadMovies,
}: {
  popularMovies: MovieResponse;
  topRatadMovies: MovieResponse;
}) {
  console.log({ topRatadMovies });
  return (
    <>
      <AppShell
        padding="md"
        navbar={<NavigationSidebar />}
        styles={({ colorScheme, colors }) => ({
          main: { backgroundColor: colorScheme === 'dark' ? colors.dark[8] : colors.gray[0] },
        })}
      >
        <Flex justify="space-between">
          <Title order={3}>Popular Movies</Title>
          <Button variant="subtle" sx={{ paddingLeft: '12px', paddingRight: '4px' }}>
            <Text mr="sm">See All</Text>
            <IconChevronRight size={20} />
          </Button>
        </Flex>
        <Space h="md" />
        <MovieCarousel data={popularMovies.results} />

        <Space h="xl" />
        <Space h="xl" />

        <Flex justify="space-between">
          <Title order={3}>Top Rated Movies</Title>
          <Button variant="subtle" sx={{ paddingLeft: '12px', paddingRight: '4px' }}>
            <Text mr="sm">See All</Text>
            <IconChevronRight size={20} />
          </Button>
        </Flex>
        <Space h="md" />
        <MovieCarousel data={topRatadMovies.results} />
      </AppShell>
    </>
  );
}

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

const MovieCarousel = ({ data }: { data: Movie[] }) => {
  return (
    <>
      <Carousel
        mx="auto"
        align="start"
        slideGap="md"
        draggable
        slideSize="33%"
        withIndicators
        styles={{
          control: { '&[data-inactive]': { opacity: 0, cursor: 'default' } },
          indicator: { width: 8, height: 4, transition: 'width 250ms ease' },
        }}
      >
        {data.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <MovieCard movie={movie} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { backdrop_path, id, title, release_date } = movie ?? {};

  return (
    <Card>
      <Card.Section
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
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
              <ActionIcon component="button" variant="filled" onClick={() => console.log('hi')}>
                <IconPlayerPlay color="white" />
              </ActionIcon>
            </Box>
          )}
          {/* <iframe
          style={{ borderRadius: '10px' }}
          width="400"
          height="280"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
      /> */}
          <Box style={{ position: 'absolute', bottom: '0px', padding: '8px' }}>
            <UnstyledButton>
              <Text color="white">{title}</Text>
              <Text color="white">{new Date(release_date).getFullYear()}</Text>
            </UnstyledButton>
          </Box>
        </Box>
      </Card.Section>
    </Card>
  );
};

export async function getStaticProps() {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`;
  const popularRes = await fetch(popularUrl);
  const topRatedRes = await fetch(topRatedUrl);

  const popularResponse: MovieResponse = await popularRes.json();
  const topRatedResponse: MovieResponse = await topRatedRes.json();
  console.log({ topRatedResponse });
  return { props: { popularMovies: popularResponse, topRatadMovies: topRatedResponse } };
}
