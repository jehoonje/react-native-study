// src/components/TodoItem.js
import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert('Confirmation', '정말 삭제하시겠습니까?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => dispatch(deleteTodoAsync(todo.id)),
      },
    ]);
  };

  return (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{todo.task}</Text>
      <Button title="Delete" onPress={handleDelete} color="#dc3545" />
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
