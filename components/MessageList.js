import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

const MessageList = ({messages}) => {
  return (
    <ScrollView 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingTop: 10}}
    >
        {
            messages.map((message, index)=>{
                return (
                    <MessageItem message={message} key={index} />
                )
            })
        }
    </ScrollView>
}

export default MessageList

const styles = StyleSheet.create({})