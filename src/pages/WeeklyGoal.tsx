import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function WeeklyGoal({ route, navigation }) {
  const [goal, setGoal] = useState('');
  const { readingHours } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haftalık okuma hedefiniz kaç sayfa?</Text>
      
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        keyboardType="numeric"
        placeholder="Sayfa sayısı giriniz"
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home', { 
          weeklyGoal: parseInt(goal),
          readingHours: readingHours
        })}
      >
        <Text style={styles.buttonText}>Başla</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});