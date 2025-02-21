import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  deadline: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review budget by Friday',
    completed: false,
    deadline: '2024-02-16',
  },
  {
    id: '2',
    title: 'Schedule follow-up next week',
    completed: false,
    deadline: '2024-02-19',
  },
  {
    id: '3',
    title: 'Share presentation with team',
    completed: false,
    deadline: '2024-02-15',
  },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => toggleTask(item.id)}>
      <View style={styles.taskLeft}>
        <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
          {item.completed && (
            <Ionicons name="checkmark" size={16} color="#ffffff" />
          )}
        </View>
        <View>
          <Text style={[
            styles.taskTitle,
            item.completed && styles.taskTitleCompleted
          ]}>
            {item.title}
          </Text>
          <Text style={styles.taskDeadline}>Due: {item.deadline}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  listContainer: {
    padding: 16,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  taskTitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  taskDeadline: {
    fontSize: 14,
    color: '#666666',
  },
});