import React, { useState } from 'react';
import { Button, Card, Text, Group, Badge } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:5000/api/joke';

export default function JokeDisplay() {
  const queryClient = useQueryClient();
  
  // Fetch a random joke
  const { data: joke, refetch, isLoading } = useQuery({
    queryKey: ['joke'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error fetching joke');
      return res.json();
    },
  });
  
  // Mutation to submit a vote
  const voteMutation = useMutation({
    mutationFn: async (emoji) => {
      const res = await fetch(`${API_URL}/${joke._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji }),
      });
      if (!res.ok) throw new Error('Error submitting vote');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joke'] });
    },
  });

  if (isLoading) return <Text>Loading joke...</Text>;

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 600, margin: 'auto' }}>
      <Text weight={500} size="lg" mb="sm">
        {joke.question}
      </Text>
      <Text size="md" mb="md">
        {joke.answer}
      </Text>
      <Group spacing="sm" mb="md">
        {/* Render emoji buttons */}
        {joke.availableVotes.map((emoji) => (
          <Button
            key={emoji}
            variant="outline"
            onClick={() => voteMutation.mutate(emoji)}
          >
            {emoji} {getVoteCount(joke, emoji)}
          </Button>
        ))}
      </Group>
      <Button fullWidth onClick={() => refetch()}>
        Next Joke
      </Button>
    </Card>
  );
}

// Helper function to get current vote count for an emoji
function getVoteCount(joke, emoji) {
  const voteObj = joke.votes.find((v) => v.label === emoji);
  return voteObj ? voteObj.value : 0;
}
