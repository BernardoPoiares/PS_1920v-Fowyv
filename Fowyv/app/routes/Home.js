import React from 'react';
import {Image, Text, View} from 'react-native';

export class Home extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center',backgroundColor: 'orange'}}>
        <Image style={{ width: 180, height: 180 , resizeMode: 'contain' }} source={require('../assets/images/logo.png')} />
        <Text style={{ fontSize:50, fontWeight:'bold', color:'white'}}>FOWYV</Text>
        <Text style={{fontSize:20,}}>find others with your voice</Text>
      </View>
    );
  }
}
