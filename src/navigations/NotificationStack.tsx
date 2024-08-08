import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../screens/NotificationScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotificationsScreen" component={NotificationScreen} options={{ title: '' }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{ title: 'Article' }} />
    </Stack.Navigator>
  );
};

export default NotificationStack;