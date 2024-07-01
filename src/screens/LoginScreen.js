import React  from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
    const handleLogin = () => {
        // To be implemented
        // It should check the username and password or using SMARTonFHIR OAuth2
        // For now, navigate to the Home screen
        navigation.navigate('Patient');
    };  
    return (
        <View>
            <Text >Patient Portal Login</Text>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

export default LoginScreen;