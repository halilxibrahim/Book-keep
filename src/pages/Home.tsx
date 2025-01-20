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
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface ReadingDay {
  day: string;
  hasRead: boolean;
}

interface CurrentBook {
  title: string;
  progress: number;
  totalPages: number;
}

const ClockPieChart = ({ hours }: { hours: number }) => {
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

const SwipeableRow = ({ children, onDelete }: { children: React.ReactNode, onDelete: () => void }) => {
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#FF4444',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          height: '100%',
        }}
        onPress={onDelete}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Sil</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
      {children}
    </Swipeable>
  );
};

const HomeScreen = ({ route, navigation }: { route: any, navigation: any }) => {
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

  const handleDeleteBook = (index: number) => {
    setCurrentlyReading(prev => {
      const newBooks = [...prev];
      const deletedBook = newBooks[index];
      setWeeklyPages(prev => prev - deletedBook.progress);
      newBooks.splice(index, 1);
      return newBooks;
    });
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
      <GestureHandlerRootView style={{ flex: 1 }}>
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
              <SwipeableRow key={index} onDelete={() => handleDeleteBook(index)}>
                <View style={[styles.bookCard, { marginBottom: 12 }]}>
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
              </SwipeableRow>
            ))}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#4A4A4A',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 28,
    paddingHorizontal: 6,
  },
  currentlyReadingContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
  },
  dayText: {
    marginTop: 6,
    fontSize: 13,
    color: '#4A4A4A',
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bottomStatBox: {
    marginTop: 12,
    height: 120,
    padding: 20,
  },
  statTitle: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 8,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    backgroundColor: '#4A4AFF',
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4A4AFF',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2D3436',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A4AFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  goalProgressContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  goalProgressBar: {
    height: '100%',
    backgroundColor: '#4A4AFF',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3436',
    marginTop: 8,
  },
});

export default HomeScreen;