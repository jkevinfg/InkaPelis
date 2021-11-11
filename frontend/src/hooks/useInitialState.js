import { useState, useEffect } from 'react';

const useInitialState = (API) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  return movies;
};

export default useInitialState;

