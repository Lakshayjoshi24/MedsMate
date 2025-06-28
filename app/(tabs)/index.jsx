import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import Emptystate from '../../components/Emptystate';
import MedicationList from '../../components/MedicationList';

export default function HomeScreen() {
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out, redirect to login screen
        router.replace('/login/WelcomeScreen');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After signOut, onAuthStateChanged will handle the redirect
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <FlatList style={{ flex: 1, backgroundColor: 'white' }}
    data={[]}
    ListHeaderComponent={
      <View style={{
      padding:25,
      backgroundColor:'white',
      height:'100%'
    }}>
      <Header/>
      {/* <Emptystate/> */}

      <MedicationList/>
    </View>

    }
   />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 10 },
});