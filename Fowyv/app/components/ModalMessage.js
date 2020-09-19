import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';

export class ModalMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        statusBarTranslucent={true}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View style={modalMessageStyle.view}>
          <View style={modalMessageStyle.container}>
            <View style={modalMessageStyle.viewContainer}>
              <View style={modalMessageStyle.messageContainer}>
                <Text style={modalMessageStyle.message}>Hello</Text>
              </View>
              <TouchableOpacity
                style={modalMessageStyle.eraseButton}
                onPress={this.onErasePressed}>
                <Text>Erase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const modalMessageStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerHeader: {
    backgroundColor: 'white',
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  iconContainer: {alignSelf: 'center'},
  eraseButton: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'moccasin',
  },
  bottomButton: {
    borderWidth: 1,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
});
