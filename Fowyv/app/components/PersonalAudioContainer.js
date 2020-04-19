import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const PersonalAudioContainer = ({propsStyle, iconColor}) => {
  return (
    <View style={personalAudioContainerStyle.container}>
      <TouchableOpacity style={personalAudioContainerStyle.iconContainer}>
        <Icon name="md-play-circle" size={60} color={iconColor} />
      </TouchableOpacity>
      <View style={personalAudioContainerStyle.buttonsContainer}>
        <TouchableOpacity
          style={StyleSheet.compose(
            personalAudioContainerStyle.formButton,
            propsStyle.formButton,
          )}>
          <Text>Record new audio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.compose(
            personalAudioContainerStyle.formButton,
            propsStyle.formButton,
          )}>
          <Text>Change Icon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const personalAudioContainerStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  iconContainer: {alignSelf: 'center'},
  formButton: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
