import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const PatientScreen = ({ navigation }) => {
    const [patientData, setPatientData] = useState(null); 
    const [selectedValue, setSelectedValue] = useState(null);
    
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
                setPatientData({});
            }
        }; 
        fetchData();
    }, []);

    if (!patientData) {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        );
    }

    return (
        <View>
            <Text>Patient Data</Text>
            {/* To Be implemented FHIR bundle converted to some profiles */}
            <Text>{JSON.stringify(patientData)}</Text>
            <Text>Select a model</Text>
            <Picker selectedValue={selectedValue} onValueChange={setSelectedValue}>
            <Picker.Item label="BMI predictor" value="https://github.com/stormliucong/GrowthPercentileAppRN/raw/main/models/torch_mlp_model.onnx" />
            <Picker.Item label="A null model" value="" />
            </Picker>
            {selectedValue && <Text>modelPath: {selectedValue}</Text>}
            <Button title="Predict BMI" onPress={handlePress} />
        </View>
    );
};


export default PatientScreen;