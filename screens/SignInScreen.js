import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from 'react-native-paper';

import {AuthContext} from '../components/context';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {colors} = useTheme();

  const {signIn} = React.useContext(AuthContext);

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setData({
        ...data,
        email: text,
        isValidUser: false,
        check_handleValidUser: false,
      });
    } else {
      setData({
        ...data,
        email: text,
        isValidUser: true,
        check_handleValidUser: true,
      });
    }
  };

  const loginHandle = (email, password) => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    };
    fetch('https://assaultncash.com/api/login.php', requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res[0]);
        if (res[0].verification_status === '1') {
          signIn({accountId: res[0]['account-id'], email});
        } else {
          Alert.alert('Invalid User!', 'Username or password is incorrect.', [
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
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <Feather name="mail" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => handleValidUser(text)}
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
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
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
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{color: '#004e92', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}>
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
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

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
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
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
});
