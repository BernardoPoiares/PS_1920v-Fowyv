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
      this.props.userMatches != undefined && this.props.userMatches.length > 0
    );
  };

  render() {
    return (
      <View style={matchLobbyStyle.View}>
        <View style={matchLobbyStyle.topMatchesContainer}>
          {false ? (
            <Carousel
              data={this.props.userMatches}
              renderItem={({item}) => (
                <Match
                  onPress={this.onMatchPressed(item.email, item.name)}
                  navigation={this.props.navigation}
                  iconSize={130}
                  size={400}
                  name={item.name}
                />
              )}
              itemWidth={Dimensions.get('window').width / 3}
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
          {this.areMatches() ? (
            <Carousel
              data={this.props.userMatches}
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

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
  userMatches: state.userMatches.userMatches.users,
});

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
