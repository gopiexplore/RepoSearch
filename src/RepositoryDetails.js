import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useFavorites } from './FavoritesContext';

const RepositoryDetails = ({ route }) => {
  const { repo } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favoriteStatus = isFavorite(repo);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo.name}</Text>
      <Text>{repo.description || 'No description available.'}</Text>
      <Text>⭐ Stars: {repo.stargazers_count}</Text>
      <Text>🍴 Forks: {repo.forks_count}</Text>
      <Text>🛠 Language: {repo.language || 'N/A'}</Text>
      <Text>By: {repo.owner.login}</Text>
      <Button
        title={favoriteStatus ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={() => (favoriteStatus ? removeFavorite(repo) : addFavorite(repo))}
        color={favoriteStatus ? 'red' : 'blue'}
      />
    </View>
  );
};

export default RepositoryDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
