import { Container, Header } from '@components';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class MapDetailRoom extends PureComponent {
  render() {
    return (
      <Container>
        <Header title="Map" backIcon />
        <View style={{
          // ...StyleSheet.absoluteFillObject,
          // height: 400,
          // width: 400,
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        >
          <MapView
            style={{ ...StyleSheet.absoluteFillObject, borderRadius: 10 }}
            region={{
              latitude: 16.06375,
              longitude: 108.17969,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              // style={{ borderWidth: 1 }}
              // key={marker.name}
              // ref={(ref) => { markers[index] = ref; }}
                  // onPress={() => this.onMarkerPressed(marker, index)}
              coordinate={{
                latitude: 16.06375,
                longitude: 108.17969,
              }}
            >
              <Icon name="home" type="antdesign" />
            </Marker>
          </MapView>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MapDetailRoom);
