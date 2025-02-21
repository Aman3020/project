import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

export default function RecordScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    if (!isRecording) return {};
    
    return {
      transform: [
        {
          scale: withRepeat(
            withSequence(
              withSpring(1.2),
              withSpring(1.0)
            ),
            -1,
            true
          ),
        },
      ],
    };
  });

  async function startRecording() {
    try {
      if (Platform.OS !== 'web') {
        await Audio.requestPermissionsAsync();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setTranscribedText('Listening...');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      // Simulated transcription result
      setTranscribedText('Aman kaise Padh rahe ho.\nAction items:\n- Review budget by Friday\n- Schedule follow-up next week\n- Share presentation with team');
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Assistant</Text>
      </View>

      <View style={styles.transcriptionContainer}>
        <Text style={styles.transcriptionText}>{transcribedText}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={styles.recordButton}>
          <Animated.View style={[styles.recordButtonInner, animatedStyle]}>
            <Ionicons
              name={isRecording ? 'stop' : 'mic'}
              size={32}
              color="white"
            />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.recordingStatus}>
          {isRecording ? 'Recording...' : 'Tap to Start'}
        </Text>
      </View>
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
  transcriptionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  controlsContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  recordButton: {
    marginBottom: 16,
  },
  recordButtonInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  recordingStatus: {
    fontSize: 16,
    color: '#666666',
  },
});