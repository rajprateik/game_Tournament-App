/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme, useNavigation} from '@react-navigation/native';

import {AuthContext} from '../components/context';

const SignUpScreen = props => {
  const {signUp} = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile: '',
    isValidUser: true,
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const mobileData = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        mobile: val,
      });
    }
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleValidUser = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === false) {
      setData({
        ...data,
        email: val,
        isValidUser: false,
        check_handleValidUser: false,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidUser: true,
        check_handleValidUser: true,
      });
    }
  };

  const signUpHandle = () => {
    if (
      data.username.length === 0 ||
      data.email.length === 0 ||
      data.password.length === 0 ||
      data.mobile.length === 0
    ) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }
    const formData = new FormData();
    formData.append('name', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('mobile', data.mobile);
    console.log(formData);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    };
    fetch('http://assaultncash.com/api/signup.php', requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res[0].response === '1') {
          // signUp({accountId: res[0]['account-id'], email: data.email});
          props.navigation.navigate('OTPScreen', {
            accountId: res[0]['account-id'],
            email: data.email,
          });
        } else {
          Alert.alert('Invalid User!', 'Email Address  is alreadt exit.', [
            {text: 'Okay'},
          ]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#004e92" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#004e92" size={20} />
              </Animatable.View>
            ) : null}
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
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleValidUser(val)}
            />
            {data.check_handleValidUser ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#004e92" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                emailaddress invalid fil '@' and '.'.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
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

            <TextInput
              placeholder="Mobile No."
              style={styles.textInput}
              maxLength={10}
              keyboardType="numeric"
              onChangeText={val => mobileData(val)}
            />
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
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => signUpHandle()}
              // {signUpHandle(data.username, data.email, data.password, data.mobile)}
            >
              <LinearGradient
                colors={['#000428', '#004e92']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#004e92',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#004e92',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004e92',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
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
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
