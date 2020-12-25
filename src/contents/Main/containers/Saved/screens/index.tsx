/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent, FC, useState } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, FlatList, Image,
} from '@components';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import PropertyCart from '@components/Custom/PropertyCart';
import { Global, setIdIntoParams } from '@utils/appHelper';
import AuthPopup from '@components/AuthPopup';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { vndPriceFormat } from '@utils/functions';
import { TouchableOpacity } from 'react-native';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import exploreStack from '../../Explore/routes';
import { favoritePropertySelector } from '../redux/selector';
import { savedGetList } from '../redux/slice';

const DATA = [
  {
    id: '9292292',
    title: 'Sunny Saigon Studio Flat',
    thumbnail:
        'https://picsum.photos/1000/1000',
    address: '252 1st Avenue',
    destination: {
      id: 85,
      name: 'Xuân Hà',
      parent: {
        id: 9,
        name: 'Thanh Khê',
        parent: {
          id: 1,
          name: 'Đà Nẵng',
        },
      },
    },
    averagePrice: 1499000,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '929221929',
    title: 'Cosmo City near SECC',
    thumbnail:
        'https://picsum.photos/1500/1500',
    address: '252 Sư Vạn Hạnh',
    averagePrice: 499000,
    totalBed: 4,
    totalBath: 2,
    destination: {
      id: 439,
      name: 'Phường 26',
      parent: {
        id: 35,
        name: 'Bình Thạnh',
        parent: {
          id: 3,
          name: 'TP. Hồ Chí Minh',
        },
      },
    },
  },
  {
    id: '9292229',
    title: 'Pretty and convenient 201',
    thumbnail:
        'https://picsum.photos/1300/1400',
    address: '252 1st Avenue',
    averagePrice: 6000000,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '92922929',
    title: 'Sunny Saigon Studio Flat',
    thumbnail:
        'https://picsum.photos/1200/1200',
    address: '252 1st Avenue',
    averagePrice: 1200000,
    totalBed: 4,
    totalBath: 2,
  },
];
interface State {
  overlayIsVisible: boolean;
}
interface Props {
  t: any;
  navigation: any;
  getList: (query?: TQuery) => any;
  saved: TArrayRedux;
}
class SavedListScreen extends PureComponent<Props, State> {
  fields = 'id,thumbnail,destination,averagePrice,averageArea,title,address';

  constructor(props:Props) {
    super(props);
    this.state = {
      overlayIsVisible: false,
    };
  }

  componentDidMount() {
    const { navigation, getList } = this.props;
    getList();
    navigation.addListener('focus', () => {
      if (!Global.token) { this.setState({ overlayIsVisible: true }); }
    });
  }

  toggleOverlay = () => {
    const { overlayIsVisible } = this.state;
    this.setState({ overlayIsVisible: !overlayIsVisible });
  };

  // renderItem = ({ item, index }: { item: any; index: number}) => <PropertyCart data={item} />;

  renderItem = ({ item, index }: { item: any; index: number}) => (
    <TouchableOpacity
      style={{ marginBottom: 30 }}
      onPress={() => NavigationService.navigate(rootStack.exploreStack, {
        screen: exploreStack.detailProperty,
        params: setIdIntoParams(item),
      })}
    >
      <Image source={{ uri: item.thumbnail }} height={160} />
      <QuickView paddingHorizontal={20}>
        <QuickView
          marginTop={20}
          justifyContent="space-between"
          row
        >
          <QuickView flex={2}>
            <Text bold>
              {item?.title}
            </Text>
          </QuickView>
          <QuickView style={{ borderWidth: 0 }} alignItems="flex-end" flex={1}>
            <Text color={lightPrimaryColor} fontWeight="medium">

              {vndPriceFormat(item?.averagePrice * 10)}
              {' '}
              VND
            </Text>
          </QuickView>
        </QuickView>
        <Text
          marginTop={10}
          icon={{
            name: 'map-pin',
            color: lightPrimaryColor,
            type: 'feather',
            size: 13,
          }}
          numberOfLines={1}
          fontSize="small"
          color={lightPrimaryColor}
        >
          {`${item?.address}, ${item?.destination?.name}, ${item?.destination?.parent?.name}, ${item?.destination?.parent?.parent?.name}`}
        </Text>
      </QuickView>
    </TouchableOpacity>
  );

  render() {
    const { overlayIsVisible } = this.state;
    const { saved, getList } = this.props;

    return (
      <Container>
        <AuthPopup overlayIsVisible={overlayIsVisible} toggleOverlay={this.toggleOverlay} />
        <Header title="Yêu thích" />
        <Body>
          <FlatList
            list={saved}
            // data={DATA}
            getList={(query?: TQuery) => getList(
              { ...query, fields: this.fields },
            )}
            renderItem={this.renderItem}
          />
        </Body>
      </Container>
    );
  }
}
const mapStateToProps = (state: any) => ({
  saved: parseArraySelector(applyArraySelector(favoritePropertySelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query?: TQuery) => dispatch(savedGetList({ query })),
});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(SavedListScreen as any);
