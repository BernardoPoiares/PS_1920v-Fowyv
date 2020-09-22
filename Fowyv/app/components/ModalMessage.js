import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {clearError} from '../redux/actions/global.actions';

class ModalMessageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onOkPressed = () => {
    this.props.dispatch(clearError());
  };

  render() {
    if (this.props.error != null) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.error != null}
          statusBarTranslucent={true}>
          <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
          <View style={modalMessageStyle.view}>
            <View style={modalMessageStyle.container}>
              <View style={modalMessageStyle.messageContainer}>
                <Text style={modalMessageStyle.messageHeader}>Error </Text>
                <Text style={modalMessageStyle.message}>
                  {this.props.error.message}
                </Text>
              </View>
              <View style={modalMessageStyle.buttonsContainer}>
                <TouchableOpacity
                  style={modalMessageStyle.bottomButton}
                  onPress={this.onOkPressed}>
                  <Text>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  error: state.globalReducer.globalState.error,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const ModalMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalMessageComponent);

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
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  messageHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  message: {
    fontSize: 20,
    color: 'black',
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
