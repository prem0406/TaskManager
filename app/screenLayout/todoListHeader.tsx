import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ITodoListHeaderProps {
  title?: string;
}

export const TodoListHeader: React.FC<ITodoListHeaderProps> = ({ title }) => {
  const { top } = useSafeAreaInsets();
  const styles = getStyle(top);
  return (
    <View style={styles.header}>
      {/* <TouchableOpacity
        //   onPress={onMenuPress}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </TouchableOpacity> */}

      <Text style={styles.title}>{title || 'Title'}</Text>

      {/* <TouchableOpacity
        //   onPress={onProfilePress}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <View style={styles.profileIcon}>
          <View style={styles.profileHead} />
          <View style={styles.profileBody} />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const getStyle = (top: number) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00796B',
      // paddingHorizontal: 20,
      paddingTop: top + 16,
      paddingBottom: 16,
      // marginHorizontal: 16,
      // marginVertical: 12,
      // borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    iconButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '400',
      color: '#efefef',
      letterSpacing: 0.5,
    },
    // Menu Icon (Hamburger)
    menuIcon: {
      width: 28,
      height: 24,
      justifyContent: 'space-between',
    },
    menuLine: {
      width: '100%',
      height: 3,
      backgroundColor: '#2d2d2d',
      borderRadius: 2,
    },
    // Profile Icon
    profileIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2.5,
      borderColor: '#2d2d2d',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    profileHead: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#2d2d2d',
      marginTop: -2,
    },
    profileBody: {
      width: 24,
      height: 16,
      borderRadius: 12,
      backgroundColor: '#2d2d2d',
      marginTop: 2,
    },
  });
