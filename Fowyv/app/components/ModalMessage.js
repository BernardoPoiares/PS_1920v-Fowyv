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
import clearError from '../redux/actions/'

export class ModalMessageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onOkPressed = () => {
    this.props.dispatch(clearError());
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.errorMessage != null}
        statusBarTranslucent={true}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View style={modalMessageStyle.view}>
          <View style={modalMessageStyle.container}>
            <View style={modalMessageStyle.recorderContainer}>
              <Text style={modalMessageStyle.matchMessage}>
                {this.props.errorMessage}
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
  }
}

const mapStateToProps = state => ({
  errorMessage: state.globalReducer.error,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const ModalMatchMessage = connect(
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
