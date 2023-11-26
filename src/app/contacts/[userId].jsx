import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { ref, onValue, push, set } from "firebase/database";
import { useState, useEffect } from 'react';
import database from '../../firebaseConnection';
import Contact from '../components/contact';
import { useLocalSearchParams } from 'expo-router';

export default function Contacts() {
    const { userId } = useLocalSearchParams();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      async function getContacts() {
        await onValue(ref(database, `Usuarios`), (snapshot) => {
           const data = Object.values(snapshot.val()); 
           setContacts(data);
        })
     }
  
      getContacts()
      console.log(userId)
    }, [])
  
    return (
      <View style={styles.container}>
        <View style={styles.containerNewContact}>
          <RectButton 
            style={styles.buttonNewContact}
            onPress={() => {alert("novo contato")}}
          >
           <View style={styles.buttonNewContactContainer}>
              <Text>Novo Contato</Text>
           </View>
          </RectButton>
        </View>
        <View style={styles.containerContacts}>
        <FlatList
              style={{ width: '100%' }}
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <>
                  {
                    userId != item.id &&
                    <Contact 
                        userId={userId} 
                        fromId={item.id}
                        nome={item.nome} 
                        avatar={item.avatar} />
                  }
                </> 
              )}
            />
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
  
    containerNewContact: {
      width: '100%',
      alignItems: 'center',
    },
  
    containerContacts: {
      flex: 1,
      marginTop: 10,
      width: '90%',
      alignItems: 'center',
      
    },
    buttonNewContact: {
      width: '100%',
      height: 60,
    }, 
  
    buttonNewContactContainer: {
      backgroundColor: '#2e5c09',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    }
    
  });