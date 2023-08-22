import React from 'react';
import { View, StyleSheet } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

const PreGameScreen = ({ onPlayWithComputer, onPlayWithFriend }) => {
  return (
    <View style={styles.container}>
    <View style={styles.TextContainer}>
    <Title>Play a Game</Title>
    </View>
    <View >
      <View style={styles.buttonContainer}>
      <PrimaryButton onPress={onPlayWithComputer}>Play with the Computer</PrimaryButton>
      </View>
      <PrimaryButton onPress={onPlayWithFriend}>Play with a Friend</PrimaryButton>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: "3%",
    marginTop: "25%"
  },
  TextContainer: {
  }
});


export default PreGameScreen;