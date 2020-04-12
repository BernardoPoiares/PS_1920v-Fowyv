import React, {useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Match} from '../components/Match.js';
import Carousel from 'react-native-anchor-carousel';

const {windowHeight} = Dimensions.get('window').height;

export class MatchLobby extends React.Component {
  constructor(props) {
    super(props);
  }
  DATA = [
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

  render() {
    return (
      <View style={matchLobbyStyle.View}>
        <View style={matchLobbyStyle.topMatchesContainer}>
          <Carousel
            data={this.DATA}
            renderItem={() => <Match iconSize={130} size={400} />}
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
            data={this.DATA}
            renderItem={(item, index, separators) => (
              <Match iconSize={80} size={200} />
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
/*


          /*<Carousel
          style={{flex: 1}}
          data={this.DATA}
          renderItem={() => <Match />}
          itemWidth={Dimensions.get('window').width/4}
          containerWidth={Dimensions.get('window').width-40}
          separatorWidth={30}
          inActiveScale= '0.1'
          ref={c => {
            this._carousel = c;
          }}
        />

        <Carousel
          style={{flex: 1, height: 100}}
          data={this.DATA}
          renderItem={separators => <Match highl={separators} />}
          itemWidth={Dimensions.get('window').width / 3}
          containerWidth={Dimensions.get('window').width}
          separatorWidth={5}
          ref={c => {
            this._carousel = c;
          }}



        <FlatList
          horizontal={true}
          data={this.DATA}
          renderItem={() => <Match />}
          k
          keyExtractor={item => item.id}
        />* */

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
