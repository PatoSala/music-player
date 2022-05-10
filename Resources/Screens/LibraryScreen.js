import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function LibraryScreen() {
    return (
        <View style={styles.container}>
            <Text>Library Screen</Text>
            <StatusBar style="auto" />
        </View>
    )
}

export default LibraryScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });