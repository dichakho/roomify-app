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
import {
  TouchableOpacity, FlatList as RNFlatList, StatusBar, ActivityIndicator,
} from 'react-native';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { TArrayRedux, TQuery } from '@utils/redux';
import {
  applyArraySelector, applyObjectSelector, parseArraySelector, parseObjectSelector,
} from '@utils/selector';
import OverlayLoading from '@components/OverlayLoading';
import { CategoryList } from '../Container/CategoryList';
import exploreStack from '../routes';
import {
  categoryGetList, cityGetList, propertyGetList, setCityConfig,
} from '../redux/slice';
import { categorySelector, cityListSelector, propertyListSelector } from '../redux/selector';

interface Props {
  t: any;
  properties: TArrayRedux;
  getList: (query?: TQuery) => any;
  getCategory: (query?: TQuery) => any;
  categories: TArrayRedux;
  getCity: (query ?: TQuery) => any;
  city: TArrayRedux;
  cityConfig: any;
  setConfigCity: (data: any) => any;
}
class ExploreScreen extends PureComponent<Props> {
  category1: any;

  category2: any;

  category3: any;

  category4: any;
  // data = [
  //   {
  //     coverUrl:
  //       'https://s3-alpha-sig.figma.com/img/0f14/5640/1a7cb0f8a6af33580734b2403203ba82?Expires=1606089600&Signature=LWR~Qr61oAz1u6CcCV3D32YamgrT6gONsGXWNXENmWiYJYtSx8DMI0bayS~vJeB1hDHiJ3owRomLgrjJmfU1YzXras~jUKue0ThKuGfqzSJEBAW9j1cYcRUHo3aRCT4uUoB0A42P1so2u40f2h5k2lI8Ia7PfxdtVYQUugKx6CsfAi31N6Cc6410FuYkkEjREFTvT~IgP3PL87ZhKaRJbuTCJpy45w1DMfXs6-6HJyxLCnz~icSHB5p-cTTNILezf8QcN0JNzdmkMYPWDlP1IGoynLrPTvz-zi9VsirDc3qUUCdTvsRpTfjQQYbGcJYdPp17leEV1wVAazTiZrCbhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  //     price: 1000000,
  //     address: 'Thanh Khê',
  //     area: '60m2',
  //   },
  //   {
  //     coverUrl:
  //       'https://s3-alpha-sig.figma.com/img/e288/b09e/ae82c548c98a8f408db14dd7b20ba32c?Expires=1606089600&Signature=DDtcMskAXmH3ItSwKJRcwQj5QC8OzS0DDX5AG0MBm7JJeWqXviyXUyyVMPBMkYeXFkicRkeJ3bpWIoycRxPHqgAiq~WX9R-vC6vWvensx2zjIojZRcC~4jHIfZgZnCqojPPzxLWBk1DJt5FxGkODXPSfB6v1S4v4eCMvLL1OH1-SEuzUbU9rPU7t9e~-8dpbKrbuZJsNRnw7u-e8nTZiHNxW-bXaqmxeI7zu72b8QYceVrxaWp9M~MLUjwqLQPdmlTFiYSWTkBXhko2Pf7Ql3vN1UG4FFVNBh-UXnxDl3gQ2ARJW2N1Mu1Io7BM5vdYler6DAhzHpCcKApAvHKLK8A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  //     price: 800000,
  //     address: 'Liên Chiểu',
  //     area: '60m2',
  //   },
  //   {
  //     coverUrl:
  //       'https://s3-alpha-sig.figma.com/img/eb48/87a0/c4fa0f3907b14d0a3dbb91e7ca06cf1e?Expires=1606089600&Signature=AolM9N5z1TXDI2DWOqRMTFXRBMxKmmBVd3FTJyjQ1sJGEN8JIqP9zvdq79ygp~qB8x9efFBix1-s2eQuBtVaV~x8SowsEzi~ELTdKDmRCzB8cQ4anHoDiPucv~ikSf~Q3Q2h1zkcvP2rFIbHz3SPJCgltkscE3WlWkZhXhnjkvies6Umusv23YpplFBdLHunzIXKCENuKNtZLwCdfOzAbx51ApQSfVV1TCkcWBtfxSG~KeaYg0941Evu-zXPgKMzS0AM7P1JAg07RHdFqpW9szXsfn-dRp3olrOXyXV8r9fKSQkd0Jkqog~pNHGIzLwMyBkBxLQQa94-Z8qyZB7Qng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  //     price: 1000000,
  //     address: 'Hải Châu',
  //     area: '60m2',
  //   },
  // ];

  fields = 'id,thumbnail,destination,averagePrice,averageArea';

