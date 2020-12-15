import {
  Avatar, FlatList, QuickView, Text,
} from '@components';
import { TArrayRedux } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { cityListSelector } from '../../redux/selector';

interface State {
}
interface Props {
  city: TArrayRedux
  onChange:(item: any) => any;
}
class PopularCity extends PureComponent<Props, State> {
  handleOnPress = (item: any) => {
    console.log('item', item);
    const { onChange } = this.props;
    if (onChange) {
      onChange(item);
    }
  };

  renderItem = ({ item, index }: { item: any; index: number}) => (
    <QuickView onPress={() => this.handleOnPress(item)} center width={120}>
      <Avatar size="medium" rounded source={{ uri: `https://picsum.photos/${index * 200}/${index * 200}` }} />
      <Text marginTop={10} center>{item?.name}</Text>
    </QuickView>
  );

  render() {
    const { city } = this.props;
    return (
      <QuickView paddingVertical={20}>
        <QuickView row>
          <QuickView height={20} style={{ borderLeftWidth: 1, borderColor: 'red' }} />
          <Text marginBottom={10} bold> Thành phố phổ biến </Text>
        </QuickView>
        <FlatList showsHorizontalScrollIndicator={false} horizontal data={city?.data} renderItem={this.renderItem} />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  city: parseArraySelector(applyArraySelector(cityListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularCity);
