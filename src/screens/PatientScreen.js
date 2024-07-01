import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from "react-native";
import axios from 'axios';

const PatientScreen = ({ navigation }) => {
    const [patientData, setPatientData] = useState(null);        

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
        </View>
    );
};

export default PatientScreen;