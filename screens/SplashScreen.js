import React, {useEffect} from 'react';
import {View, Dimensions, StyleSheet, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Starting');
    }, 3000);
  }, []);
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004e92" barStyle="light-content" />

      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const {width, height} = Dimensions.get('screen');
const height_logo = height * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004e92',
    justifyContent: 'center',
  },
  logo: {
    width: width,
    height: height_logo,
  },
});
