import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/colors';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: 'white',
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 25 : 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: 'white',
    fontSize: deviceWidth < 380 ? 28 : 36,
    // fontWeight: 'bold',
    fontFamily: 'real-open-sans'
  },
});
