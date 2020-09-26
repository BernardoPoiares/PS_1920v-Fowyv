import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {PersonalAudioContainer} from '../components/PersonalAudioContainer';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/auth.actions';
import {
  getSearchSettings,
  setSearchSettings,
} from '../redux/actions/searchSettings.actions';
import {savePersonalAudio} from '../redux/actions/user.actions';

import {GetAge} from '../utils/DatesUtil';

const Genders = [{gender: 'male'}, {gender: 'female'}];

const AccountSettings = ({name, age}) => {
  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.containerHeader}>Account Settings</Text>
      <Text style={settingsStyle.fieldHeader}>Name</Text>
      <Text style={settingsStyle.fieldValue}>{name}</Text>
      <Text style={settingsStyle.fieldHeader}>Age</Text>
      <Text style={settingsStyle.fieldValue}>{age}</Text>
    </View>
  );
};

const PersonalAudio = ({audioFile, onAudioFileRecorded}) => {
  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.containerHeader}>Personal Audio</Text>
      <PersonalAudioContainer
        propsStyle={personalAudioStyle}
        iconColor="white"
        onAudioFileRecorded={onAudioFileRecorded}
        audioFilename={audioFile}
      />
    </View>
  );
};

const AppSettings = ({
  minSearchAge,
  maxSearchAge,
  genders,
  languages,
  onLogoutPressed,
  onAgeRangeChanged,
  onGendersChanged,
}) => {
  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.containerHeader}>App Settings</Text>
      <View style={appSettingsStyle.container}>
        <Text style={appSettingsStyle.Header}>Ages range</Text>
        <MultiSlider
          values={[minSearchAge, maxSearchAge]}
          sliderLength={280}
          valuePrefix={25}
          onValuesChangeFinish={onAgeRangeChanged}
          min={18}
          max={100}
          step={1}
          allowOverlap={false}
          enableLabel={true}
          minMarkerOverlapDistance={1}
        />
        <Text style={appSettingsStyle.Header}>Search Genders</Text>
        <FlatList
          data={Genders}
          renderItem={({item}) => (
            <View style={appSettingsStyle.FlatListContainer}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                }}>
                {item.gender}
              </Text>
              <CheckBox
                value={genders != null ? genders.includes(item.gender) : false}
                onValueChange={onGendersChanged(item.gender)}
              />
            </View>
          )}
        />
        <TouchableOpacity
          style={appSettingsStyle.Logout}
          onPress={onLogoutPressed}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      audioFilename: this.props.getUser.userDetails.audioFile,
    };
  }
  UNSAFE_componentWillMount() {
    this.props.dispatch(
      getSearchSettings({token: this.props.authenticatedUser.token}),
    );
  }
  onAgeRangeChanged = values => {
    this.props.dispatch(
      setSearchSettings({
        token: this.props.authenticatedUser.token,
        settings: {
          minSearchAge: values[0],
          maxSearchAge: values[1],
        },
      }),
    );
  };

  onLogoutPressed = () => {
    this.props.dispatch(logoutUser());
  };

  onGendersChanged = gender => {
    return () => {
      const newgenders = this.props.searchSettings.searchGenders.includes(
        gender,
      )
        ? this.props.searchSettings.searchGenders.filter(g => g != gender)
        : this.props.searchSettings.searchGenders.concat(gender);
      this.props.dispatch(
        setSearchSettings({
          token: this.props.authenticatedUser.token,
          settings: {
            searchGenders: newgenders,
          },
        }),
      );
    };
  };

  onAudioFileRecorded = audioPath => {
    this.props
      .dispatch(
        savePersonalAudio({
          audioFile: audioPath,
        }),
      )
      .then(() => {
        this.setState({audioFilename: audioPath});
      });
  };

  onBackPressed = async () => {
    await this.props.dispatch.dispatch(logoutUser());
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View style={settingsStyle.view}>
        {this.props.getUser.userDetails ? (
          <ScrollView style={settingsStyle.scrollView}>
            <AccountSettings
              name={this.props.getUser.userDetails.name}
              age={GetAge(
                this.props.getUser.userDetails.age
                  ? this.props.getUser.userDetails.age
                  : this.props.getUser.userDetails.date,
              )}
            />
            <PersonalAudio
              audioFile={this.state.audioFilename}
              onAudioFileRecorded={this.onAudioFileRecorded}
            />
            <AppSettings
              minSearchAge={this.props.searchSettings.minSearchAge}
              maxSearchAge={this.props.searchSettings.maxSearchAge}
              genders={this.props.searchSettings.searchGenders}
              languages={this.props.searchSettings.languages}
              onAgeRangeChanged={this.onAgeRangeChanged}
              onLogoutPressed={this.onLogoutPressed}
              onGendersChanged={this.onGendersChanged}
            />
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
  getUser: state.userReducer.getUser,
  searchSettings: state.searchSettingsReducer.searchSettings,
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
    justifyContent: 'center',
    backgroundColor: 'darkorange',
  },
  scrollView: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  container: {marginTop: '5%'},
  containerHeader: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
  fieldHeader: {
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  fieldValue: {
    backgroundColor: 'white',
    height: 35,
    fontSize: 18,
    width: '100%',
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
  FlatListContainer: {
    flexDirection: 'row',
  },
});
