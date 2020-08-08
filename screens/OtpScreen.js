/* eslint-disable react/no-string-refs */
import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import {AuthContext} from '../components/context';
class OtpScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
    };
  }

  componentDidMount = () => {
    this.refs.pin1ref.focus();
  };
  createAccount() {
    const pin = this.state.pin1.concat(
      this.state.pin2,
      this.state.pin3,
      this.state.pin4,
    );
    const formData = new FormData();

    formData.append('otp', pin);
    formData.append('account-id', this.props.route.params.accountId);

    fetch('http://assaultncash.com/api/verify-otp.php', {
      headers: {'Content-Type': 'multipart/form-data'},
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        console.log(res[0].response);
        if (res[0].response === '1') {
          this.context.signUp({
            accountId: this.props.route.params.accountId,
            email: this.props.route.params.email,
          });
        } else {
          Alert.alert('Invalid OTP!', 'OTP is incorrect.', [{text: 'Okay'}]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {pin1, pin2, pin3, pin4} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>OTP Verification!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <FontAwesome
            name="mobile-phone"
            color="#004e92"
            size={100}
            style={{marginHorizontal: 135}}
          />

          <Text style={styles.text_footer}>
            Enter the 5 digit otp we've sent to your mobile number
          </Text>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TextInput
              maxLength={1}
              onChangeText={pin1 => {
                this.setState({pin1: pin1});
                if (pin1 != '') {
                  this.refs.pin2ref.focus();
                }
              }}
              value={pin1}
              ref={'pin1ref'}
              style={styles.txt}
            />
            <TextInput
              ref={'pin2ref'}
              onChangeText={pin2 => {
                this.setState({pin2: pin2});
                if (pin2 != '') {
                  this.refs.pin3ref.focus();
                }
              }}
              value={pin2}
              style={styles.txt}
              maxLength={1}
            />
            <TextInput
              onChangeText={pin3 => {
                this.setState({pin3: pin3});
                if (pin3 != '') {
                  this.refs.pin4ref.focus();
                }
              }}
              value={pin3}
              style={styles.txt}
              maxLength={1}
              ref={'pin3ref'}
            />
            <TextInput
              onChangeText={pin4 => {
                this.setState({pin4: pin4});
              }}
              value={pin4}
              style={styles.txt}
              maxLength={1}
              ref={'pin4ref'}
            />
          </View>
          <View style={{flex: 0.3}}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => this.createAccount()}>
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
                  Verify OTP
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

export default OtpScreen;

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
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
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

  txt: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
    height: 55,
    width: '12%',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#004e92',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
