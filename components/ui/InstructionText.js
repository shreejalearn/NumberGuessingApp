import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

function InstructionText({ children, style }) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'real-open-sans',
    color: Colors.accent500,
    fontSize: 31,
    textShadowColor: Colors.accent600,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,  
  },
});
