import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../screenLayout/screenLayout';
import { CustomTextInput } from '../lib/input';
import { ListComponent } from '../listComponent/listComponent';
import { TTask } from '../types/tasks.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tasks';

export const TaskScreen = () => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  // Debounced save - waits 500ms after last change before saving
  useEffect(() => {
    if (!isLoading && tasks.length > 0) {
      // Clear previous timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout to save after 500ms of inactivity
      saveTimeoutRef.current = setTimeout(() => {
        saveTasks();
      }, 500);
    }

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [tasks, isLoading]);

  const onAddTask = (taskName: string) => {
    const newTask: TTask = {
      id: (tasks.length + 1).toString(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      console.log('Tasks saved successfully');
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
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
