import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';

export default function MedicationCardItem({ medicine }) {
  // Format reminder time (e.g., "19:00" -> "7:00 PM")
  const formattedTime = moment(medicine?.reminder, 'HH:mm').format('h:mm A');

  return (
    <View style={styles.cardContainer}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: medicine?.type?.icon }}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      {/* Name + When + Dose */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{medicine?.name}</Text>
        <Text style={styles.whenText}>{medicine?.when}</Text>
        <Text style={styles.doseText}>{medicine?.dose} {medicine?.type?.name}</Text>
      </View>

      {/* Reminder Time */}
      <View style={styles.timeContainer}>
        <Ionicons name="timer-outline" size={20} color="#333" />
        <Text style={styles.timeText}>{formattedTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 14,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  whenText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  doseText: {
    fontSize: 14,
    color: '#009688',
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    color: '#000',
  },
});
