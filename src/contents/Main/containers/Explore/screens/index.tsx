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
} from '@components';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, FlatList as RNFlatList } from 'react-native';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import { CategoryList } from '../Container/CategoryList';
import exploreStack from '../routes';

interface Props {
  t: any;
}
class ExploreScreen extends PureComponent<Props> {
  renderLeftComponent = () => {
    const dataDropdown = [
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

    console.log('renderLeftComponent');
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
            activeColor={lightPrimaryColor}
            data={dataDropdown}
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
              backgroundColor: Color.grey,
            }}
          />
        </QuickView>
      </QuickView>
    );
  };

  renderRightComponent = () => {
    console.log('renderRightComponent');
    return (
      <QuickView
        padding={5}
        onPress={() => {
          NavigationService.navigate(exploreStack.searchScreen);
        }}>
        <Icon name="filter-outline" type="material-community" color="#000" />
      </QuickView>
    );
  };

  render() {
    const { t } = this.props;
    const data = [
      {
        coverUrl:
          'https://s3-alpha-sig.figma.com/img/0f14/5640/1a7cb0f8a6af33580734b2403203ba82?Expires=1599436800&Signature=ZqKbSbcQCsR6Qc~GwwGlEnDzSwG8ALOqXyFDP8i3eWNrDpw0Bm6FxOOE-adJ4OBYsjjcCtFhNunhqYlj4lwQE1xTzD3v6uaQJeYqT~jpy8msPp4ye3xbwSllFmo5HDVfIPhs5VSHt~RY4419L-7gx9r55aQFrkv55YgF1YD8VI5l6pbfIZImRgyqvgTmCbe~8Rp41iY7BTpPPr7-F0vZOn84z9LcG7BQcgEXuZ-TdbPufkCxloZ4VEAEI75MvtIA8m7-SaQuSMeC9sSTXmXdnAZ9OhFtHl3IG7Y5yn3SEpNhU7MESqJg3XcCge1rESICCIpT6raiEsFS-iL5S1kJvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        price: 1000000,
        address: 'Thanh Khê',
        area: '60m2',
      },
      {
        coverUrl:
          'https://s3-alpha-sig.figma.com/img/eb48/87a0/c4fa0f3907b14d0a3dbb91e7ca06cf1e?Expires=1599436800&Signature=IwrBjg8KcqjRbRY3MQvpK6f~H2ROfQrDfITJCWY5i3lmUN9hgZXpdvP0eSaPoCB3lRat~GVYYWpCS0eEpaH5SjXvEjwm380rjWh9hJV-4LU~KmlUQMIooDYu3X4Fdsn0Jz5JjsrCleS7iofIM8Nb0-9ojxSrs0d0x6-R70BlEdlWhAYlc7UAonpbqH-tK4Tqi1KgrHami1Lb-zOAn56W937UOjdunYPx5bXTm4cVegtNr9ipsXFO6VXHOzwCpVbe4BdNEKNVys0hYBQ~JskmW10BBK~oOWhJJAH8pPMsS-8o5yP3wschvZkpK78iOVL~47ayi3ycq1Il4IiQUchOrA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        price: 800000,
        address: 'Liên Chiểu',
        area: '60m2',
      },
      {
        coverUrl:
          'https://s3-alpha-sig.figma.com/img/0f14/5640/1a7cb0f8a6af33580734b2403203ba82?Expires=1599436800&Signature=ZqKbSbcQCsR6Qc~GwwGlEnDzSwG8ALOqXyFDP8i3eWNrDpw0Bm6FxOOE-adJ4OBYsjjcCtFhNunhqYlj4lwQE1xTzD3v6uaQJeYqT~jpy8msPp4ye3xbwSllFmo5HDVfIPhs5VSHt~RY4419L-7gx9r55aQFrkv55YgF1YD8VI5l6pbfIZImRgyqvgTmCbe~8Rp41iY7BTpPPr7-F0vZOn84z9LcG7BQcgEXuZ-TdbPufkCxloZ4VEAEI75MvtIA8m7-SaQuSMeC9sSTXmXdnAZ9OhFtHl3IG7Y5yn3SEpNhU7MESqJg3XcCge1rESICCIpT6raiEsFS-iL5S1kJvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        price: 1000000,
        address: 'Hải Châu',
        area: '60m2',
      },
    ];
    return (
      <Container>
        <Header
          containerStyle={{ zIndex: 1000 }}
          placement="left"
          leftComponent={this.renderLeftComponent()}
          rightComponent={this.renderRightComponent()}
          // backgroundColor={Color.white}
          // title={t('header:explore')}
          // color={lightPrimaryColor}
        />
        <Body marginBottom={20} scroll style={{ zIndex: 10 }}>
          <CategoryList categoryName="Phòng cho thuê" data={data} mode={1} />
          <CategoryList categoryName="Nhà nguyên căn" data={data} mode={2} />
          <CategoryList categoryName="Phòng ở ghép" data={data} mode={2} />
          <CategoryList categoryName="Căn hộ" data={data} mode={2} />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(ExploreScreen as any);
