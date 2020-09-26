import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.route,
    };
    this.tabStyle = this.tabStyle.bind(this);
    this.tabPressed = this.tabPressed.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBackgroundColor('white');
  }

  tabPressed = route => {
    return () => {
      this.props.navigate(route);
    };
  };

  tabStyle = (tab, activeStyle, normalStyle) => {
    return this.state.activeTab === tab ? activeStyle : normalStyle;
  };

  leftTab = () => {
    return (
      <TouchableOpacity
        style={this.tabStyle(
          'Settings',
          activeNavTabStyle.tab,
          navbarComponentsStyle.leftTab,
        )}
        onPress={this.tabPressed('Settings')}>
        <Text
          style={this.tabStyle(
            'Settings',
            activeNavTabStyle.header,
            baseComponentsStyle.header,
          )}>
          Settings{' '}
        </Text>
      </TouchableOpacity>
    );
  };

  centerTab = () => {
    return (
      <TouchableOpacity
        style={this.tabStyle(
          'ListenLobby',
          activeNavTabStyle.tab,
          navbarComponentsStyle.centerTab,
        )}
        onPress={this.tabPressed('ListenLobby')}>
        <Text
          style={this.tabStyle(
            'ListenLobby',
            activeNavTabStyle.header,
            baseComponentsStyle.header,
          )}>
          Listen{' '}
        </Text>
      </TouchableOpacity>
    );
  };

  rightTab = () => {
    return (
      <TouchableOpacity
        style={this.tabStyle(
          'MatchLobby',
          activeNavTabStyle.tab,
          navbarComponentsStyle.rightTab,
        )}
        onPress={this.tabPressed('MatchLobby')}>
        <Text
          style={this.tabStyle(
            'MatchLobby',
            activeNavTabStyle.header,
            baseComponentsStyle.header,
          )}>
          Lobby{' '}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={navBarStyle.navigationBar}>
        <this.leftTab />
        <this.centerTab />
        <this.rightTab />
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
  centerTab: StyleSheet.compose(
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
