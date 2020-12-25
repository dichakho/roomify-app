import {
  Avatar,
  Body, Button, Container, Header, QuickView, Text,
} from '@components';
import { Color } from '@themes/Theme';
import { convertPrice, vndPriceFormat } from '@utils/functions';
import { TObjectRedux, TQuery } from '@utils/redux';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import call from 'react-native-phone-call';
import { detailRoomateSelector } from '../../Saved/redux/selector';
import { roomateGetDetail } from '../../Saved/redux/slice';

interface State {
}
interface Props {
  t: any;
  navigation: any;
  getDetail: (id: number) => any;
  detail: TObjectRedux;
  route?: any;
}
class DetailRoomate extends PureComponent<Props, State> {
  componentDidMount() {
    const { route: { params: { id } }, getDetail } = this.props;
    getDetail(id);
  }

  handleCall = () => {
    const { detail: { data } } = this.props;
    const args = {
      number: data?.phone, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };

  render() {
    const { route: { params: { id } }, detail: { data } } = this.props;
    console.log('🚀 ~ file: DetailRoomate.tsx ~ line 29 ~ DetailRoomate ~ render ~ data', data);

    return (
      <Container>
        <Header backIcon title="Tìm người" />
        <Body>
          <QuickView center>
            <Avatar size="xlarge" source={{ uri: data?.user?.avatar }} />
          </QuickView>
          <QuickView marginTop={20}>
            <Text type="title" bold>{data?.user?.fullName}</Text>
            <QuickView style={{ borderBottomWidth: 1, borderColor: Color.grey3 }} paddingVertical={10} row justifyContent="space-between">
              <Text bold>Mức giá</Text>
              <Text>{vndPriceFormat(data?.price * 10)}</Text>
            </QuickView>
            <QuickView style={{ borderBottomWidth: 1, borderColor: Color.grey3 }} paddingVertical={10} row justifyContent="space-between">
              <Text bold>Địa chỉ</Text>
              <Text>{`${data?.destination?.parent?.name}, ${data?.destination?.parent?.parent?.name}`}</Text>
            </QuickView>
            <QuickView style={{ borderBottomWidth: 1, borderColor: Color.grey3 }} paddingVertical={10} row justifyContent="space-between">
              <QuickView flex={1}>
                <Text bold>Mô tả</Text>
              </QuickView>
              <QuickView flex={2}>
                <Text style={{ textAlign: 'right' }}>{data?.description}</Text>
              </QuickView>
            </QuickView>

          </QuickView>

          <Button onPress={this.handleCall} marginTop={20} title="Gọi điện thoại" />

        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: parseObjectSelector(applyObjectSelector(detailRoomateSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetail: (id: number) => dispatch(roomateGetDetail({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoomate);
