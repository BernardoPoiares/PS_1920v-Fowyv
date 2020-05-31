import React from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {ListenUser} from '../components/ListenUser';

const data = [
  {id: 'a@a.a', name: 'Jessica', age: 23},
  {id: 'a2@a.a', name: 'Telma', age: 30},
  {id: 'a3@a.a', name: 'Andreia', age: 21},
];

export class ListenLobby extends React.Component {
  constructor(props) {
    super(props);
  }

  LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={{transform: [{scale: scale}]}}>
        <ListenUser name={data[0].name} age={data[0].age} />
      </Animated.View>
    );
  };

  RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={{transform: [{scale: scale}]}}>
        <ListenUser name={data[0].name} age={data[0].age} />
      </Animated.View>
    );
  };
  render() {
    return (
      <View style={listenLobbyStyle.View}>
        <Swipeable
          containerStyle={listenLobbyStyle.SwipeableContainer}
          childrenContainerStyle={listenLobbyStyle.SwipeableItemContainer}
          renderLeftActions={this.LeftActions}
          renderRightActions={this.RightActions}>
          <ListenUser name={data[1].name} age={data[1].age} />
        </Swipeable>
      </View>
    );
  }
}

const listenLobbyStyle = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  SwipeableContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  SwipeableItemContainer: {
    flex: 1,
  },
});
