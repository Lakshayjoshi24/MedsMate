import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetPrevDateRangeToDisplay } from '../../service/ConvertDateTime';
import moment from 'moment';
import { db, auth } from '../../Config/FirebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import MedicationCardItem from '../../components/MedicationCardItem';

const History = () => {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YY'));
  const [medList, setMedList] = useState([]);

  const userEmail = auth?.currentUser?.email;

  useEffect(() => {
    GetDateList();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        GetMedicationList(selectedDate, user.email);
      }
    });

    return unsubscribe;
  }, [selectedDate]);

  const GetDateList = () => {
    const dates = GetPrevDateRangeToDisplay();
    setDateRange(dates);
  };

  const GetMedicationList = async (selectedDate, userEmail) => {
    if (!userEmail) return;

    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', userEmail),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshots = await getDocs(q);
      const data = [];

      querySnapshots.forEach((doc) => {
        data.push(doc.data());
      });

      setMedList(data);
    } catch (e) {
      console.error('Error fetching medication list:', e);
    }
  };

  return (
    <FlatList
    data={[]}
    style={{
      height:'100%',
      backgroundColor:'white'
    }}
    ListHeaderComponent={
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/med-his.png')}
        style={styles.imageBanner}
        resizeMode="contain"
      />

      <Text style={styles.header}>Medication History</Text>

      <FlatList
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateCard,
              {
                backgroundColor:
                  item.formattedDate === selectedDate ? '#009688' : '#E0F2F1',
              },
            ]}
            onPress={() => {
              setSelectedDate(item.formattedDate);
              GetMedicationList(item.formattedDate, userEmail);
            }}
          >
            <Text
              style={[
                styles.day,
                {
                  color:
                    item.formattedDate === selectedDate ? '#fff' : '#111',
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color:
                    item.formattedDate === selectedDate ? '#fff' : '#111',
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.medListWrapper}>
  {medList.length > 0 ? (
    <FlatList
      data={medList}
      renderItem={({ item }) => (
        <MedicationCardItem medicine={item} selectedDate={selectedDate} />
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.medList}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <Text style={styles.emptyText}>No Medication Found</Text>
  )}
</View>

    </View>}
    />
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  imageBanner: {
    width: '100%',
    height: 280,
    borderRadius: 15,
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  dateList: {
    paddingVertical: 8,
  },
  dateCard: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
  },
  medListContainer: {
    flex: 1,
    marginTop: 10,
  },
  medList: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
    marginTop: 40,
  },
});
