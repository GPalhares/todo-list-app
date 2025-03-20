import { useState } from 'react';

export const useJoke = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://official-joke-api.appspot.com/random_joke'
      );
      if (!response.ok) {
        throw new Error('Erro ao carregar piada');
      }
      const data = await response.json();
      setJoke(data.setup + ' ' + data.punchline);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { joke, loading, error, fetchJoke };
};
