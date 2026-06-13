import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const chatRoom = () => {
    const item = useLocalSearchParams()
    console.log("chatRoom ", item)
  return (
    <View>
      <Text>chatRoom</Text>
    </View>
  )
}

export default chatRoom

const styles = StyleSheet.create({})