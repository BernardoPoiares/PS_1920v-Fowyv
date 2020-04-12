import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('window').height;

export class Match extends React.Component {
  constructor(props) {
    super(props);
  }

  checkPosition = evt => {
    const layout = evt.nativeEvent.layout;
    console.log('height:', layout.height);
    console.log('width:', layout.width);
    console.log('x:', layout.x);
    console.log('y:', layout.y);
  };

  render() {
    return (
      <TouchableOpacity
        onViewableItemsChanged={this.onViewableItemsChanged}
        style={StyleSheet.compose(
          matchStyle.container,
          {
            height: this.props.size,
          },
        )}
        onLayout={this.checkPosition}>
        <Icon name="md-play-circle" size={this.props.iconSize} color="white" />
        <Text>Name</Text>
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
