import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TimePickerButton from '../components/TimePickerButton';

const AddBookScreen = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const handleAddBook = () => {
    const newBook = {
      title: bookTitle,
      author: author,
      progress: currentPage,
      totalPages: totalPages,
      readingTime: readingTime
    };
    navigation.navigate('Home', { newBook });
  };

  const handleTimePress = () => {
    setReadingTime((prev) => (prev + 1) % 25); // Cycles through 0-24 hours
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Yeni Kitap Ekle</Text>
        <TextInput
          style={styles.input}
          placeholder="Kitap İsmi"
          value={bookTitle}
          onChangeText={setBookTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Yazar"
          value={author}
          onChangeText={setAuthor}
        />
        <TextInput
          style={styles.input}
          placeholder="Şu Anki Sayfa"
          value={currentPage ? currentPage.toString() : ''}
          onChangeText={(text) => setCurrentPage(parseInt(text) || 0)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Toplam Sayfa"
          value={totalPages ? totalPages.toString() : ''}
          onChangeText={(text) => setTotalPages(parseInt(text) || 0)}
          keyboardType="numeric"
        />
        <TimePickerButton
          value={readingTime}
          onPress={handleTimePress}
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddBook}
          disabled={!bookTitle || !author || totalPages === 0}
        >
          <Text style={styles.buttonText}>Kitabı Ekle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddBookScreen;
