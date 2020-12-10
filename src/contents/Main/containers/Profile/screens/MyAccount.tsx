import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image,
} from '@components';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { TObjectRedux } from '@utils/redux';

interface Props {
  loginSelectorData: TObjectRedux;
}
class MyAccount extends PureComponent<Props> {
  render() {
    const { loginSelectorData: { data } } = this.props;
    return (
      <Container>
        <Header backIcon title="My Account" />
        <Body>
          <QuickView center>
            <Image height={100} width={100} source={{ uri: data?.avatar }} />
          </QuickView>
          <QuickView justifyContent="space-between" row>
            <Text>Fullname:</Text>
            <Text bold>{data?.fullName}</Text>
          </QuickView>
          <QuickView marginTop={10} justifyContent="space-between" row>
            <Text>Email:</Text>
            <Text bold>{data?.email}</Text>
          </QuickView>
          <QuickView marginTop={10} justifyContent="space-between" row>
            <Text>Phone:</Text>
            <Text bold>{data?.phone}</Text>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginSelectorData: parseObjectSelector(applyObjectSelector(loginSelector, state)),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
