/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import {
  Container,
  Header,
  QuickView,
  Body,
  Text,
  Dropdown,
  Image,
  Button,
} from '@components';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, FlatList as RNFlatList } from 'react-native';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { CategoryList } from '../Container/CategoryList';
import exploreStack from '../routes';

interface Props {
  t: any;
}
class ExploreScreen extends PureComponent<Props> {
  data = [
    {
      coverUrl:
        'https://s3-alpha-sig.figma.com/img/0f14/5640/1a7cb0f8a6af33580734b2403203ba82?Expires=1606089600&Signature=LWR~Qr61oAz1u6CcCV3D32YamgrT6gONsGXWNXENmWiYJYtSx8DMI0bayS~vJeB1hDHiJ3owRomLgrjJmfU1YzXras~jUKue0ThKuGfqzSJEBAW9j1cYcRUHo3aRCT4uUoB0A42P1so2u40f2h5k2lI8Ia7PfxdtVYQUugKx6CsfAi31N6Cc6410FuYkkEjREFTvT~IgP3PL87ZhKaRJbuTCJpy45w1DMfXs6-6HJyxLCnz~icSHB5p-cTTNILezf8QcN0JNzdmkMYPWDlP1IGoynLrPTvz-zi9VsirDc3qUUCdTvsRpTfjQQYbGcJYdPp17leEV1wVAazTiZrCbhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      price: 1000000,
      address: 'Thanh Khê',
      area: '60m2',
    },
    {
      coverUrl:
        'https://s3-alpha-sig.figma.com/img/e288/b09e/ae82c548c98a8f408db14dd7b20ba32c?Expires=1606089600&Signature=DDtcMskAXmH3ItSwKJRcwQj5QC8OzS0DDX5AG0MBm7JJeWqXviyXUyyVMPBMkYeXFkicRkeJ3bpWIoycRxPHqgAiq~WX9R-vC6vWvensx2zjIojZRcC~4jHIfZgZnCqojPPzxLWBk1DJt5FxGkODXPSfB6v1S4v4eCMvLL1OH1-SEuzUbU9rPU7t9e~-8dpbKrbuZJsNRnw7u-e8nTZiHNxW-bXaqmxeI7zu72b8QYceVrxaWp9M~MLUjwqLQPdmlTFiYSWTkBXhko2Pf7Ql3vN1UG4FFVNBh-UXnxDl3gQ2ARJW2N1Mu1Io7BM5vdYler6DAhzHpCcKApAvHKLK8A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      price: 800000,
      address: 'Liên Chiểu',
      area: '60m2',
    },
    {
      coverUrl:
        'https://s3-alpha-sig.figma.com/img/eb48/87a0/c4fa0f3907b14d0a3dbb91e7ca06cf1e?Expires=1606089600&Signature=AolM9N5z1TXDI2DWOqRMTFXRBMxKmmBVd3FTJyjQ1sJGEN8JIqP9zvdq79ygp~qB8x9efFBix1-s2eQuBtVaV~x8SowsEzi~ELTdKDmRCzB8cQ4anHoDiPucv~ikSf~Q3Q2h1zkcvP2rFIbHz3SPJCgltkscE3WlWkZhXhnjkvies6Umusv23YpplFBdLHunzIXKCENuKNtZLwCdfOzAbx51ApQSfVV1TCkcWBtfxSG~KeaYg0941Evu-zXPgKMzS0AM7P1JAg07RHdFqpW9szXsfn-dRp3olrOXyXV8r9fKSQkd0Jkqog~pNHGIzLwMyBkBxLQQa94-Z8qyZB7Qng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      price: 1000000,
      address: 'Hải Châu',
      area: '60m2',
    },
  ];

  dataDropdown = [
    {
      label: 'Đà Nẵng',
      value: '1',
    },
    {
      label: 'Hà Nội',
      value: '2',
    },
    {
      label: 'Thành phố Hồ Chí Minh',
      value: '3',
    },
  ];

  renderLeftComponent = () => (
    <QuickView row center style={{ borderWidth: 0 }}>
      <QuickView>
        <Icon
          name="map-pin"
          type="feather"
          color={lightPrimaryColor}
          size={22}
        />
      </QuickView>
      <QuickView marginLeft={10}>
        <Text fontSize="tiny" color="#B1ADAD">
          Location
        </Text>
        <Dropdown
          activeColor={lightPrimaryColor}
          data={this.dataDropdown}
          textStyle={{ fontSize: 14, color: '#363636' }}
          activeTextColor={Color.white}
          dropdownStyles={{
            width: 100,
            borderWidth: 1,
            backgroundColor: Color.grey,
            borderColor: Color.grey4,
          }}
          containerStyle={{
            width: 100,
            padding: 0,
            borderRadius: 22.5,
            borderColor: '#012066',
            backgroundColor: Color.white,
          }}
        />
      </QuickView>
    </QuickView>
  );

  renderRightComponent = () => (
    <QuickView
      padding={5}
      onPress={() => {
        NavigationService.navigate(rootStack.exploreStack, {
          screen: exploreStack.searchScreen,
        });
      }}
    >
      <Icon name="filter-outline" type="material-community" color="#000" />
    </QuickView>
  );

  render() {
    const { t } = this.props;

    return (
      <Container>
        <Header
          backgroundColor={Color.white}
          containerStyle={{ zIndex: 1000 }}
          placement="left"
          leftComponent={this.renderLeftComponent()}
          // rightComponent={this.renderRightComponent()}
          // backgroundColor={Color.white}
          // title={t('header:explore')}
          // color={lightPrimaryColor}
        />
        <Body marginBottom={20} scroll style={{ zIndex: 10 }}>
          <QuickView
            onPress={() => NavigationService.navigate(rootStack.exploreStack, {
              screen: exploreStack.searchScreen,
            })}
            row
            backgroundColor={Color.grey2}
            borderRadius={10}
            style={{ borderWidth: 1, borderColor: 'rgba(177, 173, 173, 0.2)' }}
            paddingHorizontal={15}
            paddingVertical={12}
          >
            <QuickView justifyContent="center" flex={1}>
              <Text fontSize="tiny">Search by Location, Area or Pin Code</Text>
            </QuickView>
            <QuickView>
              <Icon name="magnify" type="material-community" color="#B1ADAD" />
            </QuickView>
          </QuickView>

          <Button
            height={50}
            title="List your space, property"
            onPress={() => NavigationService.navigate(rootStack.exploreStack, {
              screen: exploreStack.createProperty,
            })}
          />
          <CategoryList
            categoryName="Phòng cho thuê"
            data={this.data}
            mode={1}
          />
          <CategoryList
            categoryName="Nhà nguyên căn"
            data={this.data}
            mode={2}
          />
          <CategoryList categoryName="Phòng ở ghép" data={this.data} mode={2} />
          <CategoryList categoryName="Căn hộ" data={this.data} mode={2} />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(ExploreScreen as any);
