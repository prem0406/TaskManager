import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { TodoListHeader } from './todoListHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ScreenLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TodoListHeader />
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDBDBD',
  },
});
