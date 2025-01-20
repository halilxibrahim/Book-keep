import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './src/pages/Onboarding';
import ReadingHours from './src/pages/ReadingHours';
import BookTypes from './src/pages/BookTypes';
import WeeklyGoal from './src/pages/WeeklyGoal';
import HomeScreen from './src/pages/Home';
import AddBookScreen from './src/pages/AddBook';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="ReadingHours" component={ReadingHours} options={{ headerShown: false }} />
        <Stack.Screen name="BookTypes" component={BookTypes} options={{ headerShown: false }} />
        <Stack.Screen name="WeeklyGoal" component={WeeklyGoal} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa', headerShown: false }} />
        <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: 'Kitap Ekle', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}