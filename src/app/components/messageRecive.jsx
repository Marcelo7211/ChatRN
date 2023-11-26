import { Image, StyleSheet, Text, View } from "react-native";

export default function MessageRecive({message, avatar, dateTime}) {

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: `${avatar}` }} 
                style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 2 }} 
            />
            <View style={styles.containerMessage}>
                <Text>{message}</Text>
                <Text style={styles.dataHora}>{dateTime}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start'
    },

    containerMessage: {
        padding: 10,
        backgroundColor: '#808000',
        maxWidth: '75%',
        minWidth: '15%', 
        alignSelf: 'flex-start',
        borderRadius: 10,
        marginBottom: 10    
    },
    dataHora: {
        alignSelf: 'flex-end',
        fontSize: 10,
        color: '#80C0C0',
        marginTop: 10
    }
})