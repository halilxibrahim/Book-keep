import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CounterInput from '../components/CounterInput';

const AddBookScreen = ({ navigation }) => {
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

  return (
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
      <CounterInput
        label="Şu Anki Sayfa"
        value={currentPage}
        onValueChange={setCurrentPage}
      />
      <CounterInput
        label="Toplam Sayfa"
        value={totalPages}
        onValueChange={setTotalPages}
      />
      <CounterInput
        label="Okuma Süresi (Saat)"
        value={readingTime}
        onValueChange={setReadingTime}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddBook}
        disabled={!bookTitle || !author || totalPages === 0}
      >
        <Text style={styles.buttonText}>Kitabı Ekle</Text>
      </TouchableOpacity>
    </View>
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
