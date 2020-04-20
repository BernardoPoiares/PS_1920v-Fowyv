import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-material-dropdown';

const languages = [
  {
    value: 'English',
  },
  {
    value: 'Portuguese',
  },
];
export const PersonalAudioRecorder = ({modalVisible, goBack}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      <View style={personalAudioRecorderStyle.view}>
        <View style={personalAudioRecorderStyle.container}>
          <Text style={personalAudioRecorderStyle.containerHeader}>
            Record Audio
          </Text>
          <View style={personalAudioRecorderStyle.recorderContainer}>
            <View style={personalAudioRecorderStyle.recorderSemiContainer}>
              <TouchableOpacity
                style={personalAudioRecorderStyle.iconContainer}>
                <Icon name="md-play-circle" size={80} color="darkorange" />
              </TouchableOpacity>
              <TouchableOpacity style={personalAudioRecorderStyle.eraseButton}>
                <Text>Erase</Text>
              </TouchableOpacity>
            </View>
            <Dropdown
              label="language"
              containerStyle={personalAudioRecorderStyle.dropdown}
              data={languages}
            />
          </View>
          <View style={personalAudioRecorderStyle.buttonsContainer}>
            <TouchableOpacity
              style={personalAudioRecorderStyle.bottomButton}
              onPress={goBack}>
              <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={personalAudioRecorderStyle.bottomButton}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const personalAudioRecorderStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerHeader: {
    backgroundColor: 'white',
  },
  recorderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  recorderSemiContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  iconContainer: {alignSelf: 'center'},
  eraseButton: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'moccasin',
  },
  dropdown: {
    width: 120,
  },
  bottomButton: {
    borderWidth: 1,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
