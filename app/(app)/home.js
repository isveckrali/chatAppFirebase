import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

const home = () => {
  const {logout, user} = useAuth()
  const handleLogout = async() =>{
    await logout()
  }
  console.log("user data ", user)
  return (
    <View>
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default home

const styles = StyleSheet.create({})