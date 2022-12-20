import { Group, Input, Pagination, Stack } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { Movie } from 'types';
import { MovieCard } from 'domains/movie';
import { useEffect } from 'react';

interface MoviePagesProps {
  movies: Movie[];
  page: number;
  onChange: (arg: number) => void;
  total: number;
}

export const MoviePages = ({ movies, ...paginationProps }: MoviePagesProps) => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });

  useEffect(() => {
    scrollIntoView({ alignment: 'start' });
  }, [paginationProps.page, scrollIntoView]);

  return (
    <Stack spacing="xl" ref={targetRef}>
      <Input icon={<IconSearch size={16} />} placeholder="Search Movies" />
      <Group>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Group>
      <Pagination siblings={2} initialPage={1} {...paginationProps} />
    </Stack>
  );
};
