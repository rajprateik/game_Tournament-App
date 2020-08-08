import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import List from '../model/List';
const NotificationScreen = () => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        'http://assaultncash.com/api/notification.php',
      );
      response = await response.json();
      setNotification(response);
    }

    fetchMyAPI();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={notification}
        renderItem={({item}) => {
          return <List item={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
