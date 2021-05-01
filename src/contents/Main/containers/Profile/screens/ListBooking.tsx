import {
  Body, Container, Header, Image, QuickView, Text, FlatList,
} from '@components';
import rootStack from '@contents/routes';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { setIdIntoParams } from '@utils/appHelper';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import exploreStack from '../../Explore/routes';
import { getBookingListSelector } from '../redux/selector';
import { bookingGetList } from '../redux/slice';

interface State {}
interface Props {
  getListBooking: (query?: TQuery) => any;
  booking: TArrayRedux;
}
class ListBooking extends PureComponent<Props, State> {
  // componentDidMount() {
  //   const { getListBooking } = this.props;
  //   getListBooking();
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

          fontSize="small"
          color={lightPrimaryColor}
        >
          {`Tên: ${item?.user?.fullName} - SDT: ${item?.user?.phone}
Ngày đặt: ${moment(item?.createdAt).format('DD/MM/YYYY')}`}
        </Text>
      </QuickView>
    </TouchableOpacity>
  );

  render() {
    const { booking, getListBooking } = this.props;
    console.log('booking', booking);

    return (
      <Container>
        <Header backIcon title="Khu trọ được đặt" />
        <Body>
          <FlatList
            list={booking}
            // data={DATA}
            getList={(query?: TQuery) => getListBooking(
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
  booking: parseArraySelector(applyArraySelector(getBookingListSelector, state)),

});

const mapDispatchToProps = (dispatch: any) => ({
  getListBooking: (query?: TQuery) => dispatch(bookingGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooking);
