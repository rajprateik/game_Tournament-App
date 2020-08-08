import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';

const Plyerlist = props => {
  const [data, setData] = useState({
    player1Name: '',
    player1CharId: '',
    player2Name: '',
    player2CharId: '',
    player3Name: '',
    player3CharId: '',
    player4Name: '',
    player4CharId: '',
  });

  const [accountData, setAccountData] = useState(null);
  const player1Name = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player1Name: val,
      });
    }
  };
  const player1CharId = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player1CharId: val,
      });
    }
  };
  const player2Name = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player2Name: val,
      });
    }
  };
  const player3Name = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player3Name: val,
      });
    }
  };
  const player4Name = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player4Name: val,
      });
    }
  };
  const player2CharId = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player2CharId: val,
      });
    }
  };
  const player3CharId = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player3CharId: val,
      });
    }
  };
  const player4CharId = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        player4CharId: val,
      });
    }
  };
  const razorPayCheckout = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_nI8uEBOyW9n5se', // Your api key
      amount: '100',
      name: 'Assual n Cash',
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  const payNow = () => {
    const formData = new FormData();
    formData.append('player_1_id', data.player1Name);
    formData.append('player_2_id', data.player2Name);
    formData.append('player_3_id', data.player3Name);
    formData.append('player_4_id', data.player4Name);
    formData.append('player_1_name', data.player1CharId);
    formData.append('player_2_name', data.player2CharId);
    formData.append('player_3_name', data.player3CharId);
    formData.append('player_4_name', data.player4CharId);
    formData.append('tournament_id', props.route.params.tournamentId);
    formData.append('account-id', props.route.params.accountId);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    };
    fetch('http://assaultncash.com/api/tournament-entry.php', requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res[0].response === '1') {
          setAccountData({
            tournamentId: props.route.params.tournamentId,
            accountId: props.route.params.accountId,
            entryId: res[0]['entry-id'],
          });
          razorPayCheckout();
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1ddeb8', '#0c6352']} style={styles.container}>
        <StatusBar backgroundColor="#004e92" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Enroll Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.text_footer}>Player 1 ⤵</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Player1 Name"
                placeholderTextColor="#8a8383"
                style={styles.textInput}
                onChangeText={val => player1Name(val)}
              />
              <TextInput
                placeholder="Player1 Character id"
                placeholderTextColor="#8a8383"
                maxLength={14}
                keyboardType="numeric"
                style={styles.textInput}
                onChangeText={val => player1CharId(val)}
              />
            </View>
            <Text style={styles.text_footer}>Player 2 ⤵</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Player2 Name"
                placeholderTextColor="#8a8383"
                style={styles.textInput}
                onChangeText={val => player2Name(val)}
              />
              <TextInput
                placeholder="Player2 Character id"
                placeholderTextColor="#8a8383"
                keyboardType="numeric"
                maxLength={14}
                style={styles.textInput}
                onChangeText={val => player2CharId(val)}
              />
            </View>
            <Text style={styles.text_footer}>Player 3 ⤵</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Player3 Name"
                placeholderTextColor="#8a8383"
                style={styles.textInput}
                onChangeText={val => player3Name(val)}
              />
              <TextInput
                placeholder="Player3 Character id"
                placeholderTextColor="#8a8383"
                keyboardType="numeric"
                maxLength={14}
                style={styles.textInput}
                onChangeText={val => player3CharId(val)}
              />
            </View>
            <Text style={styles.text_footer}>Player 4 ⤵</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Player4 Name"
                placeholderTextColor="#8a8383"
                style={styles.textInput}
                onChangeText={val => player4Name(val)}
              />
              <TextInput
                placeholder="Player4 Character id"
                placeholderTextColor="#8a8383"
                keyboardType="numeric"
                maxLength={14}
                style={styles.textInput}
                onChangeText={val => player4CharId(val)}
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => payNow()}>
                <LinearGradient
                  colors={['#1ddeb8', '#0c6352']}
                  style={styles.signIn}>
                  <Text style={[styles.textSign, {color: '#fff'}]}>
                    Pay now
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};
export default Plyerlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  action: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textInput: {
    paddingLeft: 5,
    color: '#05375a',
    fontWeight: '400',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: 150,
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
