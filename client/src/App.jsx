import React from 'react';
import { MantineProvider, Container, Title } from '@mantine/core';
import JokeDisplay from './components/JokeDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Container size="sm" py="xl">
          <Title align="center" mb="xl">Daily Jokes</Title>
          <JokeDisplay />
        </Container>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
