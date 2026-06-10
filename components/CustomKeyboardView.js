import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const ios = Platform.OS == "ios"

const CustomKeyboardView = ({ children }) => {
    return (
        <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboardView

const styles = StyleSheet.create({})