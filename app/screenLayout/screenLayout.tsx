import { StyleSheet, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { TodoListHeader } from './todoListHeader';

interface IScreenLayoutProps {
  title?: string;
}

export const ScreenLayout: React.FC<PropsWithChildren<IScreenLayoutProps>> = ({
  children,
  title,
}) => {
  return (
    <View style={styles.container}>
      <TodoListHeader title={title} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
});
