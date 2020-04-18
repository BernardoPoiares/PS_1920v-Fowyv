import React from 'react';
import {Button, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {Chat} from '../routes/Chat.js';

const ChatStack = createStackNavigator();

export const ChatStackNavigator = ({navigation: {goBack}}) => {
  const onBackPressed = () => {
    goBack();
  };
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: () => {
            return <Text />;
          },
          headerLeft: () => (
            <Button onPress={onBackPressed} title="Info" color="#fff" />
          ),
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </ChatStack.Navigator>
  );
};
