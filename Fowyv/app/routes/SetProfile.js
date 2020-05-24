import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import routes from 'res/routes';

import {PersonalAudioContainer} from '../components/PersonalAudioContainer';

import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {saveUserDetails} from '../redux/actions/user.action';
import {connect} from 'react-redux';

class SetProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      date: '2016-05-15',
      icon: 'play',
      audioFile: null,
    };
  }

  onSetProfile = () => {
    this.props.dispatch(
      saveUserDetails({
        userDetails: {
          name: this.state.name,
          date: this.state.date,
          icon: this.state.icon,
          audioFile: this.state.audioFile,
        },
        token: this.props.authenticatedUser.token,
      }),
    );
  };

  onNameChanged = value => {
    this.setState({name: value});
  };

  onAudioFileRecorded = (audioPath, language) => {
    this.setState({audioFile: {audioPath: audioPath, language: language}});
  };

  render() {
    return (
      <View style={loginStyle.view}>
        <Text style={loginStyle.header}>Set Profile</Text>
        <View style={loginStyle.container}>
          <View style={loginStyle.formContainer}>
            <Text style={loginStyle.formHeader}>Name</Text>
            <TextInput
              style={loginStyle.textInput}
              onChangeText={this.onNameChanged}
            />
            <Text style={loginStyle.formHeader}>Age</Text>
            <DatePicker
              style={{width: '100%'}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2002-05-01"
              maxDate="2100-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
            />
            <PersonalAudioContainer
              propsStyle={personalAudioStyle}
              iconColor="darkorange"
              onAudioFileRecorded={this.onAudioFileRecorded}
            />
            <TouchableOpacity
              style={loginStyle.playContainer}
              onPress={this.onSetProfile}>
              <Text style={loginStyle.playHeader}>Play</Text>
              <Icon name={this.state.icon} size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const SetProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetProfileComponent);

const loginStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    height: 300,
    width: (Dimensions.get('window').width / 3) * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    color: 'white',
  },
  formHeader: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'moccasin',
    width: '80%',
    height: 35,
  },
  formButton: {
    backgroundColor: 'darkorange',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'darkorange',
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
  playHeader: {
    color: 'black',
    fontSize: 30,
    marginRight: 5,
  },
});

const personalAudioStyle = StyleSheet.create({
  formButton: {backgroundColor: 'darkorange'},
});
