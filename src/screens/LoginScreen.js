import React  from "react";
import { View } from "react-native";
import { Provider as PaperProvider, Text, Button, Avatar, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import icon from '../../assets/favicon.png';


const LoginScreen = ({ navigation }) => {
    const handleLogin = () => {
        // To be implemented
        // It should check the username and password or using SMARTonFHIR OAuth2
        // For now, navigate to the Home screen
        navigation.navigate('Patient');
    };  
    return (
        <SafeAreaProvider>
            <PaperProvider>
                {/* Central lize the login, allow some margins among each component */}
                {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
                {/* </View> */}
                {/* Central lize the login, allow some margins among each component */}
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>  

                    <Avatar.Image size={20} source={icon} />

                    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Patient Portal Login</Text>
                    <TextInput style={{width: 300, marginBottom: 10}} placeholder="Username" />
                    <TextInput style={{width: 300, marginBottom: 20}} placeholder="Password" />
                    <Button style={{width: 150}} mode="contained" onPress={handleLogin}>Login</Button>
                </View>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

export default LoginScreen;