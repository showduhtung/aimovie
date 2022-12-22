import { Box, Card, Text, UnstyledButton } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Movie } from 'types';
import { useRouter } from 'next/navigation';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const { hovered, ref } = useHover();
  const router = useRouter();

  function handleClick(_: any) {
    router.push(`/movies/${movie.id}`);
  }
  return (
    <Card>
      <Card.Section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          style={{ height: 300, width: 200, cursor: 'pointer' }}
          loading="lazy"
          onClick={handleClick}
        />
      </Card.Section>
      <Box mt="md" w="150px" h="80px">
        <UnstyledButton onClick={handleClick}>
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
  // TODO: search orange coming out undefined
  const date = new Date(str).toDateString();
  const [_, month, numDate, year] = date.split(' ');
  return `${month} ${numDate}, ${year}`;
}
