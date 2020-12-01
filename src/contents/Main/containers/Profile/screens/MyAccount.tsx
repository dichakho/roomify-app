import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body,
} from '@components';

class MyAccount extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="My Account" />
        <Body>
          <QuickView>
            <Text center>My Account Screen</Text>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
