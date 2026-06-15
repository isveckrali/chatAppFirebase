import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash, formatDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const ChatItem = ({ item, router, noBorder, currentUser }) => {


    const [lastMessage, setLastMessage] = useState([])

    const openChatRoom = () => {
        router.push({ pathname: "/chatRoom", params: item })
    }

    const renderTime = () => {
       if (lastMessage) {
          let date = lastMessage?.createdAt
          return formatDate(new Date(date?.seconds * 1000))
       }
    }

    const renderLastMessage = () => {
        if (typeof lastMessage == "undefined") return "Yukelniyor..."
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return "Sen: "+ lastMessage?.text
            return lastMessage?.text
        } else {
            return "Merhaba de"
        }
    }

    useEffect(() => {

        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy("createdAt", "desc"));

        const unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setLastMessage(allMessages[0] ? allMessages[0]: null);
        }, (error) => {
            console.log("Mesajları dinleme hatası:", error);
        });

        return unsub;
    }, [])

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? "" : "border-b border-b-neutral-200"}`}>
            <Image
                source={{ uri: item?.profileUrl }}
                style={{ height: hp(6), width: hp(6) }}
                className="rounded-full"
                placeholder={blurhash}
            />

            {/* bane and last message */}
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">{item?.username}</Text>
                    <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-800">
                        {renderTime()}
                    </Text>
                </View>
                <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">
                    {renderLastMessage()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({})