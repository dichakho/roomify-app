import {
  Body, Container, Header, Text,
} from '@components';
import { TArrayRedux } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getBookedListSelector } from '../redux/selector';
import { bookedGetList } from '../redux/slice';

interface State {}
interface Props {
  getListBooked: () => any;
  booked: TArrayRedux;
}
class ListBooked extends PureComponent<Props, State> {
  componentDidMount() {
    const { getListBooked } = this.props;
    getListBooked();
  }

  render() {
    const { booked } = this.props;
    console.log('booked', booked);

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
  booked: parseArraySelector(applyArraySelector(getBookedListSelector, state)),

});

const mapDispatchToProps = (dispatch: any) => ({
  getListBooked: () => dispatch(bookedGetList({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooked);
