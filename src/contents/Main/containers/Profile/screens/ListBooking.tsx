import {
  Body, Container, Header, Text,
} from '@components';
import { TArrayRedux } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getBookingListSelector } from '../redux/selector';
import { bookingGetList } from '../redux/slice';

interface State {}
interface Props {
  getListBooking: () => any;
  booking: TArrayRedux;
}
class ListBooking extends PureComponent<Props, State> {
  componentDidMount() {
    const { getListBooking } = this.props;
    getListBooking();
  }

  render() {
    const { booking } = this.props;
    console.log('booking', booking);

    return (
      <Container>
        <Header backIcon title="Danh sách được đặt" />
        <Body>
          <Text>Hello</Text>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  booking: parseArraySelector(applyArraySelector(getBookingListSelector, state)),

});

const mapDispatchToProps = (dispatch: any) => ({
  getListBooking: () => dispatch(bookingGetList({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooking);
