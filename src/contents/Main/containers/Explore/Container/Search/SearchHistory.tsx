import React, { PureComponent } from 'react';
import {
  Avatar, FlatList, QuickView, Text,
} from '@components';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { setSearchHistory } from '../../redux/slice';

interface Props {
  setHistory: (data: any) => any;
  history: Array<string>;
}
interface State {}
class SearchHistory extends PureComponent<Props, State> {
  renderItem = ({ item }: { item: any}) => (
    <QuickView marginBottom={10} alignItems="center" row onPress={() => {}}>
      <Icon style={{ marginRight: 10 }} name="google-maps" type="material-community" size={16} />
      <Text>{item}</Text>
    </QuickView>
  );

  render() {
    const { history } = this.props;
    // console.log('history', history);

    return (
      <QuickView paddingVertical={20}>
        <QuickView row>
          <QuickView height={20} style={{ borderLeftWidth: 1, borderColor: 'red' }} />
          <Text marginBottom={10} bold> Tìm kiếm gần đây </Text>
        </QuickView>
        <FlatList data={history.reverse()} renderItem={this.renderItem} />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  history: state.main.explore.toJS().searchHistory,
});

const mapDispatchToProps = (dispatch: any) => ({
  setHistory: (data: any) => dispatch(setSearchHistory({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
