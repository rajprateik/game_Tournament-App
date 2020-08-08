import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useTheme,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';

import {AuthContext} from '../components/context';
import files from '../assets/filesBase64';

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const {signOut, toggleTheme} = React.useContext(AuthContext);

  const myShare2 = async () => {
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

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bell-outline" color={color} size={20} />
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate('NotificationScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="page-next-outline" color={color} size={size} />
              )}
              label="Term&Conditions"
              onPress={() => {
                props.navigation.navigate('TermCondtion');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="book-outline" color={color} size={size} />
              )}
              label="Privacy Policy"
              onPress={() => {
                props.navigation.navigate('PolicyScreen');
              }}
            />
            <TouchableOpacity
              onPress={() => myShare2()}
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                paddingVertical: 10,
              }}>
              <Icon name="send" color="grey" size={25} />
              <Text style={{color: 'grey', marginLeft: 28}}>Invite Friend</Text>
            </TouchableOpacity>
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="alpha-i-box-outline" color={color} size={size} />
              )}
              label="About"
              onPress={() => {
                props.navigation.navigate('AboutScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
