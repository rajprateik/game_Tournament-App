/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useTheme, useNavigation} from '@react-navigation/native';

const GameImg = ({item}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardView}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Game', {
            gameId: item['game-id'],
            gameName: item.name,
          })
        }>
        <Image style={styles.image} source={{uri: item.img}} />
        <View style={styles.textView}>
          <Text style={styles.itemDescription}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GameImg;

const styles = StyleSheet.create({
  cardView: {
    width: 150,
    height: 100,
    backgroundColor: 'white',
    margin: 10,

    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },

  textView: {
    position: 'absolute',
    bottom: 5,
    margin: 10,
    left: 5,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },

  itemDescription: {
    color: 'white',
    fontSize: 22,
    paddingTop: 20,
    fontWeight: 'bold',
  },
});
