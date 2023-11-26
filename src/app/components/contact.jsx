import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { database } from "../../firebaseConnection";

export default function Contact({uid, name, usuario, avatar}) {

    const [currentUserUid, setCurrentUserUid] = useState("");


    useEffect(() => {
        async function getCurrentUserUid() {
            await AsyncStorage.getItem("userId").then((value) => {
                setCurrentUserUid(value)
            })
        }

        getCurrentUserUid()
        
    }, [])

    

    async function getChat() {

        const combinedId =
        currentUserUid > uid
          ? currentUserUid + uid
          : uid + currentUserUid;

          try {
            const res = await getDoc(doc(database, "chats", combinedId));

            if (!res.exists()) {
                await setDoc(doc(database, "chats", combinedId), { messages: [] });
                
                 //create user chats
                await updateDoc(doc(database, "userChats", uid), {
                    [combinedId + ".userInfo"]: {
                    uid: uid,
                    displayName: name,
                    photoURL: avatar,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(database, "userChats", uid), {
                    [combinedId + ".userInfo"]: {
                        uid: uid,
                        displayName: name,
                        photoURL: avatar,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                  });
            }

            const data = [combinedId, uid ]
           
            router.push(`/chats/${data}`)

          } catch (err) {

            console.log(err + "Deu ruim")
          }
      
    }

    return(
        <View style={styles.container}  asChild>
            <RectButton style={styles.container} onPress={() => {getChat()}}>
                <Text style={styles.text}>{name}</Text>
                <Image 
                    source={{ uri: `${avatar}` }} 
                    style={styles.avatar} />
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#B0C4DE',
        
    },

    avatar: { 
        width: 70, 
        height: 70, 
        borderRadius: 50, 
    },

    text: {
        fontSize: 20,
        fontWeight: '500',
    }
})