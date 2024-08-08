import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import NotificationItem from '../components/NotificationItem';
import { mockNotifications } from '../data/mockData';
import { Notification, RootStackParamList } from '../types';

type NotificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NotificationsScreen'>;

const NotificationScreen = () => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();

  const handleNotificationPress = (notification: Notification) => {
    // console.log('notification', notification);
    if (notification.article) {
      navigation.navigate('ArticleDetail', { 
        article: notification.article,
        scrollToCommentId: notification.commentId 
      });
    } else {
      // console.error('no article found');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockNotifications}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  'rgba(255, 255, 255, 1)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor:  'rgba(238, 238, 238, 1)',
  },
});

export default NotificationScreen;