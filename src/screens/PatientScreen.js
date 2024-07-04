import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider, ActivityIndicator, Button, Text, TextInput, Card, Banner } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const PatientScreen = ({ navigation }) => {
    const [patientData, setPatientData] = useState({
        name: "John Doe",
        age: 45,
        gender: "Male"
    }); 
    const [selectedValue, setSelectedValue] = useState("");
    const [visible, setVisible] = React.useState(false);
  
    const handleInputChange = (key, value) => {
        setPatientData({
          ...patientData,
          [key]: value,
        });
      };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setVisible(true);
      };
    
    const handlePress = () => {
        // To be implemented
        // It should extract FHIR bundle data and pass it to the Result screen
        if (!patientData) {
            return;
        }
        if (!selectedValue) {
            return;
        }
        const modelPath = selectedValue;
        navigation.navigate('Prediction', {patientData: patientData, modelPath: modelPath});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // To be provided patient FHIR bundle URL.
                hard_coded_github_url = 'https://github.com/stormliucong/GrowthPercentileAppRN/raw/main/data/patient.json';
                const response = await axios.get('http://localhost:3000/patient');
                console.log('Response:', response);
                setPatientData(response.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        }; 
        fetchData();
    }, []);

    if (!patientData) {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        );
    }

    // const styles = StyleSheet.create({
    //     container: {
    //       flex: 1,
    //       justifyContent: 'center',
    //       padding: 16,
    //     },
    //     card: {
    //       marginBottom: 20,
    //     },
    //     label: {
    //       fontSize: 20,
    //       textAlign: 'center',
    //     //   make it bold
    //         fontWeight: 'bold',
    //     },
    //     picker: {
    //       marginBottom: 16,
    //     },
    //     modelPath: {
    //       marginVertical: 8,
    //       fontSize: 14,
    //       color: 'grey',
    //     },
    //     button: {
    //       marginTop: 16,
    //     },
    //   });

    return (
        <SafeAreaProvider>
      <PaperProvider>
        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}} >
          <Card style={{width: 300}}>
            <Card.Title title="Patient Data" style={{fontSize: 20, fontWeight: 'bold'}} />
            <Card.Content>
              {Object.keys(patientData).map((key) => (
                <View key={key} >
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>{key}</Text>
                  <TextInput
                    mode="outlined"
                    value={String(patientData[key])}
                    onChangeText={(value) => handleInputChange(key, value)}
                    style={{backgroundColor: 'white'}}
                    keyboardType={typeof patientData[key] == 'number' ? 'numeric' : 'default'}
                  />
                </View>
              ))}
              
            </Card.Content>
          </Card>
          
          
          <View >
          <Text style={{fontSize: 20, fontWeight: 'bold', alignContent: 'center', marginTop: 5}}>Select a model</Text>

          <Picker 
            selectedValue={selectedValue}
            onValueChange={(itemValue) => handleSelect(itemValue)}
            style={{width: 300}}
          >
            <Picker.Item label="BMI predictor" value="https://github.com/stormliucong/GrowthPercentileAppRN/raw/main/models/torch_mlp_model.onnx" />
            <Picker.Item label="A placeholder" value="" />

          </Picker>
            </View>

            <Banner
            visible={visible}
            style={{width: 300}}
            actions={[
              {
                label: 'Dismiss',
                onPress: () => setVisible(false),
              },
            ]}
            icon="alert"
          >
            Model Path: {selectedValue}
          </Banner>
          
          

          <Button mode="contained" onPress={handlePress} style={{width: 300}}>   
            Predict BMI
          </Button>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
    );
};


export default PatientScreen;