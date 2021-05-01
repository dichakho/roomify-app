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
import Geolocation from '@react-native-community/geolocation';
import exploreStack from '../routes';
import { propertyListSelector } from '../redux/selector';
import { propertyGetList, setSearchHistory } from '../redux/slice';
import PopularCity from '../Container/Search/PopularCity';
import SearchHistory from '../Container/Search/SearchHistory';
import ExploreStack from '../index.stack';

interface State {
  search: string;
  data: Array<any>;
  popularCity: any;
  loadingCall: boolean;
}
interface Props {
  properties: TArrayRedux;
  getList: (query?: TQuery) => any;
  setHistory: (data: any) => any;
  history: Array<string>;
}
class SearchScreen extends PureComponent<Props, State> {
  filter = new Filter();

  fields = 'id,thumbnail,destination,averagePrice,averageArea,title,address';
  // fields = 'id,destination,address';

  callSuggestions = (_.debounce(() => {
    const { search } = this.state;
    const { getList } = this.props;
    this.filter.clearFilter();
    // this.filter.deleteFilterByKey('destination.name');
    // this.filter.mergeFilter('destination.name', '$contL', search, 'OR');
    // this.filter.mergeFilter('destination.parent.name', '$contL', search, 'OR');
    // this.filter.mergeFilter('destination.parent.parent.name', '$contL', search, 'OR');
    this.filter.filterObject = { $or: [{ address: { $contL: search } }, { 'destination.name': { $contL: search } }, { 'destination.district.name': { $contL: search } }, { 'destination.city.name': { $contL: search } }] };

    getList(
      { fields: this.fields, s: this.filter.filterObject },
    );
    this.setState({ loadingCall: false });
  }, 1500));

  constructor(props: Props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      popularCity: null,
      loadingCall: false,
    };
  }

  updateSearch = (search: string) => {
    this.setState({ search, loadingCall: true });
    this.callSuggestions();
    // this.setState({ loadingCall: false });
  };

  onSubmitEditing = () => {
    const { search } = this.state;
    const { getList, setHistory } = this.props;
    console.log('onSubmitEditing', search);
    setHistory(search);
    // this.filter.mergeFilter('destination.name', '$contL', search);
    // getList(
    //   { fields: this.fields, s: this.filter.filterObject },
    // );
  };

  onClear = () => {
    const { search } = this.state;
    const { getList } = this.props;
    console.log('onClear', search);
    this.filter.clearFilter();
    // this.filter.deleteFilterByKey('destination.name');
    getList(
      { fields: this.fields, s: this.filter.filterObject },
    );
  };

  renderCenterComponent = () => {
    const { search } = this.state;
    return (
      <SearchBar
        onClear={this.onClear}
        onSubmitEditing={this.onSubmitEditing}
        inputStyle={{ fontSize: 14, color: lightComponentColor.textColor }}
        onChangeText={this.updateSearch}
        value={search}
        // platform="ios"
        lightTheme
        placeholder="Tìm theo quận, tên đường, địa điểm"
        searchIcon={false}
        // searchIcon={{
        //   name: 'chevron-left',
        //   type: 'entypo',
        //   color: lightComponentColor.textColor,
        // }}
        clearIcon={{ color: lightComponentColor.textColor }}
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

  // renderItem = ({ item, index }: { item: any; index: number}) => (
  //   <TouchableOpacity
  //     // onPress={() => NavigationService.navigate(rootStack.exploreStack, {
  //     //   screen: exploreStack.detailProperty,
  //     //   params: setIdIntoParams(item),
  //     // })}
  //     style={{ marginBottom: 30 }}

  //   >
  //     <Text>Alo</Text>
  //   </TouchableOpacity>
  // );

  renderItemSuggestion = ({ item }: { item: any}) => (
    <QuickView>
      <Text type="paragraph">alo</Text>
    </QuickView>
  );

  handleOnPressCity = (item: any) => {
    NavigationService.navigate(exploreStack.propertyByCity, item);
  };

  renderFlatList = () => {
    const { loadingCall } = this.state;
    const { properties, getList, history } = this.props;
    // console.log('properties', properties?.loading);

    if (loadingCall) {
      return <ActivityIndicator />;
    }
    return (
      <>
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
            { ...query, fields: this.fields, s: this.filter.filterObject },
          )}
          renderItem={this.renderItem}
        />
        <QuickView
          row
          onPress={() => NavigationService.navigate(rootStack.exploreStack, {
            screen: exploreStack.map,
            params: { s: this.filter.filterObject },
            // params: { id: 1 },
          })}
          borderRadius={10}
          center
          backgroundColor={Color.white}
          padding={10}
          marginBottom={50}
          style={{
            position: 'absolute',
            bottom: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <Icon name="map-outline" type="ionicon" />
          <Text marginLeft={5}>Map</Text>
        </QuickView>
      </>
    );
  };

  locateCurrentPosition = async () => {
    console.log('123');

    Geolocation.getCurrentPosition((position) => {
      const initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log('initialPosition', initialPosition);
      NavigationService.navigate(exploreStack.propertyNearMe, { id: 1, name: '123', position: initialPosition });
      // const result = await get(`https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyCv45asCJthye8h1mrrDxl66PBzUnBcbzA&latlng=${initialPosition.latitude},${initialPosition.longitude}`);
      // this.setState({ initialPosition });
    },
    (error) => console.log('error', error.message),
    { enableHighAccuracy: true, timeout: 10000 });
  };

  render() {
    const { properties, getList, history } = this.props;
    // console.log('🚀 ~ file: SearchScreen.tsx ~ line 188 ~ SearchScreen ~ render ~ properties', properties);
    const {
      data, search, popularCity, loadingCall,
    } = this.state;
    // console.log('123123123132', loadingCall);

    return (
      <Container>
        <Header
          backIcon
          placement="left"
          centerComponent={this.renderCenterComponent()}
        />
        <Body paddingVertical={20}>
          {/* Option 1 */}
          {search.length === 0 && _.isNull(popularCity) ? (
            <>

              <QuickView onPress={this.locateCurrentPosition} paddingVertical={20}>
                <QuickView row>
                  <QuickView height={20} style={{ borderLeftWidth: 1, borderColor: 'red' }} />
                  <Text marginBottom={10} bold> Khu trọ gần tôi</Text>
                </QuickView>

              </QuickView>
              <PopularCity onChange={(item: any) => this.handleOnPressCity(item)} />
              <SearchHistory onChange={(item: string) => this.updateSearch(item)} />
            </>
          ) : (this.renderFlatList())}

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
