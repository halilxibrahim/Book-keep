import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Yeni Kitap</Text>
            <Text style={styles.headerSubtitle}>Kütüphanenize yeni bir kitap ekleyin</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Kitap İsmi</Text>
              <TextInput
                style={styles.input}
                placeholder="Kitabın adını girin"
                value={bookTitle}
                onChangeText={setBookTitle}
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Yazar</Text>
              <TextInput
                style={styles.input}
                placeholder="Yazarın adını girin"
                value={author}
                onChangeText={setAuthor}
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Şu Anki Sayfa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={currentPage ? currentPage.toString() : ''}
                  onChangeText={(text) => setCurrentPage(parseInt(text) || 0)}
                  keyboardType="numeric"
                  placeholderTextColor="#A0A0A0"
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Toplam Sayfa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={totalPages ? totalPages.toString() : ''}
                  onChangeText={(text) => setTotalPages(parseInt(text) || 0)}
                  keyboardType="numeric"
                  placeholderTextColor="#A0A0A0"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Okuma Süresi</Text>
              <TimePickerButton
                value={readingTime}
                onPress={handleTimePress}
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.addButton,
                (!bookTitle || !author || totalPages === 0) && styles.disabledButton
              ]} 
              onPress={handleAddBook}
              disabled={!bookTitle || !author || totalPages === 0}
            >
              <Text style={styles.buttonText}>Kitabı Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddBookScreen;
