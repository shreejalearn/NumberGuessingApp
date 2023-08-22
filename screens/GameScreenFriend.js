import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import GuessLogItem from '../components/game/GuessLogFriend';

export default function GameScreenFriend({ userNumber, onGameOver }) {
  const [currentGuess, setCurrentGuess] = useState(''); // Initialize currentGuess
  const [guessRounds, setGuessRounds] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (parseInt(currentGuess) === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    const parsedGuess = parseInt(currentGuess);
    const isDuplicate = duplicatechecker(parsedGuess);

    if (isDuplicate) {
      // Display the popup when the guess is repeated
      Alert.alert(
        'Already Guessed!',
        'You have already guessed this number. Please enter a new guess.',
        [{ text: 'Okay', style: 'cancel' }]
      );
      setCurrentGuess('');
      return;
    }

    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      Alert.alert('Invalid guess!', 'Enter a number between 1 and 100', [
        { text: 'Okay', style: 'cancel' },
      ]);
      setCurrentGuess('');
      return;
    }

    if (
      (direction === 'lower' && parsedGuess < userNumber) ||
      (direction === 'greater' && parsedGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'Your guess does not match the direction.', [
        { text: 'Okay', style: 'cancel' },
      ]);
      return;
    }

    setGuessRounds((prevGuessRounds) => [
      `${parsedGuess} (${direction})`,
      ...prevGuessRounds,
    ]);
    setCurrentGuess('');
  }

  function duplicatechecker(parsedGuess) {
    // Check if the parsedGuess is already in the guessRounds array
    return guessRounds.includes(`${parsedGuess} (greater)`); // or "${parsedGuess} (lower)" depending on your implementation
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          keyboardType="number-pad"
          onChangeText={(text) => setCurrentGuess(text)}
          value={currentGuess}
          maxLength={2}
        />
      </View>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.numberInput}
            keyboardType="number-pad"
            onChangeText={(text) => setCurrentGuess(text)}
            value={currentGuess}
          />
        </View>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.screen}>
          <Title>Opponent's Guess</Title>
          {content}
          <View style={styles.listContainer}>
            <FlatList
              data={guessRounds}
              renderItem={(itemData) => (
                <GuessLogItem
                  roundNumber={guessRoundsListLength - itemData.index}
                  guess={itemData.item.toString()}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    marginTop: '30%',
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
});
