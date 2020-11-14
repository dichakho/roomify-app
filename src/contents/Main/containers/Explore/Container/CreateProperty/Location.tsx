/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Body, Text, Button,
} from '@components';
import { Input } from 'react-native-elements';
import { Color } from '@themes/Theme';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
import SelectLocation from './SelectLocation';

interface Props {
  goNextPage: () => any;
}
interface State {
  goNextPage: () => any;
}
class Location extends PureComponent<Props, State> {
  render() {
    const { goNextPage } = this.props;
    return (
      <Body scroll fullWidth showsVerticalScrollIndicator={false}>
        <Text type="title" t="create_property:location" />
        <SelectLocation title="Thành phố" />
        <SelectLocation title="Quận" />
        <SelectLocation title="Phường/ Xã" />
        <Input
          containerStyle={{ paddingHorizontal: 0, marginTop: 10 }}
          inputContainerStyle={{
            borderColor: Color.black,
          }}
          label="Tên đường"
          labelStyle={{
            color: lightComponentColor.textColor,
            fontWeight: 'normal',
          }}
          placeholder="Ví dụ: Nguyễn Lương Bằng"
        />
        <Input
          containerStyle={{ paddingHorizontal: 0, marginTop: 10 }}
          inputContainerStyle={{
            borderColor: Color.black,
          }}
          label="Số nhà"
          labelStyle={{
            color: lightComponentColor.textColor,
            fontWeight: 'normal',
          }}
          placeholder="Ví dụ: 244/21"
        />
        <Button title="Tiếp theo" onPress={goNextPage} outline />
      </Body>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
