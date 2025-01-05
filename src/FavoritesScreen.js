import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from './FavoritesContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.repoCard}
      onPress={() => navigation.navigate('RepositoryDetails', { repo: item })}
    >
      <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
      <View style={styles.repoInfo}>
        <Text style={styles.repoName}>{item.name}</Text>
        <Text style={styles.repoDescription}>{item.description || 'No description available.'}</Text>
        <Text style={styles.repoStats}>
          ⭐ {item.stargazers_count} | 🍴 {item.forks_count} | 🛠 {item.language || 'N/A'}
        </Text>
        <Text style={styles.repoOwner}>By: {item.owner.login}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  repoCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  noFavoritesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
