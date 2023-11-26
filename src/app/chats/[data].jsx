import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MessageSend from '../components/messageSend';
import MessageRecive from '../components/messageRecive';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuid} from 'uuid';

export default function Chat() {
 
  const [chat, setChat] = useState([]);
  const [uid, setUid] = useState("");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [sendTo, setSendTo]  = useState("");

  const { data } = useLocalSearchParams();

  useEffect(() => {

    async function getUserData() {
      const userData = await getDoc(doc(database, 'users', data.split(",")[1]))
      setAvatar(userData.data().avatar)  
    }

    getUserData()

    const ids = data.split(",");
    setSendTo(ids[1])

    AsyncStorage.getItem("userId")
      .then((value) => {
        setUid(value)
    });
  
    const unsub = onSnapshot(doc(database,'chats',ids[0]), (doc) => {
      doc.exists() && setMessages(doc.data().messages.reverse())
    })

    return () => {
      unsub()
    }

  }, [])

  async function sendToUser() {

    if (message === "") {
      return;
    }
    
    const day = new Date().getDay() >= 9 ? new Date().getDay() : "0" + new Date().getDay()
    const month = new Date().getMonth() >= 9 ? new Date().getMonth() : "0" + new Date().getMonth()

    const hour = new Date().getHours() >= 9 ? new Date().getHours() : "0" + new Date().getHours()
    const minutes = new Date().getMinutes() >= 9 ? new Date().getMinutes() : "0" + new Date().getMinutes()

    const dataComplete = day + "/" + month + " às " + hour + ":" + minutes

    await updateDoc(doc(database, 'chats', data.split(",")[0]), {
      messages: arrayUnion({
        id: uuid(),
        text: message,
        senderId: data.split(",")[1],
        date: dataComplete
      })
    });

    setMessage("")
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: 'white', fontSize: 20 }}>Bem vindo:</Text>
        <Link href="/contacts" asChild>
          <Button title="Inicio" />
        </Link>
      </View>
      
      <View style={styles.messageChatContent}>
        {
           messages.length > 0 && 
          <FlatList
            inverted
            style={{ width: '100%' }}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
              {
                item.senderId !== uid ? 
                  <MessageSend 
                      message={item.text} 
                      dateTime={item.date.toString()}
                  />
                  :
                  <MessageRecive 
                    avatar={avatar}
                    message={item.text}
                    dateTime={item.date.toString()}
                  />
              }
              </> 
            )}
          /> 
        }
      </View>
      <View style={styles.textSendArea}>
        <TextInput 
            style={styles.input} 
            value={message} 
            onChangeText={setMessage}   
            multiline = {true}
          />
          <Button title="Enviar" onPress={sendToUser}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxHeight: 70,
    backgroundColor: '#2F4F4F',
    height: 70,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },

  textSendArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#8FBC8F',
    height: 70,
  },

  input: {
    width: "80%", 
    height: 40, 
    borderColor: '#A9A9A9', 
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#DCDCDC',
    fontSize: 20
  },

  messageChatContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  }
});