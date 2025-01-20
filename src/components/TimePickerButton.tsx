import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TimePickerButtonProps {
  value: number;
  onPress: () => void;
}

const TimePickerButton = ({ value, onPress }: TimePickerButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="time-outline" size={24} color="#007AFF" />
      <Text style={styles.text}>{value} Saat</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333333',
  },
});

export default TimePickerButton;
