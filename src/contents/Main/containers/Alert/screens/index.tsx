/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, FlatList,
} from '@components';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';
import NavigationService from '@utils/navigation';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';

interface Props {
  t: any;
}
const DATA = [
  {
    id: 1,
    title: 'Có khách hàng vừa book trọ của bạn',
    content: 'Liên hệ với khách hàng sớm nhất có thể để tiến hành cho thuê nhà trọ của bạn',
    createdAt: '2020-12-15T02:19:57.290Z',
  },
  {
    id: 2,
    title: 'Bạn đã được duyệt trở thành owner',
    content: 'Bây giờ bạn có thể giới thiệu phòng trọ của mình đến với mọi người',
    createdAt: '2020-12-15T03:19:57.290Z',
  },
];
class AlertListScreen extends PureComponent<Props> {
  renderItem = ({ item }: { item: any }) => (
    <QuickView
      row
      onPress={() => {}}
      marginBottom={30}
    >
      <QuickView flex={1.2} marginLeft={-5} alignSelf="center">
        <Icon name="notifications" size={30} color={lightPrimaryColor} />
      </QuickView>
      <QuickView flex={8.8}>
        <Text color={lightPrimaryColor} bold type="paragraph" marginVertical={5}>{item.title}</Text>
        <Text type="subtitle" marginVertical={5}>{item.content}</Text>
        <Text marginVertical={5}>{moment(item.createdAt).fromNow()}</Text>
      </QuickView>
    </QuickView>
  )
  ;

  render() {
    const { t } = this.props;
    return (
      <Container>
        <Header title={t('header:alert')} />
        <Body>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={DATA}
            renderItem={this.renderItem}
          />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(AlertListScreen as any);
