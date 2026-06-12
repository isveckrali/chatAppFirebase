import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MenuOption } from 'react-native-popup-menu'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CustomMenuItems = ({text, action, value, icon}) => {
  return (
    <MenuOption onSelect={()=>action(value)}>
        <View className="px-4 py-1 flex-row justify-between items-center">
            <Text>{text}</Text>
            {icon}
        </View>
    </MenuOption>
  )
}

export default CustomMenuItems

const styles = StyleSheet.create({})