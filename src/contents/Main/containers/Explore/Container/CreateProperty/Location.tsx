/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Body, Text, Button, Input as AppInput,
} from '@components';
import { Input, Overlay } from 'react-native-elements';
import { Color } from '@themes/Theme';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { stringifyQuery, TArrayRedux } from '@utils/redux';
import _ from 'lodash';
import { get } from '@utils/api';
import SelectLocation from './SelectLocation';
import { districtGetList, pushPayloadProperty, subDistrictGetList } from '../../redux/slice';
import { cityListSelector, districtListSelector, subDistrictListSelector } from '../../redux/selector';

interface Props {
  goNextPage: () => any;
  pushData: (data: any) => any;
  city: TArrayRedux;
  getDistrict: (id: number) => any;
  getSubDistrict: (id: number) => any;
  district: TArrayRedux;
  subDistrict: TArrayRedux;
  dataPost: any;
}
interface State {
  // goNextPage: () => any;
  cityValue: number;
  districtValue: number | null;
  subDistrictValue: number | null;
  checkNull: Array<string>;
}
class Location extends PureComponent<Props, State> {
  street: any;

  numberHouse: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      cityValue: 1,
      districtValue: null,
      subDistrictValue: null,
      checkNull: [],
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // if (nextProps?.district?.data.length !== 0 && nextProps?.district?.data?.[0]?.id !== prevState.districtValue) {
    if (nextProps?.district?.data.length !== 0 && _.isNull(prevState.districtValue)) {
      nextProps.getSubDistrict(prevState.districtValue || nextProps?.district?.data?.[0]?.id);
      return {
        districtValue: nextProps?.district?.data?.[0]?.id,
      };
    }
    if (nextProps?.subDistrict?.data.length !== 0 && _.isNull(prevState.subDistrictValue)) {
      return {
        subDistrictValue: nextProps?.subDistrict?.data?.[0]?.id,
      };
    }
    return { ...prevState };
  }

  componentDidMount() {
    const { getDistrict, district, getSubDistrict } = this.props;
    const { cityValue } = this.state;
    getDistrict(cityValue);
  }

  handleOnChangeCity = (value: number) => {
    const { getDistrict } = this.props;
    this.setState({ cityValue: value });
    getDistrict(value);
  };

  handleOnChangeDistrict = (value: number) => {
    const { getSubDistrict } = this.props;
    this.setState({ districtValue: value });
    getSubDistrict(value);
  };

  handleOnChangeSubDistrict = (value: number) => {
    // const { getSubDistrict } = this.props;
    this.setState({ subDistrictValue: value });
    // getSubDistrict(value);
  };

  handleData = async () => {
    const { cityValue, districtValue, subDistrictValue } = this.state;
    const {
      goNextPage, pushData, city, district, subDistrict,
    } = this.props;
    console.log('!!!!!', cityValue, districtValue, subDistrictValue);
    console.log(' city.map((c) => c.id);', city?.data.filter((c: any) => c.id === cityValue));
    const checkNull = [];
    const street = this.street.getText();
    const numberHouse = this.numberHouse.getText();
    if (!street) {
      checkNull.push('street');
    }
    if (!numberHouse) {
      checkNull.push('numberHouse');
    }
    this.setState({ checkNull });
    if (_.isEmpty(checkNull)) {
      const fullAddress = `${numberHouse} ${street}, ${subDistrict?.data.filter((s: any) => s.id === subDistrictValue)[0]?.name}, ${district?.data.filter((d: any) => d.id === districtValue)[0]?.name}, ${city?.data.filter((c: any) => c.id === cityValue)[0]?.name}`;
      // console.log({
      //   destinationId: subDistrictValue,
      //   logtitude: 108.17969,
      //   latitude: 16.06375,
      //   address: `${numberHouse} ${street}`,

      // });

      const result = await get(`https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyCv45asCJthye8h1mrrDxl66PBzUnBcbzA&address=${encodeURI(`${fullAddress}`)}`);
      // console.log('🚀 ~ file: Location.tsx ~ line 112 ~ Location ~ handleData= ~ result', result);
      // console.log({
      //         destinationId: subDistrictValue,
      //         logtitude: 108.17969,
      //         latitude: 16.06375,
      //         address: `${numberHouse} ${street}`,

      //       });
      pushData({
        destinationId: subDistrictValue,
        logtitude: result.results[0].geometry.location.lng,
        latitude: result.results[0].geometry.location.lat,
        address: `${numberHouse} ${street}`,

      });
      goNextPage();
    }
    // goNextPage();
  };

  render() {
    const {
      goNextPage, city, district, subDistrict, dataPost,
    } = this.props;
    console.log('dataPost', dataPost);

    const { districtValue, cityValue, checkNull } = this.state;
    // console.log('cityValue', cityValue);
    // console.log('districtValue', districtValue);
    const hasErrors = (key: any) => (checkNull.includes(key) ? { borderColor: 'red' } : null);
    return (
      <Body scroll fullWidth showsVerticalScrollIndicator={false}>

        <Text type="title">
          Địa chỉ
        </Text>
        <SelectLocation
          onChange={this.handleOnChangeCity}
          data={city?.data}
          title="Thành phố"
        />
        <SelectLocation
          onChange={this.handleOnChangeDistrict}
          data={district?.data}
          title="Quận"
        />
        <SelectLocation
          onChange={this.handleOnChangeSubDistrict}
          data={subDistrict?.data}
          title="Phường/ Xã"
        />
        <AppInput
          labelProps={{ marginTop: 20 }}
          inputStyle={{ fontSize: 16 }}
          ref={(ref: any) => { this.street = ref; }}
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
            ...hasErrors('street'),
          }}
          label="Tên đường"
          showLabel
          validationField="empty"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
          placeholder="Ví dụ: Nguyễn Lương Bằng"
        />
        <AppInput
          labelProps={{ marginTop: 20 }}
          inputStyle={{ fontSize: 16 }}
          validationField="empty"
          ref={(ref: any) => { this.numberHouse = ref; }}
          containerStyle={{
            paddingHorizontal: 0,
            marginBottom: 20,
            backgroundColor: Color.white,
            borderWidth: 0,

            // borderBottomWidth: 1,
            // borderColor: 'red',
          }}
          inputContainerStyle={{
            borderColor: Color.black,
            borderBottomWidth: 1,
            ...hasErrors('numberHouse'),
          }}
          label="Số nhà"
          showLabel
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
          placeholder="Ví dụ: 244/21"
        />
        <Button title="Tiếp theo" onPress={this.handleData} outline />
      </Body>
    );
  }
}

const mapStateToProps = (state: any) => ({
  city: parseArraySelector(applyArraySelector(cityListSelector, state)),
  district: parseArraySelector(applyArraySelector(districtListSelector, state)),
  subDistrict: parseArraySelector(applyArraySelector(subDistrictListSelector, state)),
  dataPost: state.main.explore.toJS().payloadProperty,
});

const mapDispatchToProps = (dispatch: any) => ({
  pushData: (data: any) => dispatch(pushPayloadProperty({ data })),
  getDistrict: (id: number) => dispatch(districtGetList({ id })),
  getSubDistrict: (id: number) => dispatch(subDistrictGetList({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
