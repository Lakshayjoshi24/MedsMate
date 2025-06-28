import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../Config/FirebaseConfig';
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import MedicationCardItem from './MedicationCardItem';
import Emptystate from './Emptystate';

export default function MedicationList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));

  useEffect(() => {
    GetDateRangeList();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        GetMedicationList(selectedDate, user.email);
      } else {
        console.warn("⚠️ No logged-in user found.");
      }
    });

    return unsubscribe;
  }, [selectedDate]);

  const GetDateRangeList = () => {
    const range = GetDateRangeToDisplay();
    setDateRange(range);
  };

  const GetMedicationList = async (selectedDate, userEmail) => {
    console.log("📧 Email being used for Firestore query:", userEmail);
    console.log("📅 Selected date being queried:", selectedDate);

    if (!userEmail) {
      console.warn("No user email found");
      return;
    }

    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', userEmail),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshots = await getDocs(q);
      setMedList([]); // Clear old data

      if (querySnapshots.empty) {
        console.warn("❌ No medications found for this user/date.");
      }

      querySnapshots.forEach((doc) => {
        console.log(`✅ docId: ${doc.id} =>`, doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
    } catch (e) {
      console.error("Error fetching medication list:", e);
    }
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require('./../assets/images/Med.png')}
        style={{ width: '100%', height: 280, borderRadius: 15 }}
      />

      <FlatList
        data={dateRange}
        horizontal
        contentContainerStyle={styles.dateList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateCard,
              {
                backgroundColor: item.formattedDate === selectedDate ? '#009688' : '#E0F2F1',
              },
            ]}
            onPress={() => setSelectedDate(item.formattedDate)}
          >
            <Text
              style={[
                styles.day,
                { color: item.formattedDate === selectedDate ? '#fff' : '#111' },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                { color: item.formattedDate === selectedDate ? '#fff' : '#111' },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {medList.length > 0 ? (
        <FlatList
          data={medList}
          renderItem={({ item }) => <MedicationCardItem medicine={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Emptystate />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateList: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  dateCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F2F1',
  },
  day: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
});

