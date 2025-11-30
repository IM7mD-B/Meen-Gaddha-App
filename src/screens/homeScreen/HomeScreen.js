import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const username = route.params?.username || 'Guest';

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {username} 👋</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>ِAuth</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    color: '#E0E1DD',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E6091',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop:10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
