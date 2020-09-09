import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';
import {Menu, MenuItem, Position} from 'react-native-enhanced-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteUserMatch} from '../redux/actions/userMatches.actions.js';

import {Chat} from '../routes/Chat.js';

const ChatStack = createStackNavigator();

class ChatStackNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      userEmail: props.route.params.params.userMatch,
    };
  }

  onBackPressed = () => {
    this.props.navigation.navigate('MainStack', {
      screen: 'MatchLobby',
    });
  };

  onSettingsPressed = () => {
    this.showMenu();
  };

  hideMenu = () => this.menuRef.hide();

  showMenu = () => {
    this.menuRef.show(this.settingsRef, Position.BOTTOM_LEFT);
    this.setState({showSettings: true});
  };

  onDeleteMatch = async () => {
    const deleteMatchResult = await this.props.dispatch(
      deleteUserMatch({
        userEmail: this.state.userEmail,
      }),
    );
    if (deleteMatchResult) {
      this.onBackPressed();
    } else {
      this.hideMenu();
    }
  };

  render() {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerTitle: () => {
              return (
                <Text style={chatStackStyle.userName}>
                  {this.props.route.params.userName + ' '}
                </Text>
              );
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={this.onBackPressed}
                style={chatStackStyle.backwardTabButton}>
                <Icon name="backward" size={30} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => {
              return (
                <View>
                  <TouchableOpacity
                    ref={ref => {
                      this.settingsRef = ref;
                    }}
                    onPress={this.onSettingsPressed}
                    style={chatStackStyle.settingsIcon}>
                    <Icon name="gear" size={30} color="white" />
                  </TouchableOpacity>
                  <Menu
                    ref={ref => {
                      this.menuRef = ref;
                    }}>
                    <MenuItem
                      style={{backgroundColor: 'white'}}
                      textStyle={chatStackStyle.deleteMatchText}
                      onPress={this.onDeleteMatch}>
                      Delete Match
                    </MenuItem>
                  </Menu>
                </View>
              );
            },
            headerStyle: chatStackStyle.header,
          }}
        />
      </ChatStack.Navigator>
    );
  }
}

const mapStateToProps = state => ({
  authenticateUser: state.authReducer.authenticateUser,
});

export const ChatStackNavigator = connect(
  mapStateToProps,
  null,
)(ChatStackNav);

const chatStackStyle = StyleSheet.create({
  userName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  settingsView: {
    flex: 1,
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkorange',
    backgroundColor: 'white',
  },
  deleteMatchText: {
    color: 'darkorange',
  },
  backwardTabButton: {
    margin: 10,
  },
  settingsIcon: {
    margin: 10,
  },
  gearTabButton: {
    margin: 10,
  },
  header: {
    backgroundColor: 'darkorange',
  },
});
