/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body,
} from '@components';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import PropertyCart from '@components/Custom/PropertyCart';

interface Props {
  t: any;
}
const SavedListScreen = ({ t }) => {
  const DATA = [
    {
      id: '92922929',
      thumbnail:
        'https://cf.bstatic.com/images/hotel/max1024x768/130/130881399.jpg',
      address: '252 1st Avenue',
      price: 499,
      totalBed: 4,
      totalBath: 2,
    },
    {
      id: '92922929',
      thumbnail:
        'https://cf.bstatic.com/images/hotel/max1024x768/130/130881399.jpg',
      address: '252 1st Avenue',
      price: 499,
      totalBed: 4,
      totalBath: 2,
    },
    {
      id: '92922929',
      thumbnail:
        'https://cf.bstatic.com/images/hotel/max1024x768/130/130881399.jpg',
      address: '252 1st Avenue',
      price: 499,
      totalBed: 4,
      totalBath: 2,
    },
    {
      id: '92922929',
      thumbnail:
        'https://cf.bstatic.com/images/hotel/max1024x768/130/130881399.jpg',
      address: '252 1st Avenue',
      price: 499,
      totalBed: 4,
      totalBath: 2,
    },
  ];
  return (
    <Container>
      <Header title={t('header:saved')} />
      <Body>
        <ScrollView>
          {DATA.map((item, index) => (
            <QuickView marginBottom={30}>
              <PropertyCart key={item.id} data={item} />
            </QuickView>
          ))}
        </ScrollView>
      </Body>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(SavedListScreen as any);
