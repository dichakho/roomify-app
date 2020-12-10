/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Body, Text, QuickView, Button, Input as AppInput,
} from '@components';
import { Input } from 'react-native-elements';
import { Color } from '@themes/Theme';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
import _ from 'lodash';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { createProperty, pushPayloadProperty } from '../../redux/slice';
import { createPropertySelector } from '../../redux/selector';

interface Props {
  // goNextPage: () => any;
  pushData: (data: any) => any;
  dataPost: any;
  create: (data: any) => any;
  createPayload: TObjectRedux;
}
interface State {
  checkNull: Array<string>;
}
class Confirmation extends PureComponent<Props, State> {
  title: any;

  description: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      checkNull: [],
    };
  }

  handleData = () => {
    const { pushData, dataPost, create } = this.props;
    const checkNull = [];
    const title = this.title.getText();
    const description = this.description.getText();
    if (!title) {
      checkNull.push('title');
    }
    if (!description) {
      checkNull.push('description');
    }
    this.setState({ checkNull });
    if (_.isEmpty(checkNull)) {
      console.log('123');
      const payload = {
        ...dataPost,
        title,
        description,
      };
      create(payload);
      // pushData({
      //   title,
      //   description,
      // });
    }
  };

  render() {
    const { dataPost, createPayload } = this.props;
    const { checkNull } = this.state;
    console.log('dataPost', dataPost);
    console.log('createPayload', createPayload);

    const hasErrors = (key: any) => (checkNull.includes(key) ? { borderColor: 'red' } : null);
    return (
      <QuickView scroll flex={1} dismissKeyboard>
        <QuickView flex={1}>
          <Text type="title">Xác nhận</Text>
          {/* <Input
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
          /> */}
          <AppInput
            labelProps={{ marginTop: 20 }}
            inputStyle={{ fontSize: 16 }}
            ref={(ref: any) => { this.title = ref; }}
            containerStyle={{
              paddingHorizontal: 0,
              // marginBottom: 20,
              backgroundColor: Color.white,
              borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
            }}
            inputContainerStyle={{
              borderColor: Color.black,
              borderBottomWidth: 1,
              ...hasErrors('title'),
            }}
            label="Tiêu đề bài đăng"
            showLabel
            validationField="empty"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
            placeholder="Ví dụ: Nhà cho thuê đường Nguyễn Lương Bằng"
          />
          {/* <Input
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
          /> */}

          <AppInput
            labelProps={{ marginTop: 20 }}
            inputStyle={{ fontSize: 16 }}
            ref={(ref: any) => { this.description = ref; }}
            containerStyle={{
              paddingHorizontal: 0,
              // marginBottom: 20,
              backgroundColor: Color.white,
              borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
            }}
            inputContainerStyle={{
              borderColor: Color.black,
              borderBottomWidth: 1,
              ...hasErrors('description'),
            }}
            label="Nội dung mô tả"
            showLabel
            validationField="empty"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
            placeholder="Môi trường sống văn hóa, sạch sẽ ..."
          />
          {/* <Input
              multiline
              containerStyle={{ paddingHorizontal: 0, marginTop: 10, borderColor: 'red' }}
              inputContainerStyle={{
                borderColor: Color.black,
                ...hasErrors('description'),
              }}
              label="Nội dung mô tả"
              labelStyle={{
                color: lightComponentColor.textColor,
                fontWeight: 'normal',
              }}
              placeholder="Môi trường sống văn hóa, sạch sẽ ..."
            /> */}
          <QuickView flex={1} justifyContent="flex-end">
            <Button title="Đăng bài" outline onPress={this.handleData} />
          </QuickView>
        </QuickView>
        {/* <Button title="Đăng phòng" outline /> */}
        {/* <QuickView flex={1} justifyContent="flex-end">
            <Button title="Đăng phòng" outline />
          </QuickView> */}
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dataPost: state.main.explore.toJS().payloadProperty,
  createPayload: parseObjectSelector(applyObjectSelector(createPropertySelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  pushData: (data: any) => dispatch(pushPayloadProperty({ data })),
  create: (data: any) => dispatch(createProperty({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
