import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const MovieItem = ({ movie, onPress }) => {
  const { Title, Year, Poster } = movie;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {Title}
        </Text>
        <Text style={styles.year}>{Year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  poster: {
    width: 150,
    height: 215,
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    width: 200,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  year: {
    fontSize: 14,
    color: '#888',
    textAlign: 'left',
  },
});

export default MovieItem;
