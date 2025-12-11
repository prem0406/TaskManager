import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface ITabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tabs: React.FC<ITabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
        onPress={() => setActiveTab('pending')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'pending' && styles.activeTabText,
          ]}
        >
          Pending
        </Text>
        {activeTab === 'pending' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
        onPress={() => setActiveTab('completed')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'completed' && styles.activeTabText,
          ]}
        >
          Completed
        </Text>
        {activeTab === 'completed' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f7',
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f3f7',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {
    // Active tab styling handled by indicator
  },
  tabText: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#7c3aed',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#7c3aed',
    borderRadius: 2,
  },
});
