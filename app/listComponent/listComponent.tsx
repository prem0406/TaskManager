import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  Platform,
} from 'react-native';
import { TTask } from '../types/tasks.type';
import { Tabs } from '../lib/tabs';

interface IListComponentProps {
  tasks: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
}

export const ListComponent: React.FC<IListComponentProps> = ({
  tasks,
  setTasks,
}) => {
  const [activeTab, setActiveTab] = useState('pending');

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter(task =>
    activeTab === 'pending' ? !task.completed : task.completed,
  );

  const renderItem = ({ item }: { item: TTask }) => (
    <View style={styles.taskItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>

      <Text style={styles.taskName}>{item.name}</Text>

      <Switch
        value={item.completed}
        onValueChange={() => toggleTask(item.id)}
        trackColor={{ false: '#d1d5db', true: '#7c3aed' }}
        thumbColor={item.completed ? '#ffffff' : '#6b7280'}
        ios_backgroundColor="#d1d5db"
        style={styles.switch}
      />
    </View>
  );

  const keyExtractor = (item: TTask) => item.id;

  return (
    <View style={styles.container}>
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Task List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#6b7280', fontSize: 16 }}>
                No tasks to display
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: {
    paddingVertical: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f5f3f7',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0d4f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  taskName: {
    flex: 1,
    fontSize: 18,
    color: '#2d2d2d',
    fontWeight: '400',
  },
  switch: {
    transform:
      Platform.OS === 'ios'
        ? [{ scaleX: 0.9 }, { scaleY: 0.9 }]
        : [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginLeft: 80,
  },
});
