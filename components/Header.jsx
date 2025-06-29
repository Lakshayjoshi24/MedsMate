import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getLocalStorage } from '../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Header() {
  const [user, setUser] = useState(null);
  const router=useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage('userDetails');
    setUser(userInfo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../assets/images/smiley.png')}
          style={styles.avatar}
        />
        <Text style={styles.text}>Hello, {user?.displayName || 'User'} 👋</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/add-new-medication')}>
  <Ionicons name="medkit-outline" size={24} color="#009688" />
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
});
 