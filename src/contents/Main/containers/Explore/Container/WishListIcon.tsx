/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { QuickView, Text } from '@components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { toggleFavoriteProject } from '../redux/api';

interface Props {
  active: boolean;
  id: number;
  onPress?: () => any;
}
interface State {
  active: boolean;
}
class WishlistIcon extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { active } = this.props;
    this.state = {
      active,
    };
  }

  toggleStatus = async (id: number | undefined) => {
    const { active } = this.state;
    if (id) {
      try {
        // const result = await toggleFavoriteProject(id);
        this.setState({ active: !active });
        // return result;
      } catch (error) {}
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
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <QuickView row alignItems="center">
          <Icon
            name={active ? 'heart' : 'heart-outline'}
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
