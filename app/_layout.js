import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = () =>{
  const {isAuthenticated} = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(()=>{

    //kullanici giris yapmis mi?
    //if (typeof isAuthenticated=="undefined") return;

    const inApp = segments[0]=="(app)"
    if (isAuthenticated && !inApp) {
      //anasayfaya yonlendir
      router.replace("home")
    } else if(isAuthenticated == false){
      //girise yonlendir
      router.replace("/signIn")
    }


  },[isAuthenticated])

  return <Slot />
}

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  )
}

export default RootLayout

