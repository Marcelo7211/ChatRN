import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { database } from "../../firebaseConnection";
import Contact from "../components/contact";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Contacts() {

  const [contacts, setContacts] = useState  ([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getContacts() {

      await AsyncStorage.getItem("userId").then((value) => {
        setUserId(value)
      })

      const contactRef = collection(database, "users");
      const docs =  await getDocs(contactRef);

      docs.forEach((doc) => {
        setContacts((oldArray) => [...oldArray, doc.data()])
      })
    }

    if(contacts.length === 0)
      getContacts()

  }, [])

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => (
          item.uid !== userId &&
          <Contact
            uid={item.uid}
            name={item.name}
            usuario={item.usuario}
            avatar={item.avatar}
          />
        )}

      />
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
});