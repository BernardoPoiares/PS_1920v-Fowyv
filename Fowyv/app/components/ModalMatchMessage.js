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
import {clearMatch} from '../redux/actions/auth.actions';

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
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.match != null}
        statusBarTranslucent={true}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View style={personalAudioRecorderStyle.view}>
          <View style={personalAudioRecorderStyle.container}>
            <View style={personalAudioRecorderStyle.recorderContainer}>
              <Text style={personalAudioRecorderStyle.matchMessage}>
                You matched!
              </Text>
              <Text style={personalAudioRecorderStyle.matchMessage}>
                {this.props.match.userName} wants to know you better too
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
  recorderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  recorderSemiContainer: {
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
