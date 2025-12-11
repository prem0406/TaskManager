import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { TodoListHeader } from './todoListHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IScreenLayoutProps {
  title?: string;
}

export const ScreenLayout: React.FC<PropsWithChildren<IScreenLayoutProps>> = ({
  children,
  title,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TodoListHeader title={title} />
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
