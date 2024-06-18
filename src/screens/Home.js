import React from 'react'
import { List } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native'
import AnimTab3 from '../bottomTab/AnimTab3';
const Home = ({ navigation }) => {

  const navigate = (route) => navigation.navigate(route)
  return (
    <AnimTab3/>
  )
}

export default Home

const styles = StyleSheet.create({})
