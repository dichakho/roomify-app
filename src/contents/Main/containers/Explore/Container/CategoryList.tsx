/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent, Component } from 'react';
import {
  ActivityIndicator, FlatList as RNFlatList, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  QuickView, Text, Image,
} from '@components';
import { vndPriceFormat } from '@utils/functions';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { Global } from '@utils/appHelper';
import AuthPopup from '@components/AuthPopup';
import { stringifyQuery, TArrayRedux, TQuery } from '@utils/redux';
import { get } from '@utils/api';
import _ from 'lodash';
import exploreStack from '../routes';

interface Props {
  categoryValue: any;
  data?: Array<any>;
  mode?: number;
  getList?: (query?: TQuery) => any;
  list?: TArrayRedux;
  query?: any;
}
interface State {
  overlayIsVisible: boolean
  queryString: any;
  dataProperty: any;
  loading: boolean;
}
export class CategoryList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      overlayIsVisible: false,
      queryString: null,
      dataProperty: null,
      loading: true,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // const { query } = nextProps;
    // console.log('query', nextProps.query);

    if (nextProps.query) {
      return { queryString: nextProps.query };
    }
    return { ...prevState };
  }

  async componentDidMount() {
    // const { getList, list } = this.props;
    // if (list && getList) {
    //   getList();
    // }
    const { queryString } = this.state;

    if (queryString) {
      // this.setState({ loading: true });
      const encodeQuery = stringifyQuery(queryString);
      const result = await get(`/properties?${encodeQuery}`);
      this.setState({ dataProperty: result, loading: false });
    }
  }

  toggleOverlay = () => {
    const { overlayIsVisible } = this.state;
    this.setState({ overlayIsVisible: !overlayIsVisible });
  };

  handleOnPress = (id: any) => {
    const { categoryValue } = this.props;
    if (Global.token) {
      NavigationService.navigate(rootStack.exploreStack, {
        screen: exploreStack.detailProperty,
        params: { id },
      });
    } else {
      this.setState({ overlayIsVisible: true });
    }
  };

  handleOnPressSeeMore = () => {
    const { categoryValue } = this.props;
    if (Global.token) {
      NavigationService.navigate(rootStack.exploreStack, {
        screen: exploreStack.propsByCategory,
        params: categoryValue,
      });
    } else {
      this.setState({ overlayIsVisible: true });
    }
  };

  renderThemeOne = (item: any) => (
    <QuickView
      style={{ width: 180 }}
      marginRight={20}
      onPress={() => this.handleOnPress(item?.id)}
    >
      <Image source={{ uri: item?.thumbnail }} width={180} height={140} />
      <QuickView marginTop={15} marginLeft={10}>
        <Text type="paragraph" bold>
          {vndPriceFormat(item?.averagePrice * 100000)}
        </Text>
        <Text marginTop={5} fontSize="small">
          {item?.averageArea}
          m2
          {/* 60m2 */}
        </Text>
        <Text
          marginTop={10}
          icon={{
            name: 'map-pin',
            color: lightPrimaryColor,
            type: 'feather',
            size: 12,
          }}
          fontSize="tiny"
          color="#77858C"
        >
          {item?.destination?.parent?.name}
          {/* Thanh Khê */}
        </Text>
      </QuickView>
    </QuickView>
  );

  renderThemeTwo = (item: any) => (
    <QuickView
      width={300}
      height={140}
      borderRadius={20}
      marginRight={20}
      onPress={() => this.handleOnPress(item?.id)}
    >
      <QuickView
        backgroundImage={{
          source: { uri: item?.thumbnail },
          imageStyle: { borderRadius: 20 },
        }}
        width={300}
      >
        <QuickView
          marginTop={100}
          marginRight={20}
          alignSelf="flex-end"
          borderRadius={10}
          backgroundColor="#FFFFFF"
          padding={5}
          row
        >
          <Text>Chỉ </Text>
          <Text color={lightPrimaryColor}>
            ₫
            {vndPriceFormat(item?.averagePrice * 100000)}
            /tháng
          </Text>
        </QuickView>
      </QuickView>
    </QuickView>
  );

  renderThemeThree = (item: any) => (
    <QuickView width={300} height={140} borderRadius={20} marginRight={20}>
      <QuickView
        backgroundImage={{
          source: { uri: item.coverUrl },
          imageStyle: { borderRadius: 20 },
        }}
        width={300}
      >
        <QuickView
          marginTop={100}
          marginRight={20}
          alignSelf="flex-end"
          borderRadius={10}
          backgroundColor="#FFFFFF"
          padding={5}
          row
        >
          <Text>Chỉ </Text>
          <Text bold color={lightPrimaryColor}>
            {vndPriceFormat(item.price)}
            / căn/ tháng
          </Text>
        </QuickView>
      </QuickView>
    </QuickView>
  );

  renderRowItem = ({ item }: { item: any }) => {
    const { mode } = this.props;
    let theme = null;
    switch (mode) {
      case 1:
        theme = this.renderThemeOne(item);
        break;
      case 2:
        theme = this.renderThemeTwo(item);
        break;
      default:
        break;
    }
    return theme;
  };

  renderEmpty = () => {
    const { loading } = this.state;
    if (loading) {
      return (
        <QuickView flex={1} center>
          <ActivityIndicator />
        </QuickView>
      );
    }
    return <Text>Chưa có dữ liệu</Text>;
  };

  render() {
    const {
      categoryValue, data, mode, list, query,
    } = this.props;
    const { overlayIsVisible, dataProperty } = this.state;
    // console.log('🚀 ~ file: CategoryList.tsx ~ line 194 ~ CategoryList ~ render ~ dataProperty', dataProperty);
    // console.log('dataProperty', dataProperty);

    return (
      <QuickView>
        <AuthPopup overlayIsVisible={overlayIsVisible} toggleOverlay={this.toggleOverlay} />
        <QuickView
          marginTop={40}
          row
          alignItems="center"
          justifyContent="space-between"
        >
          <Text type="title" bold>
            {categoryValue?.name}
          </Text>
          <TouchableOpacity onPress={this.handleOnPressSeeMore} style={{ padding: 5 }}>
            <Text fontSize="small" color="#B1ADAD">
              View All
            </Text>
          </TouchableOpacity>
        </QuickView>
        {query && !_.isNull(dataProperty) ? (
          <RNFlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal
            data={dataProperty.result}
            // data={[]}
            renderItem={this.renderRowItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.renderEmpty}
          />
        ) : (
          <RNFlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}
            horizontal
            data={data}
            renderItem={this.renderRowItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (state: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
