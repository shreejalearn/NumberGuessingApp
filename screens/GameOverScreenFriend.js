import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import Title from '../components/ui/Title.ios';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

function GameOverScreenFriend({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/sucess.jpg')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your friend needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreenFriend;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%'
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'white',
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'real-open-sans',
    color: '#B73E3E',
  },
});
