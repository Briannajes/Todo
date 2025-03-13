import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { Input } from 'react-native-elements';


const App = () =>{
  const [tasks, setTasks] = useState([
    {key: '1', description: 'Morning Dog Walk', completed: true},
    {key: '2', description: 'Film video', completed: true},
    {key: '3', description: 'Meal Prep', completed: false},
    {key: '4', description: 'Weekly School Work', completed: false},
    {key: '5', description: 'Post on Instagram', completed: true},
  ]);
  const [newTask, setNewTask] = useState('');
  const addTask =() => {
    if (newTask.trim()) {
      const newTaskObj = {
      key: (tasks.length +1).toString(),
      description: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  }
};
const toggleCompletion = (taskKey)=> {
  const updatedTasks = tasks.map((task) =>
    task.key === taskKey ? {...task, completed: !task.completed }
     : task
  );
  setTasks(updatedTasks);
};
const renderItem = ({ item }) => {
  return (
    <View style={styles.taskItem}>
      <CheckBox
      value={item.completed}
      onValueChange={() => toggleCompletion(item.key)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.description}
      </Text>
    </View>
  );
};
return (
  <SafeAreaView style={styles.container}>
    <FlatList
    data={tasks}
    renderItem={renderItem}
    keyExtractor={(item) => item.key}
    />
    <View style={styles.inputContainer}>
      <Input
      placeholder="Enter new task"
      value={newTask}
      onChangeText={setNewTask}
      containerStyle={styles.input}
      />
      <Button title="Add" onPress={addTask} />
    </View>
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor:'#F7F7F7',
    paddingHorizontal: 20,
  },
  taskItem:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor:'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 9,
    shadowColor:'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.1,
  },
  checkbox: {
    marginRight: 15,
  },
  taskText: {
    fontsize: 16,
    color: '#333',
    flex: 1,
  },
  completedText :{
    textDecorationLine: 'line-through',
    textDecorationStyle:'solid',
    color: '#A9A9A9',
  },
  inputContainer: {
    flexDirection: 'row',
alignItems: 'center',
marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    marginRight: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  inputText: {
    fontSize: 16,
    paddingLeft: 15,
  },
});


export default App;