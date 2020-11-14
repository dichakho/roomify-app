/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { QuickView, Text } from '@components';
import { Icon } from 'react-native-elements';

interface Props {
  title: string;
}
interface State {}
class SelectLocation extends PureComponent<Props, State> {
  render() {
    const { title } = this.props;
    return (
      <QuickView marginVertical={10}>
        <Text marginVertical={10}>{title || 'Tiêu đề'}</Text>
        <QuickView
          onPress={() => {}}
          row
          justifyContent="space-between"
          style={{ borderBottomWidth: 1, paddingVertical: 5 }}
        >
          <Text>Đà Nẵng</Text>
          <Icon name="chevron-down" type="entypo" />
        </QuickView>
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation);
