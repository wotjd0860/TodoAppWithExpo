import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
          Text, 
          View, 
          TouchableOpacity, 
          TouchableHighlight, 
          TouchableWithoutFeedback, 
          Pressable } from 'react-native';
import { theme } from "./colors"

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => console.log("press")}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 44,
    fontWeight: "600",
    color: "white"
  }
});
