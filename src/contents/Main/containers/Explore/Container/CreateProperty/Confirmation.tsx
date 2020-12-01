/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Body, Text, QuickView, Button,
} from '@components';
import { Input } from 'react-native-elements';
import { Color } from '@themes/Theme';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
import { pushPayloadProperty } from '../../redux/slice';

interface Props {
  goNextPage: () => any;
  pushData: (data: any) => any;
}
class Confirmation extends PureComponent<Props> {
  render() {
    return (
      <Body>
        <QuickView flex={1}>
          <Text type="title">Xác nhận</Text>
          <Input
            containerStyle={{ paddingHorizontal: 0, marginTop: 10 }}
            inputContainerStyle={{
              borderColor: Color.black,
            }}
            label="Số điện thoại"
            labelStyle={{
              color: lightComponentColor.textColor,
              fontWeight: 'normal',
            }}
            placeholder="Nhập số điện thoại của bạn"
          />
          <Input
            containerStyle={{ paddingHorizontal: 0, marginTop: 10 }}
            inputContainerStyle={{
              borderColor: Color.black,
            }}
            label="Tiêu đề bài đăng"
            labelStyle={{
              color: lightComponentColor.textColor,
              fontWeight: 'normal',
            }}
            placeholder="Ví dụ: 244/21"
          />
          <Input
            containerStyle={{ paddingHorizontal: 0, marginTop: 10 }}
            inputContainerStyle={{
              borderColor: Color.black,
            }}
            label="Nội dung mô tả"
            labelStyle={{
              color: lightComponentColor.textColor,
              fontWeight: 'normal',
            }}
            placeholder="Môi trường sống văn hóa, sạch sẽ ..."
          />
        </QuickView>
        <Button title="Đăng phòng" outline />
      </Body>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  pushData: (data: any) => dispatch(pushPayloadProperty({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
