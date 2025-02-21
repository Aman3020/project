import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

const notes: Note[] = [
  {
    id: '1',
    title: 'Q2 Planning Meeting Notes',
    content: '• Discussed budget allocation\n• New product features timeline\n• Marketing campaign strategy\n• Team resource planning',
    date: '2024-02-15',
    tags: ['Planning', 'Budget', 'Strategy'],
  },
  {
    id: '2',
    title: 'Team Sync Summary',
    content: '• Project status updates\n• Blockers and solutions\n• Next week priorities\n• Team feedback',
    date: '2024-02-16',
    tags: ['Team', 'Updates'],
  },
  {
    id: '3',
    title: 'Budget Discussion',
    content: '• Q2 budget review\n• Cost optimization ideas\n• Investment priorities\n• Resource allocation',
    date: '2024-02-19',
    tags: ['Finance', 'Planning'],
  },
];

export default function NotesScreen() {
  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.noteDate}>{item.date}</Text>
      
      <Text style={styles.noteContent}>{item.content}</Text>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
      </View>

      <FlatList
        data={notes}
        renderItem={renderNote}
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
  noteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  shareButton: {
    padding: 4,
  },
  noteDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  noteContent: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    backgroundColor: '#E8F0FE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#007AFF',
  },
});