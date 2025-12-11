import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../screenLayout/screenLayout';
import { CustomTextInput } from '../lib/input';
import { ListComponent } from '../listComponent/listComponent';
import { TTask } from '../types/tasks.type';

export const TaskScreen = () => {
  const [tasks, setTasks] = useState<TTask[]>([
    { id: '1', name: 'Mustard Oil', completed: false },
    { id: '2', name: 'Mustard Oil', completed: true },
    { id: '3', name: 'Mustard Oil', completed: false },
  ]);

  const onAddTask = (taskName: string) => {
    const newTask: TTask = {
      id: (tasks.length + 1).toString(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <ScreenLayout title="Task Manager">
      <View style={styles.container}>
        <CustomTextInput onAddTask={onAddTask} />
        <ListComponent tasks={tasks} setTasks={setTasks} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, rowGap: 16 },
});
