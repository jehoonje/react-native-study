// src/AppContent.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodoAsync } from './redux/todoSlice';
import TodoItem from './components/TodoItem';

const AppContent = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleAddTodo = () => {
    if (newTask.trim() === '') {
      Alert.alert('Validation', 'Please enter a valid task');
      return;
    }
    const newTodo = {
      task: newTask,
    };
    dispatch(addTodoAsync(newTodo));
    setNewTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DREAM BIG, START SMALL, ACT NOW.</Text>
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Enter a new task"
        onSubmitEditing={handleAddTodo}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />
    </View>
  );
};

export default AppContent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    padding: 8,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
});
