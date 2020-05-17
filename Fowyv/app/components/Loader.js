import React from 'react';
import {View, Modal, StatusBar, StyleSheet} from 'react-native';
import {DoubleBounce} from 'react-native-loader';

export class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        statusBarTranslucent={true}>
        <View style={loaderStyle.container}>
          <StatusBar backgroundColor={'rgba(0,0,0,0.4)'} />
          <DoubleBounce size={30} color="#ff8c00" />
        </View>
      </Modal>
    );
  }
}

const loaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99,
  },
});
