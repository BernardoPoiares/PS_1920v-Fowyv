import React from 'react';
import {View, Modal, StatusBar, StyleSheet} from 'react-native';
import {DoubleBounce} from 'react-native-loader';
import {connect} from 'react-redux';

class LoaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isLoading}
          statusBarTranslucent={true}>
          <View style={loaderStyle.container}>
            <StatusBar backgroundColor={'rgba(0,0,0,0.4)'} />
            <DoubleBounce size={30} color="#ff8c00" />
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.globalReducer.globalState.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export const Loader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoaderComponent);

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
