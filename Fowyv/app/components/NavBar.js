import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';

const ComponentLeft = () => {
  return (
    <TouchableOpacity style={navbarComponentsStyle.leftTab}>
      <Text style={baseComponentsStyle.header}>Settings</Text>
    </TouchableOpacity>
  );
};

const ComponentCenter = () => {
  return (
    <TouchableOpacity style={activeNavTabStyle.tab}>
      <Text style={activeNavTabStyle.header}>Listen</Text>
    </TouchableOpacity>
  );
};

const ComponentRight = () => {
  return (
    <TouchableOpacity
      style={navbarComponentsStyle.rightTab}
      onPress={() => {
        Alert.alert('Lobby');
      }}>
      <Text style={baseComponentsStyle.header}>Lobby</Text>
    </TouchableOpacity>
  );
};

export class NavBar extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBackgroundColor('white');
  }
  render() {
    return (
      <View style={navBarStyle.navigationBar}>
        <ComponentLeft />
        <ComponentCenter />
        <ComponentRight />
      </View>
    );
  }
}

const baseComponentsStyle = StyleSheet.create({
  tab: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {alignSelf: 'center', fontSize: 18, color: 'darkorange'},
});

const navbarComponentsStyle = {
  leftTab: StyleSheet.compose(
    baseComponentsStyle.tab,
    {borderBottomRightRadius: 15},
  ),
  componentCenter: StyleSheet.compose(
    baseComponentsStyle.tab,
    {
      borderColor: 'white',
    },
  ),
  rightTab: StyleSheet.compose(
    baseComponentsStyle.tab,
    {borderBottomLeftRadius: 15},
  ),
};
const navBarStyle = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  statusBar: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
});

const activeNavTabStyle = {
  tab: StyleSheet.compose(
    baseComponentsStyle.tab,
    {
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
      backgroundColor: 'darkorange',
      borderColor: 'white',
    },
  ),
  header: StyleSheet.compose(
    baseComponentsStyle.header,
    {fontSize: 20, fontWeight: 'bold', color: 'white'},
  ),
};
