/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Share from 'react-native-share';

import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

import files from '../assets/filesBase64';

const AccountScreen = ({navigation}) => {
  const myShare = async () => {
    const shareOptions = {
      message: 'hi, im fgaming app',
      url: files.image1,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const {colors} = useTheme();

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text
        style={[
          {marginLeft: 35, fontSize: 22, paddingTop: 20},
          {color: colors.text},
        ]}>
        Prefences
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{flexDirection: 'row', marginLeft: 20, paddingVertical: 20}}>
        <Icons name="ios-person" color="grey" size={25} />
        <Text style={{color: colors.text, marginLeft: 28}}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('TermCondtion')}
        style={{flexDirection: 'row', marginLeft: 20, paddingVertical: 20}}>
        <Icon name="page-next-outline" color="grey" size={25} />
        <Text style={{color: colors.text, marginLeft: 28}}>Term&Condition</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('PolicyScreen')}
        style={{flexDirection: 'row', marginLeft: 20, paddingVertical: 20}}>
        <Icon name="book-outline" color="grey" size={25} />
        <Text style={{color: colors.text, marginLeft: 28}}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableRipple onPress={() => myShare()}>
        <View
          style={{flexDirection: 'row', marginLeft: 20, paddingVertical: 20}}>
          <Icon name="send" color="grey" size={25} />
          <Text style={{color: colors.text, marginLeft: 28}}>
            Invite friends
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};
// console.log(Account)s
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
