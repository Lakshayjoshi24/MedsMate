import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // Optional: if you want to navigate

export default function Emptystate() {
  const router = useRouter(); // Optional: for navigation

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/medicine.png')}
        style={styles.image}
      />

      <Text style={styles.title}>No Medications!</Text>

      <Text style={styles.subtitle}>
        You have 0 medications, kindly setup a new one.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/add-new-medication')} // ✅ Navigate to Add screen
      >
        <Text style={styles.buttonText}>Add New Medicine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#009688',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