  // dataDropdown = [
  //   {
  //     name: 'Đà Nẵng',
  //     id: '1',
  //   },
  //   {
  //     name: 'Hà Nội',
  //     id: '2',
  //   },
  //   {
  //     name: 'Thành phố Hồ Chí Minh',
  //     id: '3',
  //   },
  // ];

  componentDidMount() {
    const { getCategory, getCity } = this.props;
    getCategory({ fields: 'id,name' });
    getCity({ fields: 'id,name' });
  }

  handleChangeCityConfig = (value: number) => {
    const { setConfigCity } = this.props;
    setConfigCity(value);
    const query1: any = { ...this.category1.props.query };
    const query2: any = { ...this.category2.props.query };
    const query3: any = { ...this.category3.props.query };
    const query4: any = { ...this.category4.props.query };
    query1.s.$and[1]['destination.city.id'] = value;
    query2.s.$and[1]['destination.city.id'] = value;
    query3.s.$and[1]['destination.city.id'] = value;
    query4.s.$and[1]['destination.city.id'] = value;

    this.category1.getPropertiesByCondition(query1);
    this.category2.getPropertiesByCondition(query2);
    this.category3.getPropertiesByCondition(query3);
    this.category4.getPropertiesByCondition(query4);
    // console.log('this.category1', this.category1.props.query.s.$and[1]['destination.city.id']);
  };

  renderLeftComponent = () => {
    const { city: { data, loading }, cityConfig } = this.props;
    if (data.length === 0) {
      return <ActivityIndicator />;
    }
    return (
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
            defaultValue={cityConfig}
            onChange={this.handleChangeCityConfig}
            activeColor={lightPrimaryColor}
            data={data}
            labelKey="name"
            valueKey="id"
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
  };

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
    const {
      t,
      properties,
      getList,
      categories: { data, loading },
      city,
      cityConfig,
    } = this.props;
    if (loading) {
      return <OverlayLoading backgroundColor={Color.white} />;
    }
    return (
      <Container>
        {/* <StatusBar backgroundColor={Color.white} /> */}
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
              <Text fontSize="tiny">Tìm theo quận, tên đường, địa điểm</Text>
            </QuickView>
            <QuickView>
              <Icon name="magnify" type="material-community" color="#B1ADAD" />
            </QuickView>
          </QuickView>
          {/* <Button
            height={50}
            title="Map"
            onPress={() => NavigationService.navigate(rootStack.exploreStack, {
              screen: exploreStack.map,
            })}
          /> */}
          {/* <Button
            height={50}
            title="List your space, property"
            onPress={() => NavigationService.navigate(rootStack.exploreStack, {
              screen: exploreStack.createProperty,
            })}
          /> */}
          <CategoryList
            ref={(ref: any) => {
              this.category1 = ref;
            }}
            query={{ fields: this.fields, limit: 3, s: { $and: [{ 'category.id': data[0]?.id }, { 'destination.city.id': cityConfig }] } }}
            categoryValue={data[0]}
            // data={this.data}
            mode={1}
          />
          <CategoryList
            ref={(ref: any) => {
              this.category2 = ref;
            }}
            // query={{ fields: this.fields, limit: 3, s: { 'category.id': data[1]?.id } }}
            query={{ fields: this.fields, limit: 3, s: { $and: [{ 'category.id': data[1]?.id }, { 'destination.city.id': cityConfig }] } }}
            categoryValue={data[1]}
            // data={this.data}
            mode={2}
          />
          <CategoryList
            ref={(ref: any) => {
              this.category3 = ref;
            }}
            // query={{ fields: this.fields, limit: 3, s: { 'category.id': data[2]?.id } }}
            query={{ fields: this.fields, limit: 3, s: { $and: [{ 'category.id': data[2]?.id }, { 'destination.city.id': cityConfig }] } }}
            categoryValue={data[2]}
            // data={this.data}
            mode={2}
          />
          <CategoryList
            ref={(ref: any) => {
              this.category4 = ref;
            }}
            // query={{ fields: this.fields, limit: 3, s: { 'category.id': data[3]?.id } }}
            query={{ fields: this.fields, limit: 3, s: { $and: [{ 'category.id': data[3]?.id }, { 'destination.city.id': cityConfig }] } }}
            categoryValue={data[3]}
            // data={this.data}
            mode={2}
          />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  properties: parseArraySelector(applyArraySelector(propertyListSelector, state)),
  categories: parseArraySelector(applyArraySelector(categorySelector, state)),
  city: parseArraySelector(applyArraySelector(cityListSelector, state)),
  cityConfig: state.main.explore.toJS().cityConfig,
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query ?: TQuery) => dispatch(propertyGetList({ query })),
  getCategory: (query ?: TQuery) => dispatch(categoryGetList({ query })),
  getCity: (query ?: TQuery) => dispatch(cityGetList({ query })),
  setConfigCity: (data: any) => dispatch(setCityConfig({ data })),
});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(ExploreScreen as any);
