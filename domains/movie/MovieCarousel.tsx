import { Carousel } from '@mantine/carousel';
import { Movie } from 'types';
import { MovieThumbnail } from './MovieThumbnail';

export const MovieCarousel = ({ data }: { data: Movie[] }) => {
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
          control: {
            '&[data-inactive]': { opacity: 0, cursor: 'default' },
          },
          indicator: { width: 8, height: 4, transition: 'width 250ms ease' },
        }}
      >
        {data.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <MovieThumbnail movie={movie} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};
