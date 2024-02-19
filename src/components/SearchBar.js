import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm, searchYear);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSearchYear('');
    onReset();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={searchYear}
        onChangeText={(text) => setSearchYear(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} />
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
  },
  resetButton: {
    marginLeft: 10,
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SearchBar;
