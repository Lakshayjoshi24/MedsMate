import { View, Text } from 'react-native'
import React from 'react'
import AddMedicationHeader from '../../components/AddMedicationHeader'
import AddMedicationForm from '../../components/AddMedicationForm'
import Options from '../../Constant/Options'
import { ScrollView } from 'react-native-gesture-handler'


export default function AddNewMedication() {
  return (
    <ScrollView>
      <AddMedicationHeader/>
      <AddMedicationForm/>
    </ScrollView>
  )
}