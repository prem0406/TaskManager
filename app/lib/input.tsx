import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface ICustomTextInput {
  onAddTask: (taskName: string) => void;
}
export const CustomTextInput: React.FC<ICustomTextInput> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={taskText}
        onChangeText={setTaskText}
        placeholder="Enter a task name"
        placeholderTextColor="#999"
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
        activeOpacity={0.7}
      >
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#2d2d2d',
    paddingVertical: 12,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#d8c8e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  plusIcon: {
    fontSize: 32,
    color: '#2d2d2d',
    fontWeight: '300',
  },
});
