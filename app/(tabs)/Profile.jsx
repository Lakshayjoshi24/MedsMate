import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../Config/FirebaseConfig';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const router = useRouter();
  const user = auth?.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login/WelcomeScreen');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <Image
        source={require('../../assets/images/smiley.png')} // Your profile icon
        style={styles.profileImage}
      />

      <Text style={styles.username}>{user?.displayName || 'Guest User'}</Text>
      <Text style={styles.email}>{user?.email || 'No email found'}</Text>

      <View style={styles.optionsContainer}>
        <OptionCard text="➕ Add New Medication" onPress={() => router.push('/add-new-medication')} />
        <OptionCard text="💊 My Medication" onPress={() => router.push('/')} />
        <OptionCard text="🕒 History" onPress={() => router.push('/(tabs)/History')} />
        <OptionCard text="🚪 Logout" onPress={handleLogout} isLogout />
      </View>
    </View>
  );
};

const OptionCard = ({ text, onPress, isLogout }) => (
  <TouchableOpacity onPress={onPress} style={[styles.card, isLogout && styles.logoutCard]}>
    <Text style={[styles.cardText, isLogout && styles.logoutText]}>{text}</Text>
  </TouchableOpacity>
);

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: '#E0F2F1',
  },
  username: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
  email: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginBottom: 25,
  },
  optionsContainer: {
    flex: 1,
    gap: 15,
  },
  card: {
    backgroundColor: '#E0F2F1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  logoutCard: {
    backgroundColor: '#FFEAEA',
  },
  logoutText: {
    color: '#D32F2F',
  },
});
