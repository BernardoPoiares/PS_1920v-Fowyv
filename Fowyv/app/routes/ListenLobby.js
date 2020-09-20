import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  PanResponder,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {ListenUser} from '../components/ListenUser';
import {ModalMatchMessage} from '../components/ModalMatchMessage';
import {ListenLobbyIcon} from '../components/ListenLobbyIcon';
import {searchUsers} from '../redux/actions/userFunctionalities.actions.js';
import {
  likedUser,
  dislikedUser,
} from '../redux/actions/userFunctionalities.actions.js';

import {GetAge} from '../utils/DatesUtil';

const WINDOW_WIDTH = Math.round(Dimensions.get('window').width);
const WINDOW_HEIGTH = Math.round(Dimensions.get('window').height);

export class ListenLobbyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:
        this.props.usersFound !== undefined && this.props.usersFound.length > 0
          ? {
              email: props.usersFound[0].email,
              name: props.usersFound[0].name + ' ',
              age: props.usersFound[0].age,
              audioFile: props.usersFound[0].audioFile,
            }
          : null,
    };
    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 2],
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
    this.volumeUpOpacity = this.position.x.interpolate({
      inputRange: [-WINDOW_WIDTH / 5, 0, WINDOW_WIDTH / 5],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    this.volumeMuteOpacity = this.position.x.interpolate({
      inputRange: [-WINDOW_WIDTH / 5, 0, WINDOW_WIDTH / 5],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          Animated.spring(this.position, {
            toValue: {x: WINDOW_WIDTH + 100, y: gestureState.dy},
          }).start(async () => {
            await this.onSwipeRight();
            this.position.setValue({x: 0, y: 0});
          });
        } else if (gestureState.dx < -100) {
          Animated.spring(this.position, {
            toValue: {x: -WINDOW_WIDTH - 100, y: gestureState.dy},
          }).start(async () => {
            await this.onSwipeLeft();
            this.position.setValue({x: 0, y: 0});
          });
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 10,
          }).start();
        }
      },
    });
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      if (
        this.props.usersFound === undefined ||
        this.props.usersFound === null ||
        (this.props.usersFound && this.props.usersFound.length <= 0)
      ) {
        this.props.dispatch(
          searchUsers({token: this.props.authenticatedUser.token}),
        );
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.usersFound &&
      nextProps.usersFound.length > 0 &&
      (nextState.currentUser === null ||
        (nextState.currentUser &&
          nextProps.usersFound[0].email !== nextState.currentUser.email))
    ) {
      this.setState({
        currentUser: {
          email: nextProps.usersFound[0].email,
          name: nextProps.usersFound[0].name + ' ',
          age: nextProps.usersFound[0].age,
          audioFile: nextProps.usersFound[0].audioFile,
        },
      });
    } else if (
      nextState.currentUser !== null &&
      (!nextProps.usersFound ||
        (nextProps.usersFound && nextProps.usersFound.length <= 0))
    ) {
      this.setState({
        currentUser: null,
      });
    }
    return true;
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  onSwipeRight = async () => {
    await this.props.dispatch(
      likedUser({
        token: this.props.authenticatedUser.token,
        user: this.props.usersFound[0].email,
        userName: this.props.usersFound[0].name,
      }),
    );
  };
  onSwipeLeft = async () => {
    await this.props.dispatch(
      dislikedUser({
        user: this.props.usersFound[0].email,
      }),
    );
  };

  areMoreUsers = () => {
    return this.state.currentUser !== null;
  };

  render() {
    return (
      <View style={listenLobbyStyle.View}>
        <ModalMatchMessage navigation={this.props.navigation} />
        {this.areMoreUsers() ? (
          <View>
            <ListenLobbyIcon
              name="volume-mute"
              containerStyle={StyleSheet.compose(
                {
                  opacity: this.volumeMuteOpacity,
                },
                listenLobbyStyle.volumeMuteIconContainer,
              )}
            />
            <ListenLobbyIcon
              name="volume-up"
              containerStyle={StyleSheet.compose(
                {
                  opacity: this.volumeUpOpacity,
                },
                listenLobbyStyle.volumeUpIconContainer,
              )}
            />
            <Animated.View
              {...this.PanResponder.panHandlers}
              style={[this.rotateAndTranslate]}>
              <ListenUser
                name={this.state.currentUser.name}
                age={GetAge(this.state.currentUser.age)}
                audioFile={this.state.currentUser.audioFile}
              />
            </Animated.View>
          </View>
        ) : (
          <View style={listenLobbyStyle.noUsersContainer}>
            <Text style={listenLobbyStyle.noUsersText}>
              {'No more users \n Check later'}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authenticatedUser: state.authReducer.authenticateUser,
  usersFound: state.userFunctionalities.searchUsers.users,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const ListenLobby = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListenLobbyComponent);

const listenLobbyStyle = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  muteIconContainer: {
    position: 'absolute',
    top: WINDOW_HEIGTH / 2,
    left: 10,
    zIndex: 1000,
  },
  icon: {
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'white',
    padding: 10,
  },
  volumeMuteIconContainer: {
    position: 'absolute',
    top: WINDOW_HEIGTH / 2,
    left: 10,
    zIndex: 1000,
  },
  volumeUpIconContainer: {
    position: 'absolute',
    top: WINDOW_HEIGTH / 2,
    right: 10,
    zIndex: 1000,
  },
  noUsersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noUsersText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
});
