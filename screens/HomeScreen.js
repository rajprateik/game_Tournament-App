/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Carousel from '../components/Carousel';

import Gamelist from '../Gamepage/Gamelist';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://assaultncash.com/api/slider.php');
      response = await response.json();
      setSlides(response);
    }

    fetchMyAPI();
  }, []);
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />

      <Carousel data={slides} />

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          margin: 20,
          color: colors.text,
        }}>
        Choose one of the best game
      </Text>

      <Gamelist />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
