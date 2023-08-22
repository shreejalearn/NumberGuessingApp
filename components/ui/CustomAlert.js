import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const CustomAlert = ({ visible, onDismiss }) => {
  if (!visible) return null;

  return (
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>Invalid number</Text>
      <Text style={styles.alertMessage}>
        Number has to be between 1 and 99.
      </Text>
      <TouchableOpacity style={styles.alertButton} onPress={onDismiss}>
        <Text style={{ color: 'white', fontSize: 18 }}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.accent600,
    alignItems: 'center',
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 16,
  },
  alertButton: {
    backgroundColor: '#A75D5D', // Change the button's background color as desired
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CustomAlert;
