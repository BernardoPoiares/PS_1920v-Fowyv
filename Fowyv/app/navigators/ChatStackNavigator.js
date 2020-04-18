import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

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
            <TouchableOpacity
              onPress={onBackPressed}
              style={chatStackStyle.backwardTabButton}>
              <Icon name="backward" size={30} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert('This is a button!')}
              style={chatStackStyle.backwardTabButton}>
              <Icon name="gear" size={30} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: chatStackStyle.header,
        }}
      />
    </ChatStack.Navigator>
  );
};

const chatStackStyle = StyleSheet.create({
  backwardTabButton: {
    margin: 10,
  },
  gearTabButton: {
    margin: 10,
  },
  header:{
    backgroundColor:'darkorange'
  }
});
