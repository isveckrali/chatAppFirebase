import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Feather, Octicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView'

const SignUp = () => {

  const router = useRouter()

  const emailRef = useRef("")
  const passwordRef = useRef("")
  const usernameRef = useRef("")
  const profileRef = useRef("")

  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Kayit', "Lutfen tum alanlari doldurunuz")
      return
    }
  }

  return (
      <CustomKeyboardView>
        <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-5"
      >
        {/* signIn resim */}
        <View className="items-center">
          <Image
            style={{ height: hp(20), width: wp(90) }}
            resizeMode="contain"
            source={require("../assets/images/register.jpg")}
          />
        </View>

        <View className="" >
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Kayit Ol
          </Text>

          {/* inputs */}
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-10 ml-0"
          >
            <Feather name="user" size={hp(2.7)} color="gray" />

            <TextInput
              onChangeText={value => usernameRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Kullanici adi"
              placeholderTextColor="gray"
            />
          </View>

          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-5 ml-0"
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

          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-5 ml-0"
          >
            <Feather name="image" size={hp(2.7)} color="gray" />

            <TextInput
              onChangeText={value => profileRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Profil url"
              placeholderTextColor="gray"
            />
          </View>


        </View>

        {/* submit button */}
        <View>
          {
            loading ? (
              <View className="flex-row justify-center">
                <Loading size={(hp(8))} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                  Kayit Ol
                </Text>
              </TouchableOpacity>
            )
          }

        </View>



        {/* kayit kismi */}
        <View className="flex-row justify-center">
          <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Zaten bir hesabin var mi?</Text>
          <Pressable onPress={() => router.push("signIn")}>
            <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">Giris Yap</Text>
          </Pressable>
        </View>

      </View>
    </View>
      </CustomKeyboardView>
  )
}

export default SignUp

const styles = StyleSheet.create({})