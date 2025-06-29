import { Alert, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import MedicationCardItem from '../../components/MedicationCardItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { db } from '../../Config/FirebaseConfig';

export default function MedicationActionModel() {

  const medicine = useLocalSearchParams();


  const router=useRouter();

  const UpdateActionStatus=async(status)=>{
    try{
        const docRef=doc(db,'medication',medicine?.docId);
        await updateDoc(docRef,{
            action:arrayUnion({
                status:status,
                time:moment().format('LT'),
                date:medicine.selectedDate
            })
        });
        Alert.alert(status,'Response Saved!',[
            {
                text:'OK',
                onPress: () => router.replace('(tabs)')

            }
        ])
    }catch(e){
        console.log(e);
    }
  }

  // Format time properly (e.g., 19:00 → 7:00 PM)
  const formattedTime = moment(medicine?.reminder, 'HH:mm').format('h:mm A');

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/notification.gif')}
        style={styles.image}
      />
      <Text style={styles.dateText}>{medicine?.selectedDate}</Text>
      <Text style={styles.reminderText}>{formattedTime}</Text>
      <Text style={styles.messageText}>It's time to take your medicine</Text>

      <MedicationCardItem medicine={medicine}/>

      <View style={styles.buttonRow}>
  <TouchableOpacity style={styles.closeBtn} 
  onPress={()=>UpdateActionStatus('Missed')}
  >
    <Ionicons name="close-outline" size={24} color="red" style={{ marginRight: 6 }} />
    <Text style={styles.closeBtnText}>Missed</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.successBtn}
  onPress={()=>UpdateActionStatus('Taken')}
  >
    <Ionicons name="checkmark-done-outline" size={24} color="white" style={{ marginRight: 6 }} />
    <Text style={styles.successBtnText}>Taken</Text>
  </TouchableOpacity>
</View>
    <TouchableOpacity 
    onPress={()=>router.back()}
    style={{
        position:'absolute',
        bottom:25
    }}>
        <AntDesign name="closecircle" size={44} color="#757575"  />
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  reminderText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#009688', // App's primary color
    marginBottom: 8,
  },
  messageText: {
    fontSize: 18,
    color: '#333',
  },
 buttonRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
},

closeBtn: {
  paddingVertical: 10,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'red',
  borderRadius: 10,
  marginRight: 12,
},

closeBtnText: {
  fontSize: 18,
  color: 'red',
  fontWeight: '600',
},

successBtn: {
  paddingVertical: 10,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#009688',
  borderRadius: 10,
},

successBtnText: {
  fontSize: 18,
  color: 'white',
  fontWeight: '600',
},

});
