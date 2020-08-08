/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Plyerlist from '../Gamepage/Plyerlist';

const {width, height} = Dimensions.get('screen');

const MyContestScreen = () => {
  const {colors} = useTheme();

  const theme = useTheme();

  return <Plyerlist />;
};

export default MyContestScreen;
