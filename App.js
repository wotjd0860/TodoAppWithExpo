import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
          Text, 
          View, 
          TouchableOpacity, 
          TextInput,
          ScrollView,
          Alert
        } from 'react-native';
import { theme } from "./colors"
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => {
    setWorking(false);
  }
  const work = () => {
    setWorking(true);
  }
  const onChangeText = (payload) => {
    setText(payload);
  }
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  }
  
  const addToDo = async () => {
    if(text === "") {
      return;
    }
    // const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, work: working}});
    const newToDos = {...toDos, [Date.now()]: {text, working}};
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }
  const deleteTodo = async (key) => {
    Alert.alert(
      "Delete To Do?", 
      "Are you sure?", 
      [
        {text: "Cancel"},
        {text: "I'm sure", 
          onPress: async () => {
            const newToDos = {...toDos};
            delete newToDos[key];
            setToDos(newToDos);
            await saveToDos(newToDos);
        }},
      ]
    );
    return;
    
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput 
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType='done'
        style={styles.input} 
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"} 
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => (
          toDos[key].working === working 
          ?
          (
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(key)}>
              <FontAwesome name="trash" size={18} color={theme.grey} />
            </TouchableOpacity>
          </View>
          ) : null
          ))
        }
      </ScrollView>
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
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500"
  }
});
