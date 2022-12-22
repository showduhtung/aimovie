import { Flex, Group, Input, Pagination, Stack } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { Movie } from 'types';
import { MovieCard } from 'domains/movie';
import { useEffect } from 'react';

interface MoviePagesProps {
  movies: Movie[];
  page: number;
  onSearch: (arg: string) => void;
  onChange: (arg: number) => void;
  total: number;
}

export const MovieSearchPages = ({ movies, onSearch, ...paginationProps }: MoviePagesProps) => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });

  useEffect(() => {
    scrollIntoView({ alignment: 'start' });
  }, [paginationProps.page, scrollIntoView]);

  return (
    <Stack spacing="xl" ref={targetRef}>
      <Input
        icon={<IconSearch size={16} />}
        placeholder="Search Movies"
        w="90%"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Group>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Group>
      <Flex justify="space-between" w="90%">
        <Input width="30px" />
        <Pagination siblings={2} initialPage={1} {...paginationProps} />
      </Flex>
    </Stack>
  );
};
