import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import Gamemods from '../model/Gamemods';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;

const Gamemodelist = props => {
  const [gamemodelist, setGamemodelist] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://assaultncash.com/api/mode-list.php');
      response = await response.json();
      setGamemodelist(response);
    }

    fetchMyAPI();
  }, []);

  props.navigation.setOptions({title: props.route.params.gameName});
  return (
    <View style={styles.container}>
      <FlatList
        data={gamemodelist}
        renderItem={({item}) => {
          return <Gamemods item={item} gameId={props.route.params.gameId} />;
        }}
        keyExtractor={item => item['mode-id']}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Gamemodelist;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    width: '99%',
    height: '50%',
  },
});
