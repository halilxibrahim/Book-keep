import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Onboarding({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Keep</Text>
      
      <TouchableOpacity 
        style={styles.googleButton}
        onPress={() => navigation.navigate('ReadingHours')}
      >
        <Text style={styles.buttonText}>Google ile Giriş Yap</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.navigate('ReadingHours')}
      >
        <Text style={styles.skipButtonText}>Kaydolmadan Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 15,
  },
  skipButton: {
    padding: 15,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  skipButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
});
