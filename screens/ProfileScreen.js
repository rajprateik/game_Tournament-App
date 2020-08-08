import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/context';

const ProfileScreen = ({navigation}) => {
  const {getAccountId} = React.useContext(AuthContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    creationDate: '',
  });

  const {colors} = useTheme();

  const theme = useTheme();

  useEffect(() => {
    async function fetchMyAPI() {
      const formData = new FormData();
      formData.append('account-id', getAccountId());
      console.log(formData);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
      };
      let response = await fetch(
        'http://assaultncash.com/api/account-details.php',
        requestOptions,
      );
      response = await response.json();
      console.log(response[0]);
      setData(response[0]);
    }
    fetchMyAPI();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004e92" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Profile</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <Text style={styles.textInput}>{data.name}</Text>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                padding: 10,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <Feather name="mail" color="#05375a" size={20} />
            <Text style={styles.textInput}>{data.email}</Text>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Phone No.
          </Text>
          <View style={styles.action}>
            <Feather name="phone-call" color="#05375a" size={20} />

            <Text style={styles.textInput}>{data.mobile}</Text>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Profile Creation
          </Text>
          <View style={styles.action}>
            <FontAwesome name="pencil" color="#05375a" size={20} />

            <Text style={styles.textInput}>{data.creation_date}</Text>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#694fad',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    paddingLeft: 10,
    color: '#05375a',
    fontWeight: '800',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
