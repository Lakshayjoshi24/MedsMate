import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth } from '../../Config/FirebaseConfig';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage('userDetails');
    if (!userInfo) {
      router.replace('/login/WelcomeScreen');
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#009688',         // ✅ App theme primary color
        tabBarInactiveTintColor: '#b0b0b0',        // ✅ Muted gray for inactive icons
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
