import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class ListenLobbyIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.View style={this.props.containerStyle}>
        <Icon
          name={this.props.name}
          size={50}
          color={'white'}
          style={this.props.icon}
        />
      </Animated.View>
    );
  }
}

const loaderStyle = StyleSheet.create({
  icon: {
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'white',
    padding: 10,
  },
});
