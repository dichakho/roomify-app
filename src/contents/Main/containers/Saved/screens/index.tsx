/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent, FC, useState } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, FlatList,
} from '@components';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import PropertyCart from '@components/Custom/PropertyCart';
import { Global } from '@utils/appHelper';
import AuthPopup from '@components/AuthPopup';

const DATA = [
  {
    id: '9292292',
    thumbnail:
        'https://picsum.photos/1000/1000',
    address: '252 1st Avenue',
    price: 1499000,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '929221929',
    thumbnail:
        'https://picsum.photos/1500/1500',
    address: '252 1st Avenue',
    price: 499000,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '9292229',
    thumbnail:
        'https://picsum.photos/1300/1400',
    address: '252 1st Avenue',
    price: 6000000,
    totalBed: 4,
    totalBath: 2,
  },
  {
    id: '92922929',
    thumbnail:
        'https://picsum.photos/1200/1200',
    address: '252 1st Avenue',
    price: 1200000,
    totalBed: 4,
    totalBath: 2,
  },
];
interface State {
  overlayIsVisible: boolean;
}
interface Props {
  t: any;
  navigation: any;
}
class SavedListScreen extends PureComponent<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      overlayIsVisible: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      if (!Global.token) { this.setState({ overlayIsVisible: true }); }
    });
  }

  toggleOverlay = () => {
    const { overlayIsVisible } = this.state;
    this.setState({ overlayIsVisible: !overlayIsVisible });
  };

  renderItem = ({ item, index }: { item: any; index: number}) => <PropertyCart data={item} />;

  render() {
    const { t } = this.props;
    const { overlayIsVisible } = this.state;

    return (
      <Container>
        <AuthPopup overlayIsVisible={overlayIsVisible} toggleOverlay={this.toggleOverlay} />
        <Header title="Saved Item" />
        <Body>

          <FlatList data={DATA} renderItem={this.renderItem} />
        </Body>
      </Container>
    );
  }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(SavedListScreen as any);
