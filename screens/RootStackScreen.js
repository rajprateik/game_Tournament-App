import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import Starting from './Starting';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import OtpScreen from './OtpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="Starting" component={Starting} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="OTPScreen" component={OtpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
