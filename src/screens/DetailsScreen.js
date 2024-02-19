import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { fetchMovieDetails } from "../services/api";

const DetailsScreen = ({ route }) => {
  const { imdbID, navigateTo } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState(null); // New state for handling errors

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(imdbID);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching details:", error.message);
        setError("Error fetching details. Please try again."); // Set error state
      } finally {
        setLoading(false); // Set loading to false once details are fetched or if there's an error
      }
    };

    fetchDetails();
  }, [imdbID]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />; // Show loading indicator
  }

  if (error) {
    return <Text>{error}</Text>; // Show error message if there's an error
  }

  const { Title, Poster, Year, Plot, Director, imdbRating } = movieDetails;

  const starIcon =
    imdbRating >= 5
      ? require("../assets/icons8-star-96.png")
      : require("../assets/icons8-star-96_2.png");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo("Home")}>
          <Image
            source={require("../assets/icons8-back-100.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{Title}</Text>
      </View>

      <Image source={{ uri: Poster }} style={styles.poster} />

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.subtitle}>Year: {Year}</Text>
          <Text style={styles.subtitle}>Director: {Director}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subtitle}>
            Rating: {imdbRating}{" "}
            <Image source={starIcon} style={styles.ratingIcon} />
          </Text>
        </View>
        <Text style={styles.title}>Plot:</Text>
        <View style={styles.plotContainer}>
          <Text style={styles.plotText}>{Plot}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    flex: 1,
  },
  backArrow: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  poster: {
    width: 350,
    height: 450,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "stretch",
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  ratingIcon: {
    top: 0,
    width: 25,
    height: 25,
    resizeMode: "center",
  },
  plotContainer: {
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    padding: 10,
    marginTop: 0,
  },
  plotText: {
    fontSize: 16,
  },
});

export default DetailsScreen;
