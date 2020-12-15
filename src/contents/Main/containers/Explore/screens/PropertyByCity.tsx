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
import { propertyListSelector } from '../redux/selector';
import { propertyGetList, setSearchHistory } from '../redux/slice';
import PopularCity from '../Container/Search/PopularCity';
import SearchHistory from '../Container/Search/SearchHistory';

interface State {

}
interface Props {
  properties: TArrayRedux;
  getList: (query?: TQuery) => any;
  setHistory: (data: any) => any;
  history: Array<string>;
  route: any;
}
class PropertyByCity extends PureComponent<Props, State> {
  filter = new Filter();

  fields = 'id,thumbnail,destination,averagePrice,averageArea,title,address';
  // fields = 'id,destination,address';

  renderCenterComponent = () => {
    const {
      route: { params: { name } },
    } = this.props;
    return (
      <SearchBar
        value={name}
        disabled
        inputStyle={{ fontSize: 14, color: lightComponentColor.textColor }}
        lightTheme
        placeholder="Tìm theo quận, tên đường, địa điểm"
        searchIcon={false}
        clearIcon={{ color: Color.white }}
        placeholderTextColor={lightComponentColor.textColor}
        containerStyle={{
          width: '100%',
          elevation: 20,
          backgroundColor: Color.grey2,
          borderWidth: 1,
          borderColor: 'rgba(177, 173, 173, 0.2)',
          borderRadius: 10,
        }}
        inputContainerStyle={{
          height: 30,
          borderRadius: 22.5,
          backgroundColor: Color.grey2,
        }}
      />
    );
  };

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
      properties, getList, route: { params: { id } },
    } = this.props;

    return (
      <Container>
        <Header
          backIcon
          placement="left"
          centerComponent={this.renderCenterComponent()}
        />
        <Body paddingVertical={20}>
          <QuickView paddingVertical={20}>
            <Text bold type="title">
              {properties?.metadata?.total}
              {' '}
              kết quả tìm thấy
            </Text>
          </QuickView>
          <FlatList
            list={properties}
            getList={(query?: TQuery) => getList(
              { ...query, fields: this.fields, s: { 'destination.city.id': id } },
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
  history: state.main.explore.toJS().searchHistory,
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query ?: TQuery) => dispatch(propertyGetList({ query })),
  setHistory: (data: any) => dispatch(setSearchHistory({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyByCity);
