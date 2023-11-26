import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, router }  from "expo-router";
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  

  async function getChat() {
    try{
      const res = await signInWithEmailAndPassword(auth, username, password);
      const token = Object.values(res);
      await AsyncStorage.setItem("userId", res.user.uid)
      await AsyncStorage.setItem("userIdToken", token[0].stsTokenManager.accessToken)

     router.push(`/contacts`)
    } catch(e) {
      alert(e)
      console.log(e)
    }
    
  }


  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Usuario</Text>
      </View>
      <TextInput 
          style={styles.input} 
          value={username}
          onChangeText={setUsername}
          keyboardType='email-address' 
        />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Senha</Text>
      </View>
      <TextInput 
          style={styles.input} 
          value={password} 
          secureTextEntry={true}
          onChangeText={setPassword}

      />


      <TouchableOpacity style={styles.button} onPress={() => getChat()} >
        <Text style={styles.text}>Entrar</Text>
      </TouchableOpacity>


      <Text style={{margin: 15}}>Ou</Text>

      <Link href={`/cadastro/cadastre`} asChild>
          <Text style={{color: 'blue', fontSize: 20}}>Cadastre-se</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: "80%", 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },

  button: {
    width: "80%", 
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },

  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  label: {
    fontSize: 15,
    color: 'black',
  },

  labelContainer: {
    marginTop: 10,
    width: "80%",
  }
});