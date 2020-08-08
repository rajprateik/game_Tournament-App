/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {DrawerContent} from './screens/DrawerContent';

import TabNav from './screens/TabNav';
import NotificationScreen from './screens/NotificationScreen';
import TermScreen from './screens/TermScreen';
import AboutScreen from './screens/AboutScreen';
import PolicyScreen from './screens/PolicyScreen';
import MyContest from './screens/MyContestScreen';

import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: false,
    userName: null,
    accountId: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_ACCOUNTID':
        return {
          ...prevState,
          accountId: action.accountId,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.email,
          accountId: action.accountId,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          accountId: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.email,
          accountId: action.accountId,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = {
    signIn: async accountData => {
      try {
        await AsyncStorage.setItem('accountId', accountData.accountId);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({
        type: 'LOGIN',
        accountId: accountData.accountId,
        email: accountData.email,
      });
    },
    getAccountId: () => {
      console.log(loginState);
      return loginState.accountId;
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('accountId');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: async createAccountData => {
      try {
        await AsyncStorage.setItem('accountId', createAccountData.accountId);
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'REGISTER',
        accountId: createAccountData.accountId,
        email: createAccountData.email,
      });
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },
  };
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let accountId;
      accountId = null;
      try {
        accountId = await AsyncStorage.getItem('accountId');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_ACCOUNTID', accountId});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.accountId !== null ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={TabNav} />
              <Drawer.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
              <Drawer.Screen name="TermCondtion" component={TermScreen} />
              <Drawer.Screen name="PolicyScreen" component={PolicyScreen} />
              <Drawer.Screen name="AboutScreen" component={AboutScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
