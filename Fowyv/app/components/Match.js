import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class Match extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={StyleSheet.compose(
          matchStyle.container,
          {
            height: this.props.size,
          },
        )}
        onPress={this.props.onPress}>
        <Icon name="md-play-circle" size={this.props.iconSize} color="white" />
        <Text>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const matchStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
