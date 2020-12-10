import { Container, Header, QuickView } from '@components';
import { Color } from '@themes/Theme';
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
              <QuickView center backgroundColor="'rgba(220,47,48,0.2)'" width={100} height={100} borderRadius={50}>
                <QuickView center backgroundColor="'rgba(220,47,48,0.8)'" width={50} height={50} borderRadius={25}>
                  <Icon color={Color.white} name="home" type="antdesign" />
                </QuickView>
              </QuickView>
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
