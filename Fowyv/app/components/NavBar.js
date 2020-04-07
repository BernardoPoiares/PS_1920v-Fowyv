import React from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {NavigationBar} from 'navigationbar-react-native';

const ComponentLeft = () => {
  return (
    <View style={{flex: 1, alignItems: 'flex-start'}}>
      <TouchableOpacity>
        <Text style={{color: 'white'}}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const ComponentCenter = () => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity>
        <Text style={{alignSelf: 'center', color: 'white'}}>Listen</Text>
      </TouchableOpacity>
    </View>
  );
};

const ComponentRight = () => {
  return (
    <View style={{flex: 1, alignItems: 'flex-end'}}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Lobby');
        }}>
        <Text style={{color: 'white'}}>Lobby</Text>
      </TouchableOpacity>
    </View>
  );
};

export class NavBar extends React.Component {
  render() {
    return (
      <View>
        <NavigationBar
          componentLeft={() => <ComponentLeft />}
          componentCenter={() => <ComponentCenter />}
          componentRight={() => <ComponentRight />}
          navigationBarStyle={{backgroundColor: '#215e79'}}
        />
      </View>
    );
  }
}
