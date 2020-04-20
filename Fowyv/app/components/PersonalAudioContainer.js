import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PersonalAudioRecorder} from '../components/PersonalAudioRecorder';

export class PersonalAudioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  onRecordPersonalAudioPressed = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  render() {
    return (
      <View>
        <PersonalAudioRecorder
          modalVisible={this.state.modalVisible}
          goBack={this.onRecordPersonalAudioPressed}
        />
        <View style={personalAudioContainerStyle.container}>
          <TouchableOpacity style={personalAudioContainerStyle.iconContainer}>
            <Icon
              name="md-play-circle"
              size={60}
              color={this.props.iconColor}
            />
          </TouchableOpacity>
          <View style={personalAudioContainerStyle.buttonsContainer}>
            <TouchableOpacity
              style={StyleSheet.compose(
                personalAudioContainerStyle.formButton,
                this.props.propsStyle.formButton,
              )}
              onPress={this.onRecordPersonalAudioPressed}>
              <Text>Record new audio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={StyleSheet.compose(
                personalAudioContainerStyle.formButton,
                this.props.propsStyle.formButton,
              )}>
              <Text>Change Icon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

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
