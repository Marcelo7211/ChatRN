import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, database } from '../../firebaseConnection';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Cadastre() {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [error, setError] = useState(false)


  useEffect(() => {
   
  }, [])

  async function createUser() {
    const res = await createUserWithEmailAndPassword(auth, username, password);

    await setDoc(doc(database, "users", res.user.uid), {
      uid: res.user.uid,
      name: nome,
      usuario: username,
      avatar: avatar
    });

    await setDoc(doc(database, "userChats", res.user.uid), {});

    router.push("/")
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Nome de Usuario</Text>
      </View>
      <TextInput 
          style={styles.input} 
          value={username} 
          onChangeText={setUsername} 
          placeholder='Nome de Usuário'
        />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Nome</Text>
      </View>
      <TextInput 
          style={styles.input} 
          value={nome} 
          onChangeText={setNome}
          placeholder='Nome' 
        />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Senha</Text>
      </View>
      <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword}
          placeholder='Senha'
      />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Avatar</Text>
      </View>
      <TextInput 
          style={styles.input} 
          value={avatar}          
          onChangeText={setAvatar}
          placeholder='Avatar'
        />


      <TouchableOpacity style={styles.button} onPress={() => createUser()} >
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>


      <Text style={{margin: 15}}>Ou</Text>

      <Link href={`/`} asChild>
          <Text style={{color: 'blue', fontSize: 20}}>Voltar</Text>
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
    fontSize: 20
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