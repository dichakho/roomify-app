/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QuickView, Text, Container, Header, Body, FlatList, Image,
} from '@components';
import { Color } from '@themes/Theme';
import React, { PureComponent } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
import Filter from '@utils/filter';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { setIdIntoParams } from '@utils/appHelper';
import { get } from '@utils/api';
import _ from 'lodash';
import exploreStack from '../routes';
import { nearMeSelector, propertyListSelector } from '../redux/selector';
import { nearMeGetList, propertyGetList, setSearchHistory } from '../redux/slice';
import PopularCity from '../Container/Search/PopularCity';
import SearchHistory from '../Container/Search/SearchHistory';

interface State {

}
interface Props {
  nearMe: TArrayRedux;
  getList: (query?: TQuery, longitude?: any, latitude?:any) => any;
  route: any;
}
class PropertyNearMe extends PureComponent<Props, State> {
  filter = new Filter();

  fields = 'id,thumbnail,destination,averagePrice,averageArea,title,address';
  // fields = 'id,destination,address';

  componentDidMount() {
    const { route: { params: { position } } } = this.props;
  }

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
    const {
      nearMe, getList, route: { params: { position } },
    } = this.props;
    console.log('🚀 ~ file: PropertyNearMe.tsx ~ line 92 ~ PropertyNearMe ~ render ~ nearMe', position);

    return (
      <Container>
        <Header
          backIcon
          title="Khu trọ gần tôi"
        />
        <Body paddingVertical={20}>
          <FlatList
            list={nearMe}
            getList={(query?: TQuery) => getList(
              { ...query }, position.longitude, position.latitude,
            )}
            renderItem={this.renderItem}
          />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  nearMe: parseArraySelector(applyArraySelector(nearMeSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query ?: TQuery, longitude?: any, latitude?: any) => dispatch(nearMeGetList({ query, longitude, latitude })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyNearMe);
