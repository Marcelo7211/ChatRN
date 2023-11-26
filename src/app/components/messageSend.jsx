import { StyleSheet, Text, View } from "react-native";

export default function MessageSend({ message, dateTime }) {
    return (
        <View style={styles.container}>
            <Text>{message}</Text>
            <Text style={styles.dataHora}>{dateTime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#FFDEAD',
        maxWidth: '75%',
        minWidth: '15%',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginBottom: 10   
    },
    dataHora: {
        alignSelf: 'flex-end',
        fontSize: 10,
        color: '#808080',
        marginTop: 10
    }
})