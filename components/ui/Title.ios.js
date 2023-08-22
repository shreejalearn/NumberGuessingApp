import { Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/colors';


function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    padding: 12,
    maxWidth: '80%',
    width: 300,
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300,
    textShadowColor: Colors.accent600,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,  
  },
});
