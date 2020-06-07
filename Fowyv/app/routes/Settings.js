import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {PersonalAudioContainer} from '../components/PersonalAudioContainer';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/auth.actions';

const nonCollidingMultiSliderValue = [0, 100];
const DATA = [
  {
    language: 'English',
    checked: true,
  },
  {
    language: 'Spanish',
    checked: false,
  },
];

const AccountSettings = ({name}) => {
  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.containerHeader}>Account Settings</Text>
      <Text style={settingsStyle.fieldHeader}>Name</Text>
      <TextInput style={settingsStyle.fieldInput} value={name} />
      <Text style={settingsStyle.fieldHeader}>Age</Text>
      <TextInput style={settingsStyle.fieldInput}>23</TextInput>
    </View>
  );
};

const PersonalAudio = () => {
  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.containerHeader}>Personal Audio</Text>
      <PersonalAudioContainer
        propsStyle={personalAudioStyle}
        iconColor="white"
      />
    </View>
  );
};

const AppSettings = ({onLogoutPressed}) => {
  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.containerHeader}>App Settings</Text>
      <View style={appSettingsStyle.container}>
        <Text style={appSettingsStyle.Header}>Ages range</Text>
        <MultiSlider
          values={[
            nonCollidingMultiSliderValue[0],
            nonCollidingMultiSliderValue[1],
          ]}
          sliderLength={280}
          min={0}
          max={100}
          step={1}
          allowOverlap={false}
          enableLabel={true}
          minMarkerOverlapDistance={40}
        />
        <Text style={appSettingsStyle.header}>Languages</Text>
        <FlatList
          data={DATA}
          renderItem={item => (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                }}>
                {item.language}
              </Text>
              <CheckBox />
            </View>
          )}
        />
        <TouchableOpacity
          style={appSettingsStyle.Logout}
          onPress={onLogoutPressed}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={appSettingsStyle.DeleteAccount}>
          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

class SettingsComponent extends React.Component {
  onLogoutPressed = () => {
    this.props.dispatch(logoutUser());
  };
  render() {
    return (
      <View style={settingsStyle.view}>
        {this.props.getUser.userDetails ? (
          <ScrollView style={settingsStyle.scrollView}>
            <AccountSettings name={this.props.getUser.userDetails.name} />
            <PersonalAudio />
            <AppSettings onLogoutPressed={this.onLogoutPressed} />
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
  getUser: state.userReducer.getUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsComponent);

const settingsStyle = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'darkorange',
  },
  scrollView: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  container: {flex: 1, marginTop: '5%'},
  containerHeader: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
  fieldHeader: {
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  fieldInput: {
    backgroundColor: 'white',
    height: 35,
    width: '100%',
    alignSelf: 'flex-start',
  },
});

const personalAudioStyle = StyleSheet.create({
  formButton: {
    backgroundColor: 'white',
  },
});

const appSettingsStyle = StyleSheet.create({
  container: {},
  header: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
  Logout: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
  DeleteAccount: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
});
