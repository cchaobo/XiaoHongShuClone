import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import PublishStack from './PublishStack';
import NotificationStack from './NotificationStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name={focused ? "home" : "home-outline"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Publish" 
          component={PublishStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name={focused ? "add-circle" : "add-circle-outline"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Notifications" 
          component={NotificationStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name={focused ? "notifications" : "notifications-outline"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name={focused ? "person" : "person-outline"} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;