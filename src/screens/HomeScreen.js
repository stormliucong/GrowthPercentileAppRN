import React from 'react';
import { View, Text } from 'react-native';
import InputForm from '../components/InputForm';
import { useEffect } from 'react';

const HomeScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [standard, setStandard] = useState('US');
  const [showPrediction, setShowPrediction] = useState(false);
  const [inputFeatures, setInputFeatures] = useState([]);

  useEffect(() => {
    console.log('HomeScreen mounted');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View>
      <Text>Welcome to Growth Percentile Calculator</Text>
      <InputForm navigation={navigation} />
    </View>
    </SafeAreaView>
    
  );
};

export default HomeScreen;
