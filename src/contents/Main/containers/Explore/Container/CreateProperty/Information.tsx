/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView,
  ListCheckBox,
  Text,
  Input,
  Body,
  Button,
} from '@components';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { CheckBox } from 'react-native-elements';
import { KeyboardAvoidingView, Platform } from 'react-native';
import _ from 'lodash';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { pushPayloadProperty } from '../../redux/slice';
import { payloadPropertySelector } from '../../redux/selector';

const datas = [
  { id: 1, name: 'Phòng cho thuê' },
  { id: 2, name: 'Phòng ở ghép' },
  { id: 3, name: 'Căn hộ' },
  { id: 4, name: 'Nhà nguyên căn' },

];
interface Props {
  goNextPage: () => any;
  pushData: (data: any) => any;
  dataPost: any;
}
interface State {
  parking: boolean;
  freeElectricity: boolean;
  freeWater: boolean;
  freeInternet: boolean;
  freeParking: boolean;
  checkNull: Array<string>;
  category: number;
}
class Information extends PureComponent<Props, State> {
  private electricity: any;

  private water: any;

  private internet: any;

  private parking: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      parking: false,
      freeElectricity: false,
      freeWater: false,
      freeInternet: false,
      freeParking: false,
      checkNull: [],
      category: 1,
    };
  }

  handleData = () => {
    const {
      freeElectricity, freeWater, freeInternet, freeParking, parking, category,
    } = this.state;

    const { goNextPage, pushData } = this.props;
    let electricity = this.electricity.getText();
    let water = this.water.getText();
    let internet = this.internet.getText();
    let parkingFee = null;
    const checkNull = [];
    if (!freeElectricity) {
      if (!this.electricity.getText()) {
        checkNull.push('electricity');
      }
    }
    if (!freeWater) {
      if (!this.water.getText()) {
        checkNull.push('water');
      }
    }
    if (!freeInternet) {
      if (!this.internet.getText()) {
        checkNull.push('internet');
      }
    }

    if (freeElectricity) {
      electricity = '0';
    }
    if (freeWater) {
      water = '0';
    }
    if (freeInternet) {
      internet = '0';
    }
    if (parking) {
      parkingFee = this.parking.getText();
      if (!this.parking.getText()) {
        checkNull.push('parking');
      }
      if (freeParking) {
        parkingFee = '0';
      }
    }
    console.log('🚀 ~ file: Information.tsx ~ line 97 ~ Information ~ checkNull', checkNull);

    this.setState({ checkNull });
    if (_.isEmpty(checkNull)) {
      pushData({
        categoryId: category,
        policy: {
          electricity, water, internet, parkingFee,
        },
      });
      goNextPage();
    }

    // goNextPage();
  };

  render() {
    const {
      parking,
      freeElectricity,
      freeWater,
      freeInternet,
      freeParking,
      checkNull,
      category,
    } = this.state;
    const { goNextPage, dataPost } = this.props;
    console.log('🚀 ~ file: Information.tsx ~ line 122 ~ Information ~ render ~ dataPost', dataPost);
    const hasErrors = (key: any) => (checkNull.includes(key) ? { borderColor: 'red', borderWidth: 1 } : null);
    return (

      <Body scroll fullWidth showsVerticalScrollIndicator={false}>
        {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
        <Text marginTop={10} type="title">
          Thông tin phòng
        </Text>
        <Text marginTop={10}>Loại phòng</Text>
        <ListCheckBox
          data={datas}
          single
          onChange={(value:number) => this.setState({ category: value })}
          checkBoxProps={{ checkedColor: lightPrimaryColor }}
          defaultValue={[1]}
        />
        <Text marginTop={10} type="title">
          Chi phí
        </Text>
        {/* Giá cho thuê */}
        {/* <Text marginVertical={10}>Giá cho thuê</Text>
        <QuickView row>
          <Input containerStyle={{ flex: 2 }} keyboardType="numeric" />
          <QuickView justifyContent="center" alignItems="flex-end" flex={1}>
            <Text>VND/phòng</Text>
          </QuickView>
        </QuickView> */}
        {/* Tiền điện */}
        <Text marginVertical={10}>Tiền điện</Text>
        <QuickView row>
          <Input
            // inputStyle={{ backgroundColor: 'white' }}
            validationField="empty"
            placeholder="Nhập số tiền"
            errorMessage="Vui lòng nhập số tiền"
            ref={(ref: any) => { this.electricity = ref; }}
            disabled={freeElectricity}
            containerStyle={{
              flex: 1,
              ...hasErrors('electricity'),
            }}
            keyboardType="numeric"
          />
          <QuickView justifyContent="center" alignItems="flex-end" flex={0.3}>
            <Text>VND</Text>
          </QuickView>
          <QuickView
            // justifyContent="center"
            alignItems="flex-end"
            flex={1}
          >
            <CheckBox
              containerStyle={{
                flex: 1,
                borderWidth: 0,
                margin: 0,
                marginLeft: 10,
              }}
              checkedColor={lightPrimaryColor}
              title="Miễn phí"
              checked={freeElectricity}
              onPress={() => {
                this.setState({ freeElectricity: !freeElectricity, checkNull: checkNull.filter((c) => c !== 'electricity') });
                this.electricity.toggleErrorInput();
              }}
            />
          </QuickView>
        </QuickView>
        {/* Tiền nước */}
        <Text marginVertical={10}>Tiền nước</Text>
        <QuickView row>
          <Input
            validationField="empty"
            placeholder="Nhập số tiền"
            errorMessage="Vui lòng nhập số tiền"
            ref={(ref: any) => { this.water = ref; }}
            disabled={freeWater}
            containerStyle={{ flex: 1, ...hasErrors('water') }}
            keyboardType="numeric"
          />
          <QuickView justifyContent="center" alignItems="flex-end" flex={0.3}>
            <Text>VND</Text>
          </QuickView>
          <QuickView
            // justifyContent="center"
            alignItems="flex-end"
            flex={1}
          >
            <CheckBox
              containerStyle={{
                flex: 1,
                borderWidth: 0,
                margin: 0,
                marginLeft: 10,
              }}
              checkedColor={lightPrimaryColor}
              title="Miễn phí"
              checked={freeWater}
              onPress={() => {
                this.setState({ freeWater: !freeWater, checkNull: checkNull.filter((c) => c !== 'water') });
                this.water.toggleErrorInput();
              }}
            />
          </QuickView>
        </QuickView>
        {/* Internet */}
        <Text marginVertical={10}>Internet</Text>
        <QuickView row>
          <Input
            validationField="empty"
            placeholder="Nhập số tiền"
            errorMessage="Vui lòng nhập số tiền"
            ref={(ref: any) => { this.internet = ref; }}
            disabled={freeInternet}
            containerStyle={{ flex: 1, ...hasErrors('internet') }}
            keyboardType="numeric"
          />
          <QuickView justifyContent="center" alignItems="flex-end" flex={0.3}>
            <Text>VND</Text>
          </QuickView>
          <QuickView
            // justifyContent="center"
            alignItems="flex-end"
            flex={1}
          >
            <CheckBox
              containerStyle={{
                flex: 1,
                borderWidth: 0,
                margin: 0,
                marginLeft: 10,
              }}
              checkedColor={lightPrimaryColor}
              title="Miễn phí"
              checked={freeInternet}
              onPress={() => {
                this.setState({ freeInternet: !freeInternet, checkNull: checkNull.filter((c) => c !== 'internet') });
                this.internet.toggleErrorInput();
              }}
            />
          </QuickView>
        </QuickView>
        {/* Chỗ để xe */}
        <QuickView>
          <CheckBox
            containerStyle={{
              borderWidth: 0,
              marginLeft: 0,
              paddingLeft: 0,
              marginTop: 10,
            }}
            checkedColor={lightPrimaryColor}
            title="Có chỗ để xe"
            checked={parking}
            onPress={() => this.setState({ parking: !parking })}
          />
          {parking ? (
            <QuickView>
              <Text marginLeft={30} marginVertical={10}>
                Phí giữ xe
              </Text>
              <QuickView marginLeft={30} row>
                <Input
                  validationField="empty"
                  placeholder="Nhập số tiền"
                  errorMessage="Vui lòng nhập số tiền"
                  ref={(ref: any) => { this.parking = ref; }}
                  disabled={freeParking}
                  containerStyle={{ flex: 1, ...hasErrors('parking') }}
                  keyboardType="numeric"
                />
                <QuickView
                  justifyContent="center"
                  alignItems="flex-end"
                  flex={0.3}
                >
                  <Text>VND</Text>
                </QuickView>
                <QuickView
                  // justifyContent="center"
                  alignItems="flex-end"
                  flex={1}
                >
                  <CheckBox
                    containerStyle={{
                      flex: 1,
                      borderWidth: 0,
                      margin: 0,
                      marginLeft: 10,
                    }}
                    checkedColor={lightPrimaryColor}
                    title="Miễn phí"
                    checked={freeParking}
                    onPress={() => {
                      this.setState({ freeParking: !freeParking, checkNull: checkNull.filter((c) => c !== 'parking') });
                      this.parking.toggleErrorInput();
                    }}
                  />
                </QuickView>
              </QuickView>
            </QuickView>
          ) : null}
        </QuickView>
        <Button title="Tiếp theo" outline onPress={this.handleData} />
        {/* </KeyboardAvoidingView> */}
      </Body>

    );
  }
}

const mapStateToProps = (state: any) => ({
  dataPost: state.main.explore.toJS().payloadProperty,
});
const mapDispatchToProps = (dispatch: any) => ({
  pushData: (data: any) => dispatch(pushPayloadProperty({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Information);
