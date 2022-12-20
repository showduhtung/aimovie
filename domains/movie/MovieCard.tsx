import { Box, Card, Image, Text, UnstyledButton } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Movie } from 'types';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const { hovered, ref } = useHover();
  return (
    <Card>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt=""
          height="300px"
          width="200px"
        />
      </Card.Section>
      <Box mt="md" w="150px" h="80px">
        <UnstyledButton>
          <Text
            sx={(theme) => ({ fontSize: '14px', color: hovered ? theme.colors.blue[4] : '' })}
            weight={500}
            ref={ref}
          >
            {movie.title}
            {/* TODO: text ellipses for long titles*/}
          </Text>
        </UnstyledButton>
        <Text style={{ fontSize: '12px' }} weight={200}>
          {readableDate(movie.release_date)}
        </Text>
      </Box>
    </Card>
  );
};

function readableDate(str: string) {
  const date = new Date(str).toDateString();
  const [_, month, numDate, year] = date.split(' ');
  return `${month} ${numDate}, ${year}`;
}
