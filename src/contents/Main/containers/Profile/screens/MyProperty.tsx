import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body, Button, FlatList, Image,
} from '@components';
import NavigationService from '@utils/navigation';
import { connect } from 'react-redux';
import {
  applyArraySelector, applyObjectSelector, parseArraySelector, parseObjectSelector,
} from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { TArrayRedux, TQuery } from '@utils/redux';
import { TouchableOpacity } from 'react-native';
import { vndPriceFormat } from '@utils/functions';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { myPropertyGetList } from '../redux/slice';
import profileStack from '../routes';
import { myPropertySelector } from '../redux/selector';

interface Props {
  loginSelectorData: any;
  getMyProperty: (id: number, query?: TQuery) => any;
  properties: TArrayRedux;
}
interface State {}
class MyProperty extends PureComponent<Props, State> {
  fields = 'id,thumbnail,destination,averagePrice,averageArea,title,address';
  // componentDidMount() {
  //   const { getMyProperty, loginSelectorData: { data } } = this.props;
  //   getMyProperty(data?.id);
  // }

  renderItem = ({ item, index }: { item: any; index: number}) => (
    <TouchableOpacity
      style={{ marginBottom: 30 }}
      onPress={() => NavigationService.navigate(profileStack.createRoom, item.id)}
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

              {vndPriceFormat(item?.averagePrice * 100000)}
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
    const { loginSelectorData: { data }, properties, getMyProperty } = this.props;
    console.log('🚀 ~ file: MyProperty.tsx ~ line 77 ~ MyProperty ~ render ~ properties', properties);

    return (
      <Container>
        <Header backIcon title="Phòng trọ của tôi" />
        <Body>
          <FlatList
            list={properties}
            getList={(query?: TQuery) => getMyProperty(data?.id, { ...query, fields: this.fields })}
            renderItem={this.renderItem}
          />
          {/* <Button title="Tạo phòng" onPress={() => NavigationService.navigate(profileStack.createRoom)} /> */}
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  properties: parseArraySelector(applyArraySelector(myPropertySelector, state)),
  loginSelectorData: parseObjectSelector(applyObjectSelector(loginSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getMyProperty: (id?: number, query?: TQuery) => dispatch(myPropertyGetList({ id, query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProperty);
