import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSearch from './src/HomeSearch';
import RepositoryDetails from './src/RepositoryDetails';
import { FavoritesProvider } from './src/FavoritesContext';
import FavoritesScreen from './src/FavoritesScreen';
import { ThemeProvider, ThemeContext } from './src/ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeSearch"
              component={HomeSearch}
              options={({ navigation }) => {
                const { isDarkMode, toggleTheme } = useContext(ThemeContext);
                return {
                  title: 'Search GitHub Repos',
                  headerRight: () => (
                    <>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Favorites')}
                        style={{ marginRight: 10 }}
                      >
                        <Text style={{ color: '#009080', fontSize: 16 }}>See Favorites</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={toggleTheme}
                        style={{ marginRight: 10 }}
                      >
                        <Text style={{ color: isDarkMode ? '#009080' : '#009080', fontSize: 16 }}>
                          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ),
                };
              }}
            />
            <Stack.Screen name="RepositoryDetails" component={RepositoryDetails} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
