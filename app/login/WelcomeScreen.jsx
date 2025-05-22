import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/Login.png')} style={styles.image} />
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Get appointments on your fingertips.</Text>
      </View>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push('/login/SignupScreen')}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => router.push('/login/LoginScreen')}
        >
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 0,
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  imageContainer: {
    marginVertical: 0,
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  subtitleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  signupButton: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009688',
    textAlign: 'center',
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  loginLink: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
