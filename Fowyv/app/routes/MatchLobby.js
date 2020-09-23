import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import {Match} from '../components/Match.js';
import Carousel from 'react-native-anchor-carousel';
import {searchUserMatches} from '../redux/actions/userMatches.actions.js';

export class MatchLobbyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  onMatchPressed = (email, name) => {
    return () => {
      this.props.navigation.navigate('ChatStack', {
        screen: 'Chat',
        params: {
          userMatch: email,
        },
        userName: name,
      });
    };
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      this.props.dispatch(
        searchUserMatches({token: this.props.authenticatedUser.token}),
      );
    });
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  areMatches = () => {
    return (
      this.props.userMatches !== undefined &&
      this.props.userMatches !== null &&
      this.props.userMatches.length > 0
    );
  };

  areNewMatches = () => {
    return (
      this.props.newUserMatches !== undefined &&
      this.props.userMatches !== null &&
      this.props.newUserMatches.length > 0
    );
  };

  render() {
    return (
      <View style={matchLobbyStyle.View}>
        <View style={matchLobbyStyle.topMatchesContainer}>
          {this.areMatches() ? (
            <Carousel
              data={this.props.userMatches}
              renderItem={({item}) => (
                <Match
                  onPress={this.onMatchPressed(item.email, item.name)}
                  iconSize={130}
                  size={400}
                  name={item.name}
                />
              )}
              itemWidth={Dimensions.get('window').width / 2}
              containerWidth={Dimensions.get('window').width}
              separatorWidth={15}
              inActiveOpacity={0.6}
              ref={c => {
                this._carousel = c;
              }}
            />
          ) : (
            <View style={matchLobbyStyle.noUsersContainer}>
              <Text
                style={matchLobbyStyle.noUsersText}
                textBreakStrategy="simple">
                {'No conversations \n'}
              </Text>
            </View>
          )}
        </View>
        <Text style={matchLobbyStyle.newMatchesHeader}>New Matches</Text>
        <View style={matchLobbyStyle.bottomMatchesContainer}>
          {this.areNewMatches() ? (
            <Carousel
              data={this.props.newUserMatches}
              renderItem={({item}, index, separators) => (
                <Match
                  onPress={this.onMatchPressed(item.email, item.name)}
                  iconSize={80}
                  size={200}
                  name={item.name}
                />
              )}
              itemWidth={Dimensions.get('window').width / 2}
              containerWidth={Dimensions.get('window').width}
              separatorWidth={15}
              inActiveOpacity={0.6}
              ref={c => {
                this._carousel = c;
              }}
            />
          ) : (
            <View style={matchLobbyStyle.noUsersContainer}>
              <Text
                style={matchLobbyStyle.noUsersText}
                textBreakStrategy="simple">
                {'No new matches \n'}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let oldMatches = null;
  let newMatches = null;
  if (
    state.messagesReducer.userMessages.matches !== undefined &&
    state.messagesReducer.userMessages.matches != null &&
    state.userMatches.userMatches.users !== undefined &&
    state.userMatches.userMatches.users != null
  ) {
    oldMatches = state.userMatches.userMatches.users.filter(user => {
      let match = state.messagesReducer.userMessages.matches.find(
        mat =>
          mat.emails.includes(user.email) &&
          mat.emails.includes(state.authReducer.authenticateUser.email),
      );
      return match !== undefined && match.messages.length > 0;
    });
    newMatches = state.userMatches.userMatches.users.filter(user => {
      let match = state.messagesReducer.userMessages.matches.find(
        mat =>
          mat.emails.includes(user.email) &&
          mat.emails.includes(state.authReducer.authenticateUser.email),
      );
      return match !== undefined && match.messages.length === 0;
    });
  }
  return {
    authenticatedUser: state.authReducer.authenticateUser,
    userMatches: oldMatches,
    newUserMatches: newMatches,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const MatchLobby = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchLobbyComponent);

const matchLobbyStyle = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  topMatchesContainer: {
    height: '60%',
  },
  bottomMatchesContainer: {
    height: '30%',
  },
  newMatchesHeader: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  noUsersContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noUsersText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
