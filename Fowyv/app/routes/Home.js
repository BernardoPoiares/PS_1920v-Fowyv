import React from 'react';
import {StatusBar} from 'react-native';
import {Image, Text, View, StyleSheet} from 'react-native';

export class Home extends React.Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <View style={homeStyle.View}>
        <StatusBar backgroundColor={'#ff8c00'} />
        <Image
          style={homeStyle.Logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={homeStyle.Name}>FOWYV </Text>
        <Text style={homeStyle.Description}>find others with your voice</Text>
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  Logo: {width: 200, height: 200, resizeMode: 'contain'},
  Name: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  Description: {fontSize: 20},
});
