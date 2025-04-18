import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  WeeklyGoal: undefined;
};

type BookTypesProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function BookTypes({ navigation }: BookTypesProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const bookTypes = [
    'Roman', 'Bilim Kurgu', 'Fantastik', 'Tarih',
    'Bilim', 'Felsefe', 'Kişisel Gelişim', 'Biyografi'
  ];

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Hangi tür kitapları okumayı seviyorsunuz?</Text>
        
        <ScrollView style={styles.typeContainer}>
          {bookTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedTypes.includes(type) && styles.selectedType
              ]}
              onPress={() => toggleType(type)}
            >
              <Text style={styles.typeText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('WeeklyGoal')}
        >
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  typeContainer: {
    flex: 1,
    marginBottom: 20,
  },
  typeButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  selectedType: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  typeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});