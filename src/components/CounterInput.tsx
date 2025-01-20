import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface CounterInputProps {
  value: number;
  onValueChange: (value: number) => void;
  label: string;
}

const CounterInput = ({ value, onValueChange, label }: CounterInputProps) => {
  const scaleAnim = new Animated.Value(1);

  const animate = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (increment: boolean) => {
    animate();
    onValueChange(increment ? value + 1 : value - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(false)}
          disabled={value <= 0}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.valueContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Text style={styles.value}>{value}</Text>
        </Animated.View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(true)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  valueContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CounterInput;
