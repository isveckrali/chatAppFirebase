import { Alert, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessagesList from '../../components/MessagesList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";
import { getRoomId } from '../../utils/common'
import { setDoc, Timestamp, doc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseConfig'


const chatRoom = () => {
    const item = useLocalSearchParams() // second user
    const { user } = useAuth() // logged in user

    const router = useRouter()
    const [messages, setMessages] = useState([])
    const textRef = useRef()
    const inputRef = useRef(null)

    console.log("chatRoom ", item)

    const scrollViewRef = useRef(null)

    useEffect(() => {
        if (!user?.userId || !item?.userId) return;

        createRoomIfNotExists();

        let roomId = getRoomId(user.userId, item.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setMessages(allMessages);
        }, (error) => {
            console.log("Mesajları dinleme hatası:", error);
        });


        const KeyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow", updateScrollView
        )


        return () =>{
            unsub()
            KeyboardDidShowListener.remove()
        }
    }, [user?.userId, item?.userId]);

    useEffect(()=>{
        updateScrollView()
    },[messages])

    const updateScrollView = () => {
        setTimeout(()=>{
            scrollViewRef?.current?.scrollToEnd({animated: true})
        })
    }

    console.log("messages, ", messages)
    const handleSendMessage = async () => {
        let message = textRef.current.trim()
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId)
            const docRef = doc(db, "rooms", roomId)
            const messagesRef = collection(docRef, "messages")
            textRef.current = ""
            if (inputRef) inputRef?.current?.clear()

            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })

            console.log("yeni mesaj id si ", newDoc.id)
        } catch (err) {
            Alert.alert("Mesaj", err.message)
        }
    }

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, item?.userId)
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    return (
        <CustomKeyboardView isChat={true}>
            <View className="flex-1 bg-white">
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className="h-3 border-b border-neutral-300" />
                <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                    <View className="flex-1">
                        <MessagesList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                        <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder='buraya yaz...'
                                style={{ fontSize: hp(2) }}
                                className="flex-1 mr-2"
                            />
                            <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                                <Feather name='send' size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}

export default chatRoom

const styles = StyleSheet.create({})