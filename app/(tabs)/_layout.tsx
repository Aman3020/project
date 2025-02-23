import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';

export default function TabLayout() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateTabIcon = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateTabIcon();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#757575',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Record',
          tabBarIcon: ({ size, color }) => (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons name="mic" size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ size, color }) => (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons name="checkbox-outline" size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="meetings"
        options={{
          title: 'Meetings',
          tabBarIcon: ({ size, color }) => (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons name="calendar" size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ size, color }) => (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons name="document-text" size={size} color={color} />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}