import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { fetchMovies } from "../services/api";
import MovieItem from "../components/MovieItem";
import SearchBar from "../components/SearchBar";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchYear, setSearchYear] = useState("");
  const [initialSearch, setInitialSearch] = useState(true);
  const [resetPressed, setResetPressed] = useState(false);
  const [error, setError] = useState(null); // New state for handling errors

  const fetchMoviesData = async (newSearchTerm, newPage, newYear) => {
    try {
      setIsLoading(true);

      const data = await fetchMovies(newSearchTerm, newPage, newYear);

      if (newPage === 1) {
        setMovies(data.Search || []);
      } else {
        const uniqueMovies = data.Search.filter(
          (newMovie) =>
            !movies.some((movie) => movie.imdbID === newMovie.imdbID)
        );

        setMovies((prevMovies) => [...prevMovies, ...uniqueMovies]);
      }

      setHasMoreMovies(data.Search && data.Search.length > 0);
      setResetPressed(false);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Error fetching movies. Please try again."); // Set error state
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreMovies = () => {
    if (hasMoreMovies && !isLoading) {
      fetchMoviesData(searchTerm, page + 1, searchYear);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate("Details", { imdbID: movie.imdbID, navigation });
  };

  const handleSearch = async (newSearchTerm, newYear) => {
    setPage(1);
    fetchMoviesData(newSearchTerm, 1, newYear);
    setSearchTerm(newSearchTerm);
    setSearchYear(newYear);
    setInitialSearch(false); // Set initialSearch to false when a new search is performed
  };

  const handleReset = () => {
    setMovies([]);
    setInitialSearch(true);
    setResetPressed(true);
  };

  useEffect(() => {
    setPage(1);
    fetchMoviesData("John Wick", 1, searchYear);
  }, [searchYear, resetPressed]);

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Text style={styles.header}>Movies</Text>
      </View>
      <View style={styles.fixedSearchBar}>
        <SearchBar onSearch={handleSearch} onReset={handleReset} />
      </View>
      <View style={styles.movieListContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6698FF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {initialSearch && movies.length === 0 && !resetPressed && (
          <Text style={styles.noResultsText}>No results found.</Text>
        )}
        {movies.length > 0 && (
          <FlatList
            data={movies}
            keyExtractor={(item, index) => item.imdbID + index}
            numColumns={2}
            renderItem={({ item }) => (
              <MovieItem onPress={() => handleMoviePress(item)} movie={item} />
            )}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              hasMoreMovies &&
              movies.length >= 6 && (
                <View style={styles.loadMoreContainer}>
                  <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={fetchMoreMovies}
                  >
                    <Text style={styles.loadMoreText}>Load More</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          />
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 25,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 14,
  },
  fixedSearchBar: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  movieListContainer: {
    marginTop: 100,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
  },
  loadMoreContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  loadMoreButton: {
    backgroundColor: "#6698FF",
    padding: 10,
    borderRadius: 15,
  },
});

export default HomeScreen;
