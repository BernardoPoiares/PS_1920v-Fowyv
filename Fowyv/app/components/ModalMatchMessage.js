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
import {clearMatch} from '../redux/actions/userFunctionalities.actions';

class ModalMatchMessageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onBackPressed = () => {
    this.props.dispatch(clearMatch());
  };

  onChatPressed = () => {
    this.props.dispatch(clearMatch()).then(() =>
      this.props.navigation.navigate('ChatStack', {
        screen: 'Chat',
        params: {
          userMatch: this.props.match.email,
        },
        userName: this.props.match.name,
      }),
    );
  };

  render() {
    if (this.props.match != null) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.match != null}
          statusBarTranslucent={true}>
          <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
          <View style={personalAudioRecorderStyle.view}>
            <View style={personalAudioRecorderStyle.container}>
              <View style={personalAudioRecorderStyle.matchMessageContainer}>
                <Text style={personalAudioRecorderStyle.matchHeaderMessage}>
                  You matched! {' '}
                </Text>
                <Text style={personalAudioRecorderStyle.matchMessage}>
                  {this.props.match.name} wants to know you better too{' '}
                </Text>
              </View>
              <View style={personalAudioRecorderStyle.buttonsContainer}>
                <TouchableOpacity
                  style={personalAudioRecorderStyle.bottomButton}
                  onPress={this.onBackPressed}>
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={personalAudioRecorderStyle.bottomButton}
                  onPress={this.onChatPressed}>
                  <Text>Talk more</Text>
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
  match: state.userFunctionalities.searchUsers.match,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const ModalMatchMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalMatchMessageComponent);

const personalAudioRecorderStyle = StyleSheet.create({
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
  matchMessageContainer: {
    alignItems: 'center',
  },
  matchHeaderMessage: {fontSize: 40, fontWeight: 'bold', color: 'black'},
  matchMessage: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
