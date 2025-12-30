import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../screenLayout/screenLayout';
import { CustomTextInput } from '../lib/input';
import { ListComponent } from '../listComponent/listComponent';
import { TTask } from '../types/tasks.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { UndoToast } from '../lib/undoToast';

const STORAGE_KEY = '@tasks';

export const TaskScreen = () => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pendingItem, setPendingItem] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSwipeDelete = (item: TTask) => {
    setTasks(prev => prev.filter(i => i.id !== item.id));
    setPendingItem(item);
    setShowToast(true);

    timerRef.current = setTimeout(() => {
      setPendingItem(null);
      setShowToast(false);
    }, 4000); // Gmail-like delay
  };

  const handleUndo = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (pendingItem) {
      setTasks(prev => [pendingItem, ...prev]);
    }

    setPendingItem(null);
    setShowToast(false);
  };

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
      id: uuid.v4(),
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
        <ListComponent
          tasks={tasks}
          setTasks={setTasks}
          handleSwipeDelete={handleSwipeDelete}
        />
      </View>
      <UndoToast
        visible={showToast}
        message="1 Deleted Task"
        onUndo={handleUndo}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, rowGap: 16 },
});
