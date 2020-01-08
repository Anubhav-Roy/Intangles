import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
const data = require('../src/assets/data.json');

export default class extends Component {
  state = {
    dataPoint: 0,
    coordinate: {
      latitude: data[0].loc.coordinates[0],
      longitude: data[0].loc.coordinates[1],
    },
    hd: data[0].hd,
    coordinates: [
      {
        latitude: data[0].loc.coordinates[0],
        longitude: data[0].loc.coordinates[1],
      },
    ],
  };

  locationUpdater;

  componentDidMount = () => {
    this.locationUpdater = setInterval(() => {
      let coordinates = [...this.state.coordinates];
      const newCoordinate = {
        latitude: data[this.state.dataPoint + 1].loc.coordinates[0],
        longitude: data[this.state.dataPoint + 1].loc.coordinates[1],
      };

      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
      }

      coordinates.push(newCoordinate);

      if (data[this.state.dataPoint + 1].hd)
        this.setState(prev => {
          return {
            dataPoint: prev.dataPoint + 1,
            coordinate: newCoordinate,
            coordinates: coordinates,
            hd: data[this.state.dataPoint + 1].hd,
          };
        });
      else
        this.setState(prev => {
          return {
            dataPoint: prev.dataPoint + 1,
            coordinate: newCoordinate,
            coordinates: coordinates,
          };
        });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.locationUpdater);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.coordinate.latitude,
            longitude: this.state.coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            style={styles.marker}
            rotation={180 + this.state.hd}
            image={require('../src/assets/bus_icon.png')}
          />
          <Polyline
            coordinates={this.state.coordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider }
            strokeWidth={6}
          />
        </MapView>
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
  marker: {
    height: 20,
    width: 20,
  },
});
