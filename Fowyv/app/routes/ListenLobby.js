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
import {ListenLobbyIcon} from '../components/ListenLobbyIcon';
import {searchUsers} from '../redux/actions/userFunctionalities.actions.js';
import {GetAge} from '../utils/DatesUtil';

const data = [
  {id: 'a@a.a', name: 'Jessica', age: 23},
  {id: 'a2@a.a', name: 'Telma', age: 30},
  {id: 'a3@a.a', name: 'Andreia', age: 21},
];

const WINDOW_WIDTH = Math.round(Dimensions.get('window').width);
const WINDOW_HEIGTH = Math.round(Dimensions.get('window').height);

export class ListenLobbyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
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
  }

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          Animated.spring(this.position, {
            toValue: {x: WINDOW_WIDTH + 100, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else if (gestureState.dx < -100) {
          Animated.spring(this.position, {
            toValue: {x: -WINDOW_WIDTH - 100, y: gestureState.dy},
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0});
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 10,
          }).start();
        }
      },
    });
    this.props.dispatch(
      searchUsers({token: this.props.authenticatedUser.token}),
    );
  }

  areMoreUsers = () => {
    return (
      this.props.usersFound != undefined && this.props.usersFound.length > 0
    );
  };

  render() {
    return (
      <View style={listenLobbyStyle.View}>
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
                name={this.props.usersFound[0].name}
                age={GetAge(this.props.usersFound[0].age)}
              />
            </Animated.View>
          </View>
        ) : (
          <Text />
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
});
