import React, {useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Match} from '../components/Match.js';
import Carousel from 'react-native-anchor-carousel';
import routes from 'res/routes';

const {windowHeight} = Dimensions.get('window').height;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a3bb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd93211aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145573111e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a112bb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91a2121a97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455731231231e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a4324213bb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91243531425aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557156457547e29d72',
    title: 'Third Item',
  },
];

export class MatchLobby extends React.Component {
  constructor(props) {
    super(props);
  }
  onMatchPressed = () => {
    this.props.navigation.navigate('ChatStack', {screen: 'Chat'});
  };

  render() {
    return (
      <View style={matchLobbyStyle.View}>
        <View style={matchLobbyStyle.topMatchesContainer}>
          <Carousel
            data={DATA}
            renderItem={() => (
              <Match
                onPress={this.onMatchPressed}
                navigation={this.props.navigation}
                iconSize={130}
                size={400}
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
        <Text style={matchLobbyStyle.newMatchesHeader}>New Matches</Text>
        <View style={matchLobbyStyle.bottomMatchesContainer}>
          <Carousel
            data={DATA}
            renderItem={(item, index, separators) => (
              <Match onPress={this.onMatchPressed} iconSize={80} size={200} />
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
  Logo: {width: 200, height: 200, resizeMode: 'contain'},
  newMatchesHeader: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  Description: {fontSize: 20},
});
