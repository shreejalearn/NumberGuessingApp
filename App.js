import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import PreGameScreen from './screens/PreGameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameScreenFriend from './screens/GameScreenFriend';
import GameOverScreen from './screens/GameOverScreen';
import GameOverScreenFriend from './screens/GameOverScreenFriend';
import Colors from './constants/colors';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('preGame');
  const [playingWithComputer, setPlayingWithComputer] = useState(true);
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/CabinSketch-Bold.ttf'),
    'open-sans-bold': require('./assets/fonts/CabinSketch-Bold.ttf'),
    'real-open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    if (currentScreen === 'gameOver' && guessRounds > 0) {
      console.log(guessRounds);
      console.log(userNumber);
    }
  }, [currentScreen, guessRounds]);


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let screen;

  switch (currentScreen) {
    case 'preGame':
      screen = (
        <PreGameScreen
          onStartGame={() => setCurrentScreen('startGame')}
          onPlayWithComputer={() => {
            setPlayingWithComputer(true);
            setCurrentScreen('startGame');
          }}
          onPlayWithFriend={() => {
            setPlayingWithComputer(false);
            setCurrentScreen('startGame');
          }}
        />
      );
      break;
    case 'startGame':
      screen = (
        <StartGameScreen
          onPickNumber={(pickedNumber) => {
            setUserNumber(pickedNumber);
            setCurrentScreen(playingWithComputer ? 'gameComputer' : 'gameFriend');
          }}
        />
      );
      break;
      case 'gameComputer':
        screen = (
          <GameScreen
            userNumber={userNumber}
            onGameOver={(numberOfRounds) => {
              setGuessRounds(numberOfRounds);
              setCurrentScreen('gameOver', numberOfRounds);
            }}
          />

        );        
        break;
      case 'gameFriend':
      screen = (
        <GameScreenFriend
          userNumber={userNumber}
          onGameOver={(numberOfRounds) => {
            setGuessRounds(numberOfRounds);
            setCurrentScreen('gameOverFriend', numberOfRounds);
          }}
        />
      );
      break;
    case 'gameOver':

      screen = (

        <GameOverScreen
          userNumber={userNumber}
          roundsNumber={guessRounds}
          onStartNewGame={() => setCurrentScreen('preGame')}
        />
      );
      break;
    case 'gameOverFriend':
      screen = (
        <GameOverScreenFriend
          userNumber={userNumber}
          roundsNumber={guessRounds}
          onStartNewGame={() => setCurrentScreen('preGame')}
        />
      );
      break;
    default:
      screen = <PreGameScreen />;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary500, Colors.primary600]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
