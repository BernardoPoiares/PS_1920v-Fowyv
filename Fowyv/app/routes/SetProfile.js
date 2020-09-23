import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

import {PersonalAudioContainer} from '../components/PersonalAudioContainer';

import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {saveUserDetails} from '../redux/actions/user.actions';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/auth.actions';

const Genders = [
  {
    value: 'male',
  },
  {
    value: 'female',
  },
];

class SetProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    let minimumAge = new Date();
    minimumAge.setFullYear(minimumAge.getFullYear() - 18);
    this.state = {
      name: null,
      date: minimumAge,
      gender: null,
      audioFile: null,
    };
  }

  onSetProfile = () => {
    this.props.dispatch(
      saveUserDetails({
        name: this.state.name,
        date: this.state.date,
        gender: this.state.gender,
        audioFile: this.state.audioFile,
      }),
    );
  };

  onBackPressed = () => {
    this.props.dispatch(logoutUser());
  };

  onNameChanged = value => {
    this.setState({name: value});
  };

  onAudioFileRecorded = audioPath => {
    this.setState({audioFile: audioPath});
  };

  onGenderChanged = value => {
    this.setState({gender: value});
  };

  render() {
    return (
      <View style={setProfileStyle.view}>
        <Text style={setProfileStyle.header}>Set Profile</Text>
        <View style={setProfileStyle.container}>
          <View style={setProfileStyle.formContainer}>
            <Text style={setProfileStyle.formHeader}>Name</Text>
            <TextInput
              style={setProfileStyle.textInput}
              onChangeText={this.onNameChanged}
            />
            <Dropdown
              label="Gender"
              containerStyle={setProfileStyle.dropdown}
              data={Genders}
              onChangeText={this.onGenderChanged}
            />
            <Text style={setProfileStyle.formHeader}>Age</Text>
            <DatePicker
              style={{width: '100%'}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              maxDate="2002-06-22"
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
              audioFilename={this.state.audioFile}
            />
            <TouchableOpacity
              style={setProfileStyle.playContainer}
              onPress={this.onSetProfile}>
              <Text style={setProfileStyle.playHeader}>Play</Text>
              <Icon name="play" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={setProfileStyle.backContainer}
            onPress={this.onBackPressed}>
            <Icon name="backward" size={30} color="white" />
            <Text style={setProfileStyle.backHeader}>Back</Text>
          </TouchableOpacity>
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

const setProfileStyle = StyleSheet.create({
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
    height: 350,
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
    padding: 0,
    paddingLeft: 5,
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
  dropdown: {
    width: 120,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 5,
  },
  backHeader: {
    color: 'white',
    fontSize: 30,
    marginLeft: 5,
  },
});

const personalAudioStyle = StyleSheet.create({
  formButton: {backgroundColor: 'darkorange'},
});
