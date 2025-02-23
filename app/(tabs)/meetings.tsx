import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
}

const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Q2 Planning Review',
    date: '2024-02-15',
    time: '10:00 AM',
    participants: ['Rahul Sharma', 'Priya Patel', 'Amit Singh'],
  },
  {
    id: '2',
    title: 'Team Sync',
    date: '2024-02-16',
    time: '2:00 PM',
    participants: ['Anjali Gupta', 'Vikram Joshi'],
  },
  {
    id: '3',
    title: 'Budget Discussion',
    date: '2024-02-19',
    time: '11:30 AM',
    participants: ['Sneha Reddy', 'Arjun Kapoor', 'Neha Desai'],
  },
];

export default function MeetingsScreen() {
  const renderMeeting = ({ item }: { item: Meeting }) => (
    <View style={styles.meetingCard}>
      <View style={styles.meetingHeader}>
        <Text style={styles.meetingTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.meetingInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color="#666666" />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#666666" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
      </View>

      <View style={styles.participantsContainer}>
        <Text style={styles.participantsLabel}>Participants:</Text>
        <View style={styles.participantsList}>
          {item.participants.map((participant, index) => (
            <View key={index} style={styles.participantChip}>
              <Text style={styles.participantName}>{participant}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meetings</Text>
      </View>

      <FlatList
        data={meetings}
        renderItem={renderMeeting}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  meetingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  meetingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  shareButton: {
    padding: 4,
  },
  meetingInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  participantsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 12,
  },
  participantsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participantChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  participantName: {
    fontSize: 14,
    color: '#333333',
  },
});