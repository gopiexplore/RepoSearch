import React, { useContext, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const HomeSearch = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [reponame, setRepoName] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (text) => {
    setRepoName(text);
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${text}`);
      if (response.data.items.length === 0) {
        setErrorMessage('No results found.');
      }
      setResult(response.data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      if (error.response && error.response.status === 403) {
        setErrorMessage('Error: API rate limit exceeded. Please try again later.');
      } else {
        setErrorMessage('Error fetching repositories. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.repoCard, isDarkMode && styles.darkRepoCard]}
      onPress={() => navigation.navigate('RepositoryDetails', { repo: item })}
    >
      <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
      <View style={styles.repoInfo}>
        <Text style={[styles.repoName, isDarkMode && styles.darkText]}>{item.name}</Text>
        <Text style={[styles.repoDescription, isDarkMode && styles.darkText]}>{item.description || 'No description available.'}</Text>
        <Text style={[styles.repoStats, isDarkMode && styles.darkText]}>
          ⭐ {item.stargazers_count} | 🍴 {item.forks_count} | 🛠 {item.language || 'N/A'}
        </Text>
        <Text style={[styles.repoOwner, isDarkMode && styles.darkText]}>By: {item.owner.login}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TextInput
        placeholder="Search repositories..."
        placeholderTextColor={isDarkMode ? '#bbb' : '#009080'}
        style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
        value={reponame}
        onChangeText={handleSearch}
      />
      {loading ? (
        <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>Loading...</Text>
      ) : errorMessage ? (
        <Text style={[styles.errorText, isDarkMode && styles.darkText]}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={result}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[styles.noResultsText, isDarkMode && styles.darkText]}>No results found.</Text>
          }
        />
      )}
    </View>
  );
};

export default HomeSearch;

// The styles remain the same except for the removed themeButton-related styles.


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#009080',
    margin: 10,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    color: '#000',
  },
  darkSearchInput: {
    borderColor: '#666',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeButton: {
    padding: 10,
    margin: 10,
  },
  themeButtonText: {
    fontSize: 16,
    color: '#009080',
  },
  darkThemeButtonText: {
    color: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  darkText: {
    color: '#fff',
  },
  repoCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkRepoCard: {
    borderBottomColor: '#444',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  repoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  repoDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  repoStats: {
    fontSize: 12,
    color: '#888',
  },
  repoOwner: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});
