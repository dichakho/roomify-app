import {
  Body, Container, FlatList, Header, Image, QuickView, Text,
} from '@components';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { vndPriceFormat } from '@utils/functions';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getBookedListSelector } from '../redux/selector';
import { bookedGetList } from '../redux/slice';

interface State {}
interface Props {
  getListBooked: (query?: TQuery) => any;
  booked: TArrayRedux;
}
class ListBooked extends PureComponent<Props, State> {
  // componentDidMount() {
  //   const { getListBooked } = this.props;
  //   getListBooked();
  // }

  renderItem = ({ item, index }: { item: any; index: number}) => (
    <TouchableOpacity

      // onPress={() => NavigationService.navigate(rootStack.exploreStack, {
      //   screen: exploreStack.detailProperty,
      //   params: setIdIntoParams(item),
      // })}
      style={{ marginBottom: 30 }}
    >
      <Image source={{ uri: item?.room?.images[0] }} height={160} />
      <QuickView paddingHorizontal={20}>
        <QuickView
          marginTop={20}
          justifyContent="space-between"
          row
        >
          <QuickView flex={2}>
            <Text bold>
              {item?.room?.name}
            </Text>
          </QuickView>
          <QuickView style={{ borderWidth: 0 }} alignItems="flex-end" flex={1}>
            <Text color={lightPrimaryColor} fontWeight="medium">

              {vndPriceFormat(item?.room?.price * 10)}
              {' '}
              VND
            </Text>
          </QuickView>
        </QuickView>
        <Text
          marginTop={10}

          numberOfLines={1}
          fontSize="small"
          color={lightPrimaryColor}
        >
          {`Sở hữu bởi: ${item?.room?.property?.owner?.fullName}- Ngày đặt: ${moment(item?.updatedAt).format('DD/MM/YYYY')}`}
        </Text>
      </QuickView>
    </TouchableOpacity>
  );

  render() {
    const { booked, getListBooked } = this.props;
    console.log('booked', booked);

    return (
      <Container>
        <Header backIcon title="Danh sách đã đặt" />
        <Body>
          <FlatList
            list={booked}
            // data={DATA}
            getList={(query?: TQuery) => getListBooked(
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
  booked: parseArraySelector(applyArraySelector(getBookedListSelector, state)),

});

const mapDispatchToProps = (dispatch: any) => ({
  getListBooked: (query?: TQuery) => dispatch(bookedGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooked);
