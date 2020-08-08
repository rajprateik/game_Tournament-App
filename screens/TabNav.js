import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import AccountScreen from './AccountScreen';
import MyContestScreen from './MyContestScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Gamemodelist from '../Gamepage/Gamemodelist';
import Flatplaylist from '../Gamepage/Flatplaylist';
import Plyerlist from '../Gamepage/Plyerlist';

const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ContestStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Contest"
      component={MyContestStackScreen}
      options={{
        tabBarLabel: 'MyContest',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-trophy" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountStackScreen}
      options={{
        tabBarLabel: 'Account',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-wallet" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNav;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen name="Game" component={Gamemodelist} />
    <HomeStack.Screen name="List" component={Flatplaylist} />
    <HomeStack.Screen name="PlayerList" component={Plyerlist} />
  </HomeStack.Navigator>
);

const MyContestStackScreen = ({navigation}) => (
  <ContestStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ContestStack.Screen
      name="Contest"
      component={MyContestScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </ContestStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#694fad'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#694fad"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const AccountStackScreen = ({navigation}) => (
  <AccountStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#d02860'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <AccountStack.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#d02860"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </AccountStack.Navigator>
);
