/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Playlist = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardView}>
          <LinearGradient colors={['#0c6352', '#1ddeb8']} style={styles.header}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.txt_header}>{item.mode_name}</Text>
            </View>
            <Text style={styles.txt_header2}>{item.tournament_name}</Text>
          </LinearGradient>
          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: '#dddddd',
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={styles.box_caption}>Date</Text>
              <Text style={styles.box_bold}>{item.tournament_date}</Text>
            </View>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: '#dddddd',
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={styles.box_caption}>Time</Text>
              <Text style={styles.box_bold}>{item.tournament_time}</Text>
            </View>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: '#dddddd',
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={styles.box_caption}>Map</Text>
              <Text style={styles.box_bold}>{item.map}</Text>
            </View>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: '#dddddd',
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={styles.box_caption}>Mode</Text>
              <Text style={styles.box_bold}>{item.tournament_mode}</Text>
            </View>
          </View>
          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox2,
                {
                  borderRightColor: '#dddddd',
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={styles.box_caption}>Players remaining</Text>
              <Text style={styles.box_bold}>{item.players_remaining}</Text>
            </View>
            <View style={styles.infoBox2}>
              <Text style={styles.box_caption}>Entry Fee</Text>
              <Text style={styles.box_bold}>{item.entry_fee}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PlayerList', {
                  tournamentId: item['tournament_id'],
                })
              }>
              <LinearGradient
                colors={['#1ddeb8', '#0c6352']}
                style={styles.signIn}>
                <Text style={{color: '#fff', fontSize: 18}}>JOIN NOW</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  cardView: {
    width: '94%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 2,
    shadowRadius: 5,
    marginLeft: 8,
    elevation: 3,
  },
  header: {
    width: '100%',
    height: 68,
    justifyContent: 'center',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  txt_header2: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  txt_header: {
    width: '35%',
    height: 30,
    color: '#fff',
    fontSize: 20,
    backgroundColor: '#0c6352',
    borderRadius: 20,
    shadowOpacity: 2,
    shadowRadius: 20,
    textAlign: 'center',
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 50,
  },
  infoBox: {
    width: 80,
    marginLeft: 10,
    justifyContent: 'center',
  },
  infoBox2: {
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_caption: {
    color: 'grey',
    fontSize: 14,
    justifyContent: 'center',
  },
  box_bold: {
    color: '#0c6352',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  signIn: {
    width: '100%',
    height: 43,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
