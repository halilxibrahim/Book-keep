import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Book, Clock, Plus, Camera } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface ReadingDay {
  day: string;
  hasRead: boolean;
}

interface CurrentBook {
  title: string;
  progress: number;
  totalPages: number;
}

const ClockPieChart = ({ hours }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (hours / 24) * circumference;

  return (
    <Svg width={70} height={70}>
      <Circle
        cx={35}
        cy={35}
        r={radius}
        stroke="#E0E0E0"
        strokeWidth={6}
        fill="none"
      />
      <Circle
        cx={35}
        cy={35}
        r={radius}
        stroke="#007AFF"
        strokeWidth={6}
        fill="none"
        strokeDasharray={`${progress} ${circumference}`}
        strokeDashoffset={0}
        transform={`rotate(-90 35 35)`}
      />
      <Clock size={24} color="#666" x={23} y={23} />
    </Svg>
  );
};

const HomeScreen = ({ route, navigation }) => {
  const [currentlyReading, setCurrentlyReading] = useState<CurrentBook[]>([]);
  const [weeklyPages, setWeeklyPages] = useState(100);
  const [readingTime, setReadingTime] = useState(4);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(200);
  const [readingHours, setReadingHours] = useState(0);

  const weekDays: ReadingDay[] = [
    { day: 'Pzt', hasRead: true },
    { day: 'Sal', hasRead: true },
    { day: 'Çar', hasRead: false },
    { day: 'Per', hasRead: true },
    { day: 'Cum', hasRead: false },
    { day: 'Cmt', hasRead: false },
    { day: 'Paz', hasRead: true },
  ];

  useEffect(() => {
    if (route.params?.newBook) {
      const { title, progress, totalPages, readingTime } = route.params.newBook;
      setCurrentlyReading(prev => [...prev, { title, progress, totalPages }]);
      setWeeklyPages(prev => prev + progress);
      setReadingTime(prev => prev + readingTime);

      // Clear the params to prevent duplicate updates
      navigation.setParams({ newBook: null });
    }
  }, [route.params?.newBook]);

  useEffect(() => {
    if (route.params?.weeklyGoal) {
      setWeeklyGoal(route.params.weeklyGoal);
      setReadingHours(route.params.readingHours);
    }
  }, [route.params]);

  const handleAddBook = () => {
    navigation.navigate('AddBook');
  };

  const totalReadPages = currentlyReading.reduce((sum, book) => sum + book.progress, 0);
  const goalProgress = (totalReadPages / weeklyGoal) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Durum Çubuğu Ayarı */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#007AFF"
      />
      <ScrollView style={styles.container}>
        {/* Haftalık Okuma Durumu */}
        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Book size={24} color={day.hasRead ? '#FF4444' : '#CCCCCC'} />
              <Text style={styles.dayText}>{day.day}</Text>
            </View>
          ))}
        </View>

        {/* Okuma İstatistikleri */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Bu Hafta</Text>
              <Text style={styles.statValue}>{weeklyPages} Sayfa</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statTitle}>Okuma Süresi</Text>
              <View style={styles.timeContainer}>
                <ClockPieChart hours={readingTime} />
                <Text style={styles.timeText}>{readingTime}s</Text>
              </View>
            </View>
          </View>
          <View style={[styles.statBox, styles.bottomStatBox]}>
            <Text style={styles.statTitle}>Haftalık Hedef</Text>
            <Text style={styles.statValue}>{weeklyGoal} Sayfa</Text>
            <View style={styles.goalProgressContainer}>
              <View style={[styles.goalProgressBar, { width: `${Math.min(goalProgress, 100)}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {totalReadPages} / {weeklyGoal} sayfa
            </Text>
          </View>
        </View>

        {/* Butonlar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddBook}>
            <Plus size={20} color="#FFF" />
            <Text style={styles.buttonText}>Kitap Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Camera size={20} color="#FFF" />
            <Text style={styles.buttonText}>Kitap Tara</Text>
          </TouchableOpacity>
        </View>

        {/* Şu An Okunan */}
        <View style={styles.currentlyReadingContainer}>
          <Text style={styles.sectionTitle}>Şu An Okuduğum</Text>
          {currentlyReading.map((book, index) => (
            <View key={index} style={[styles.bookCard, { marginBottom: 12 }]}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${(book.progress / book.totalPages) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {book.progress} / {book.totalPages} sayfa
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666666',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  statBox: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    aspectRatio: 1,
    justifyContent: 'space-between',
  },
  topStatBox: {
    flex: 0.5, // Add this to make top boxes smaller
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bottomStatBox: {
    marginTop: 8,
    height: 100,
    aspectRatio: 3.5, // Changed from undefined to 2 to make it wider
    flex: 1, // Make sure it takes full width
    marginHorizontal: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2, // Reduced margin
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  currentlyReadingContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  bookCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    borderRadius: 2,
    color: '#333333',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11, // Slightly smaller font
    color: '#666666',
    marginTop: 2, // Add small top margin
  },
  goalProgressContainer: {
    height: 3, // Reduced height
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 4, // Reduced margin
    marginBottom: 2, // Reduced margin
  },
  goalProgressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
});

export default HomeScreen;