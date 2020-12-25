import {
  Body, Container, FlatList, Header, Image, QuickView, Text,
} from '@components';
import rootStack from '@contents/routes';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { setIdIntoParams } from '@utils/appHelper';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { roomateSelector } from '../../Saved/redux/selector';
import { roomateGetList } from '../../Saved/redux/slice';
import roomateStack from '../routes';

interface State {
}
interface Props {
  t: any;
  navigation: any;
  getList: (query?: TQuery) => any;
  roomate: TArrayRedux;
}
class ListRoomate extends PureComponent<Props, State> {
  renderItem = ({ item, index }: { item: any; index: number}) => (
    <TouchableOpacity

      onPress={() => NavigationService.navigate(rootStack.roomateStack, {
        screen: roomateStack.detail,
        params: setIdIntoParams(item),
      })}
      style={{ marginBottom: 30, flexDirection: 'row', flexWrap: 'wrap' }}
    >
      <QuickView flex={1}>
        <Image source={{ uri: item?.user?.avatar }} width={100} height={100} />
      </QuickView>
      <QuickView flex={2} paddingHorizontal={20} justifyContent="center">

        <QuickView>
          <Text bold>
            {item?.user?.fullName}
          </Text>
        </QuickView>
        <QuickView marginVertical={10}>
          <Text color={lightPrimaryColor} fontWeight="medium">

            {vndPriceFormat(item?.price * 10)}
            {' '}
            VND
          </Text>
        </QuickView>
        <QuickView>
          <Text
            icon={{
              name: 'map-pin',
              color: lightPrimaryColor,
              type: 'feather',
              size: 13,
            }}
            // numberOfLines={1}
            fontSize="small"
            color={lightPrimaryColor}
          >

            {`${item?.destination?.name}, ${item?.destination?.parent?.name}, ${item?.destination?.parent?.parent?.name}`}
          </Text>
        </QuickView>
      </QuickView>
    </TouchableOpacity>
  );

  render() {
    const { getList, roomate } = this.props;
    console.log('roomate', roomate);

    return (
      <Container>
        <Header title="Ở ghép" />
        <Body>
          <FlatList
            list={roomate}
            // data={DATA}
            getList={(query?: TQuery) => getList(
              { ...query },
            )}
            renderItem={this.renderItem}
          />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  roomate: parseArraySelector(applyArraySelector(roomateSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query ?: TQuery) => dispatch(roomateGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListRoomate);
