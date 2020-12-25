/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { QuickView, Text } from '@components';
import { Color } from '@themes/Theme';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { post } from '@utils/api';
import { favoritePropertyApi } from '../redux/api';
// import { toggleFavoriteProject } from '../redux/api';

interface Props {
  active: boolean;
  id: number;
  onPress?: () => any;
}
interface State {
  active: boolean | null;
}
class WishlistIcon extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: null,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (_.isNull(prevState.active)) {
      return { active: nextProps.active };
    }
    return { ...prevState };
  }

  toggleStatus = async (id: number | undefined) => {
    const { active } = this.state;
    if (id) {
      const data = {
        propertyId: id,
      };
      try {
        // await favoritePropertyApi(data);
        await post('/favorite-property', data);
        this.setState((prevState: any) => ({ active: !prevState.active }));
        // return result;
      } catch (error) {
        console.log('error', error);
      }
    } else {
    }
  };

  onPress = async () => {
    const { id, onPress } = this.props;
    await this.toggleStatus(id);
    if (onPress) {
      onPress();
    }
  };

  render() {
    const { active } = this.state;
    const { active: activeProps } = this.props;
    console.log('active', active);
    console.log('activeProps', activeProps);

    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <QuickView
          borderRadius={20}
          width={40}
          height={40}
          backgroundColor={Color.grey}
          center
          // alignItems="center"
        >
          <Icon
            type="entypo"
            name={active ? 'heart' : 'heart-outlined'}
            color="#D36363"
            size={24}
          />
          {/* <Text marginLeft={5} fontSize={14} bold={active}>
            Yêu thích
          </Text> */}
        </QuickView>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WishlistIcon);
