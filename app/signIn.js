import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import { useAuth } from '../context/authContext'

const Signin = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {login} = useAuth()

  const emailRef = useRef("")
  const passwordRef = useRef("")


  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Giris', "Lutfen tum alanlari doldurunuz")
      return
    }

    setLoading(true)
    const response = await login(emailRef.current, passwordRef.current)
    setLoading(false)
    if (!response.success) {
      Alert.alert("Sign In", response.msg)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-5"
      >
        {/* signIn resim */}
        <View className="items-center">
          <Image
            style={{ height: hp(25), width: wp(90) }}
            resizeMode="contain"
            source={require("../assets/images/login.jpg")}
          />
        </View>

        <View className="" >
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Giris Yap
          </Text>

          {/* inputs */}
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-10 ml-0"
          >
            <Octicons name="mail" size={hp(2.7)} color="gray" />

            <TextInput
              onChangeText={value => emailRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Email adresi"
              placeholderTextColor="gray"
            />
          </View>

          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-5 ml-0"
          >
            <Octicons name="lock" size={hp(2.7)} color="gray" />

            <TextInput
              onChangeText={value => passwordRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Sifre"
              placeholderTextColor="gray"
              secureTextEntry
            />
          </View>
          <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500 mt-4">Sifreyi Unuttum</Text>
        </View>

        {/* submit button */}
        <View>
          {
            loading ? (
              <View className="flex-row justify-center">
                <Loading size={(hp(8))} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                  Giris yap
                </Text>
              </TouchableOpacity>
            )
          }

        </View>



        {/* kayit kismi */}
        <View className="flex-row justify-center">
          <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Bir hesabin yok mu?</Text>
          <Pressable onPress={() => router.push("signUp")}>
            <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">Kayit Ol</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({})