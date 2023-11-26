import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
export default function TabRootesLayout() {
    return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
            name="index"
            options={{
                title:"Inicio",
                tabBarIcon: () => <MaterialIcons name="home" size={24} color="black" />
            }}
        /> 

        <Tabs.Screen
            name="contacts"
            options={{
                title:"Contatos",
                tabBarIcon: () => <MaterialIcons name="contacts" size={24} color="black" />
            }}
        />

        <Tabs.Screen
            name="settings"
            options={{
                title:"Configurações",
                tabBarIcon: () => <MaterialIcons name="settings" size={24} color="black" />
            }}
        />
    </Tabs>        
    )
}