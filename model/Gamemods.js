import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';

const Gamemods = ({item, gameId}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('List', {gameId, modeId: item['mode-id']})
      }>
      <View style={styles.cardView}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://images.unsplash.com/photo-1571863706194-8c6ba42cc074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1116&q=80',
          }}
        />

        <View style={styles.textView}>
          <Text style={styles.itemDescription}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Gamemods;

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: '88%',
    height: '55%',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
  },

  textView: {
    position: 'absolute',
    bottom: 5,
    margin: 10,
    left: 5,
  },
  image: {
    width: 150,
    height: 95,
    borderRadius: 10,
  },

  itemDescription: {
    color: 'white',
    fontSize: 22,
    paddingTop: 20,
    fontWeight: 'bold',
  },
});
