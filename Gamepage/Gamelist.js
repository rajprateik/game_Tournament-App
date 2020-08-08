import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import GameImg from '../model/GameImg';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;

const Gamelist = () => {
  const [gamelist, setGamelist] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://assaultncash.com/api/game-list.php');
      response = await response.json();
      setGamelist(response);
    }

    fetchMyAPI();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={gamelist}
        renderItem={({item}) => {
          return <GameImg item={item} />;
        }}
        keyExtractor={item => item.id}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Gamelist;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: '99%',
    height: '50%',
  },
});
