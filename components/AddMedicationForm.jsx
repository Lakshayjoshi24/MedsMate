import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TypeList, WhenToTake } from '../Constant/Options';
import { FormatDate, formatDateForText, formatTime } from '../service/ConvertDateTime';
import { db } from '../Config/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMedicationForm() {
  const [formData, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const raw = await AsyncStorage.getItem('userDetail');
        const user = raw ? JSON.parse(raw) : null;
        if (user?.email) setUserEmail(user.email);
        else Alert.alert('Login Required', 'Please login again');
      } catch (e) {
        console.log('Failed to fetch userDetail:', e);
      }
    };
    fetchUser();
  }, []);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const SaveMedication = async () => {
    if (!userEmail) {
      Alert.alert('User not found', 'Please log in again.');
      return;
    }

    if (!(formData?.name && formData.type && formData?.dose && formData?.startDate && formData?.endDate && formData?.reminder)) {
      Alert.alert('Enter all fields');
      return;
    }

    try {
      const docId = Date.now().toString();
      await setDoc(doc(db, 'medication', docId), {
        ...formData,
        userEmail,
        docId,
        reminder: formData.reminder.toISOString(),
      });
      Alert.alert('Success', 'Medication saved successfully');
    } catch (e) {
      console.error('Error saving medication:', e);
      Alert.alert('Error', 'Failed to save medication');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons name="medkit-outline" size={22} color="#009688" style={styles.icon} />
        <TextInput
          placeholder="Medicine Name"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={formData.name || ''}
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      <FlatList
        data={TypeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelected = formData.type?.name === item.name;
          return (
            <TouchableOpacity
              style={[styles.typeItem, isSelected && styles.typeItemSelected]}
              onPress={() => onHandleInputChange('type', item)}
            >
              <Image source={{ uri: item.icon }} style={[styles.typeIcon, isSelected && { tintColor: '#fff' }]} />
              <Text style={[styles.typeText, isSelected && styles.typeTextSelected]}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.typeListContainer}
      />

      <View style={[styles.inputGroup, styles.marginTop20]}>
        <Ionicons name="eyedrop-outline" size={22} color="#009688" style={styles.icon} />
        <TextInput
          placeholder="Dose (e.g., 2 tablets, 5ml)"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={formData.dose || ''}
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      <View style={[styles.inputGroup, styles.marginTop20]}>
        <Ionicons name="time-outline" size={22} color="#009688" style={styles.icon} />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.when}
            onValueChange={(value) => onHandleInputChange('when', value)}
            style={[styles.picker, !formData.when && { color: '#9CA3AF' }]}
            dropdownIconColor="#009688"
            mode="dropdown"
          >
            <Picker.Item label="Select time to take" value="" color="#9CA3AF" />
            {WhenToTake.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, styles.marginTop20, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons name="calendar-outline" size={22} color="#009688" style={styles.icon} />
          <Text style={[styles.text, !formData.startDate && styles.placeholderText]}>
            {formData.startDate ? formatDateForText(formData.startDate) : 'Start Date'}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            mode="date"
            minimumDate={new Date()}
            onChange={(event) => {
              if (event?.nativeEvent?.timestamp) {
                onHandleInputChange('startDate', new Date(event.nativeEvent.timestamp));
              }
              setShowStartDate(false);
            }}
            value={formData?.startDate || new Date()}
          />
        )}

        <TouchableOpacity
          style={[styles.inputGroup, styles.marginTop20, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons name="calendar-outline" size={22} color="#009688" style={styles.icon} />
          <Text style={[styles.text, !formData.endDate && styles.placeholderText]}>
            {formData.endDate ? formatDateForText(formData.endDate) : 'End Date'}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            mode="date"
            minimumDate={new Date()}
            onChange={(event) => {
              if (event?.nativeEvent?.timestamp) {
                onHandleInputChange('endDate', new Date(event.nativeEvent.timestamp));
              }
              setShowEndDate(false);
            }}
            value={formData?.endDate || new Date()}
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.inputGroup, styles.marginTop20]}
        onPress={() => setShowTimePicker(true)}
      >
        <Ionicons name="timer-outline" size={22} color="#009688" style={styles.icon} />
        <Text style={[styles.text, !formData.reminder && styles.placeholderText]}>
          {formData.reminder ? formatTime(formData.reminder) : 'Select Reminder Time'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event) => {
            if (event?.nativeEvent?.timestamp) {
              onHandleInputChange('reminder', new Date(event.nativeEvent.timestamp));
            }
            setShowTimePicker(false);
          }}
          value={formData?.reminder || new Date()}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={SaveMedication}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#111827', marginBottom: 20, marginTop: 20, marginLeft: 20 },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 14, backgroundColor: '#F9FAFB', minHeight: 56, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  marginTop20: { marginTop: 20 },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#111827', paddingVertical: 4 },
  pickerWrapper: { flex: 1, justifyContent: Platform.OS === 'android' ? 'center' : 'flex-start' },
  picker: { width: '100%', fontSize: 16, color: '#111827' },
  typeListContainer: { marginTop: 20, paddingVertical: 5 },
  typeItem: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#009688', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8, marginRight: 10, backgroundColor: '#E0F2F1',
  },
  typeItemSelected: { backgroundColor: '#009688', borderColor: '#009688' },
  typeIcon: { width: 20, height: 20, marginRight: 8 },
  typeText: { fontSize: 16, color: '#009688', fontWeight: '500' },
  typeTextSelected: { color: '#fff' },
  text: { fontSize: 16, flex: 1, color: '#111827', paddingVertical: 4 },
  placeholderText: { color: '#9CA3AF' },
  dateInputGroup: { flexDirection: 'row', gap: 10 },
  button: {
    marginTop: 30, paddingVertical: 14, borderRadius: 10, backgroundColor: '#009688', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5 },
});
