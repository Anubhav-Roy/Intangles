import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const data = require('../src/assets/data.json');

export default class extends Component {
  state = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  componentDidMount = () => {
    var counter = 0;

    // for (var singlePoint in data) {
    //   console.log(
    //     counter,
    //     ' ',
    //     data[counter].loc.coordinates[0],
    //     data[counter].loc.coordinates[1],
    //   );

    //   //   this.setState(prev => {
    //   //     return {
    //   //       latitude: data[counter].loc.coordinates[0],
    //   //       longitude: data[counter].loc.coordinates[1],
    //   //     };
    //   //   });

    //   counter++;
    // }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: data[0].loc.coordinates[0],
            longitude: data[0].loc.coordinates[1],
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
