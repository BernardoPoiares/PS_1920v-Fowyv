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
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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

export class Settings extends React.Component {
  render() {
    return (
      <View style={settingsStyle.view}>
        <ScrollView style={settingsStyle.scrollView}>
          <View style={settingsStyle.container}>
            <Text style={settingsStyle.containerHeader}>Account Settings</Text>
            <Text style={settingsStyle.fieldHeader}>Name</Text>
            <TextInput style={settingsStyle.fieldInput}>Jessica</TextInput>
            <Text style={settingsStyle.fieldHeader}>Age</Text>
            <TextInput style={settingsStyle.fieldInput}>23</TextInput>
          </View>

          <View style={settingsStyle.container}>
            <Text style={settingsStyle.containerHeader}>Personal Audio</Text>
            <View style={personalAudioSettingStyle.container}>
              <TouchableOpacity style={personalAudioSettingStyle.iconContainer}>
                <Icon name="md-play-circle" size={60} color="white" />
              </TouchableOpacity>
              <View style={personalAudioSettingStyle.buttonsContainer}>
                <TouchableOpacity
                  style={personalAudioSettingStyle.formButton}
                  onPress={this.onLoginPressed}>
                  <Text>Record new audio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={personalAudioSettingStyle.formButton}
                  onPress={this.onLoginPressed}>
                  <Text>Change Icon</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={settingsStyle.container}>
            <Text style={settingsStyle.containerHeader}>App Settings</Text>
            <View style={appSettingsStyle.container}>
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
                    <Text>item.Language</Text>
                    <CheckBox />
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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

const personalAudioSettingStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  iconContainer: {alignSelf: 'center'},
  formButton: {
    backgroundColor: 'white',
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

const appSettingsStyle = StyleSheet.create({
  container: {},
  header: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
});
