import React from 'react';
import {View, StyleSheet, Animated, Text, PanResponder} from 'react-native';

import {ListenUser} from '../components/ListenUser';

const data = [
  {id: 'a@a.a', name: 'Jessica', age: 23},
  {id: 'a2@a.a', name: 'Telma', age: 30},
  {id: 'a3@a.a', name: 'Andreia', age: 21},
];

export class ListenLobby extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-500 / 2, 0, 500 / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: 500 + 100, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: -500 - 100, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4,
          }).start();
        }
      },
    });
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

  areMoreUsers = () => {
    return data.length > 0;
  };

  render() {
    return (
      <View style={listenLobbyStyle.View}>
        {/*<Swipeable
          containerStyle={listenLobbyStyle.SwipeableContainer}
          childrenContainerStyle={listenLobbyStyle.SwipeableItemContainer}
          renderLeftActions={this.LeftActions}
          renderRightActions={this.RightActions}>
          <ListenUser name={data[1].name} age={data[1].age} />
        </Swipeable>*/}
        {this.areMoreUsers() ? (
          <Animated.View
            {...this.PanResponder.panHandlers}
            style={[
              this.rotateAndTranslate,
              {
                position: 'absolute',
                height: 500 - 120,
                width: 500,
                backgroundColor: 'red',
              },
            ]}>
            <ListenUser name={data[1].name} age={data[1].age} />
          </Animated.View>
        ) : (
          <Text />
        )}
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
