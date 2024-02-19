import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchMovies } from '../services/api';
import MovieItem from './MovieItem';

const MovieList = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies using the API
    fetchMovies('').then((data) => setMovies(data.Search || []));
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('Details', movie);
  };

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <MovieItem movie={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MovieList;
