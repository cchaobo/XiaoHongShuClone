import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PublishScreen from '../screens/PublishScreen';

const Stack = createStackNavigator();

const PublishStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Publish" component={PublishScreen} options={{ title: 'Create Post' }} />
    </Stack.Navigator>
  );
};

export default PublishStack;



