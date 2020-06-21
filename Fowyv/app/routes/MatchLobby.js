import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import {Match} from '../components/Match.js';
import Carousel from 'react-native-anchor-carousel';
import {searchUserMatches} from '../redux/actions/userMatches.actions.js';

const {windowHeight} = Dimensions.get('window').height;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a3bb28ba',
    name: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd93211aa97f63',
    name: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145573111e29d72',
    name: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a112bb28ba',
    name: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91a2121a97f63',
    name: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455731231231e29d72',
    name: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a4324213bb28ba',
    name: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91243531425aa97f63',
    name: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557156457547e29d72',
    name: 'Third Item',
  },
];

export class MatchLobbyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  onMatchPressed = () => {
    this.props.navigation.navigate('ChatStack', {screen: 'Chat'});
  };

  UNSAFE_componentWillMount() {
    this.props.dispatch(
      searchUserMatches({token: this.props.authenticatedUser.token}),
    );
  }

  render() {
    return (
      <View style={matchLobbyStyle.View}>
        <View style={matchLobbyStyle.topMatchesContainer}>
          {this.props.userMatches ? (
            <Carousel
              data={this.props.userMatches}
              renderItem={({item}) => (
                <Match
                  onPress={this.onMatchPressed}
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
                No Matches{' '}
              </Text>
            </View>
          )}
        </View>
        <Text style={matchLobbyStyle.newMatchesHeader}>New Matches</Text>
        <View style={matchLobbyStyle.bottomMatchesContainer}>
          <Carousel
            data={DATA}
            renderItem={({item}, index, separators) => (
              <Match
                onPress={this.onMatchPressed}
                iconSize={80}
                size={200}
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
