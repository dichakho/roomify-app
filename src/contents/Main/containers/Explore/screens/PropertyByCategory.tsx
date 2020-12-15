import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, FlatList, Image,
} from '@components';
import PropertyCart from '@components/Custom/PropertyCart';
import { TouchableOpacity } from 'react-native';
import { vndPriceFormat } from '@utils/functions';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { setIdIntoParams } from '@utils/appHelper';
import { propertyGetList } from '../redux/slice';
import { propertyListSelector } from '../redux/selector';
import exploreStack from '../routes';

const DATA = [
  {
    id: '9292292',
    thumbnail:
        'https://picsum.photos/1500/1500',
    address: '252 1st Avenue',
    price: 499,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '929221929',
    thumbnail:
        'https://picsum.photos/1500/1500',
    address: '252 1st Avenue',
    price: 499,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '9292229',
    thumbnail:
        'https://picsum.photos/1500/1500',
    address: '252 1st Avenue',
    price: 499,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '92922929',
    thumbnail:
        'https://picsum.photos/1500/1500',
    address: '252 1st Avenue',
    price: 499,
    totalBed: 4,
    totalBath: 2,
  },
];
interface Props {
  route?: any;
  properties: TArrayRedux;
  getList: (query?: TQuery) => any;
}
interface State {}
class PropertyByCategory extends PureComponent<Props, State> {
  fields = 'id,thumbnail,destination,averagePrice,averageArea,title,address';

  // componentDidMount() {
  //   const { getList, route: { params: { id, name } } } = this.props;

  //   getList({ fields: this.fields, s: { 'category.id': id } });
  // }

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
    const { route: { params: { id, name } }, properties, getList } = this.props;
    return (
      <Container>
        <Header backIcon title={name} />
        <Body>
          <FlatList
            list={properties}
            getList={(query?: TQuery) => getList(
              { ...query, fields: this.fields, s: { 'category.id': id } },
            )}
            renderItem={this.renderItem}
          />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  properties: parseArraySelector(applyArraySelector(propertyListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query ?: TQuery) => dispatch(propertyGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyByCategory);
