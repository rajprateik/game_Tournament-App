/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const List = ({item}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.cardView}>
      <View
        style={{
          marginLeft: 5,
          paddingTop: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#1c50eb',
            fontSize: 18,
            fontWeight: 'bold',
            backgroundColor: 'blue',
          }}>
          Notice:
        </Text>
        <Text
          style={{
            marginLeft: 5,
            flex: 1,
            fontFamily: 'serif',
          }}>
          {item.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', marginLeft: 5}}>
          <Text style={{fontSize: 15, color: 'blue', fontWeight: 'bold'}}>
            Date:
          </Text>
          <Text style={{fontSize: 16}}>{item.date}</Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 5}}>
          <Text style={{fontSize: 15, color: 'blue', fontWeight: 'bold'}}>
            Time:
          </Text>
          <Text style={{fontSize: 16}}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  cardView: {
    width: width - 20,
    height: height / 7,
    backgroundColor: '#bdb2b1',
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 6,
  },
});
