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
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { CheckBox } from 'react-native-elements';

const data = [
  { id: 1, name: 'Phòng cho thuê' },
  { id: 2, name: 'Phòng ở ghép' },
  { id: 3, name: 'Nhà nguyên căn' },
  { id: 4, name: 'Căn hộ' },
];
interface Props {
  goNextPage: () => any;
}
interface State {
  parking: boolean;
  freeElectricity: boolean;
  freeWater: boolean;
  freeInternet: boolean;
  freeParking: boolean;
}
class Information extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      parking: false,
      freeElectricity: false,
      freeWater: false,
      freeInternet: false,
      freeParking: false,
    };
  }

  render() {
    const {
      parking,
      freeElectricity,
      freeWater,
      freeInternet,
      freeParking,
    } = this.state;
    const { goNextPage } = this.props;
    return (
      <Body scroll fullWidth showsVerticalScrollIndicator={false}>
        <Text marginTop={10} type="title">
          Thông tin phòng
        </Text>
        <Text marginTop={10}>Loại phòng</Text>
        <ListCheckBox
          data={data}
          single
          checkBoxProps={{ checkedColor: lightPrimaryColor }}
        />
        <Text marginTop={10} type="title">
          Chi phí
        </Text>
        {/* Giá cho thuê */}
        <Text marginVertical={10}>Giá cho thuê</Text>
        <QuickView row>
          <Input containerStyle={{ flex: 2 }} keyboardType="numeric" />
          <QuickView justifyContent="center" alignItems="flex-end" flex={1}>
            <Text>VND/phòng</Text>
          </QuickView>
        </QuickView>
        {/* Tiền điện */}
        <Text marginVertical={10}>Tiền điện</Text>
        <QuickView row>
          <Input
            disabled={freeElectricity}
            containerStyle={{ flex: 1 }}
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
              onPress={() => this.setState({ freeElectricity: !freeElectricity })}
            />
          </QuickView>
        </QuickView>
        {/* Tiền nước */}
        <Text marginVertical={10}>Tiền nước</Text>
        <QuickView row>
          <Input containerStyle={{ flex: 1 }} keyboardType="numeric" />
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
              onPress={() => this.setState({ freeWater: !freeWater })}
            />
          </QuickView>
        </QuickView>
        {/* Internet */}
        <Text marginVertical={10}>Internet</Text>
        <QuickView row>
          <Input containerStyle={{ flex: 1 }} keyboardType="numeric" />
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
              onPress={() => this.setState({ freeInternet: !freeInternet })}
            />
          </QuickView>
        </QuickView>
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
                <Input containerStyle={{ flex: 1 }} keyboardType="numeric" />
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
                    onPress={() => this.setState({ freeParking: !freeParking })}
                  />
                </QuickView>
              </QuickView>
            </QuickView>
          ) : null}
        </QuickView>
        <Button title="Tiếp theo" outline onPress={goNextPage} />
      </Body>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Information);
