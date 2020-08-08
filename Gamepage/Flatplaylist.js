/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Playlist from './Playlist';

const Flatplaylist = props => {
  props.navigation.setOptions({title: props.route.params.list});
  const [tournamentlist, setTournamentlist] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const formData = new FormData();

      formData.append('game-id', props.route.params.gameId);
      formData.append('mode-id', props.route.params.modeId);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
      };
      let response = await fetch(
        'http://assaultncash.com/api/tournament-list.php',
        requestOptions,
      );
      response = await response.json();
      setTournamentlist(response);
      console.log(response);
      console.log('game-id', props.route.params.gameId);
      console.log('mode-id', props.route.params.modeId);
    }

    fetchMyAPI();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tournamentlist}
        renderItem={({item}) => {
          return <Playlist item={item} />;
        }}
        keyExtractor={item => item.tournament_id}
      />
    </View>
  );
};

export default Flatplaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
