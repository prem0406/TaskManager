import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../screenLayout/screenLayout';
import { CustomTextInput } from '../lib/input';
import { ListComponent } from '../listComponent/listComponent';

export const TaskScreen = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <CustomTextInput onAddTask={() => {}} />
        <ListComponent />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, rowGap: 16 },
});
