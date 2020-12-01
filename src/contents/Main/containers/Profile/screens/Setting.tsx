import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body,
} from '@components';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import PickerChangeLanguage from '@contents/Config/Shared/PickerChangeLanguage';

class Setting extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="SettingScreen" />
        <Body>
          <QuickView>
            <Text center>Setting Screen</Text>
          </QuickView>
          {/* <SwitchChangeTheme />
          <PickerChangeLanguage /> */}
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
