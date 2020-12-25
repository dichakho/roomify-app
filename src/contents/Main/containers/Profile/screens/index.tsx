import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  FlatList,
  Text,
  QuickView,
} from '@components';
import { Divider, Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import LogoutButton from '@contents/Auth/containers/Login/Shared/LogoutButton';
import LoginButton from '@contents/Auth/containers/Login/Shared/LoginButton';
import NavigationService from '@utils/navigation';
import { Global } from '@utils/appHelper';
import _ from 'lodash';
import rootStack from '@contents/routes';
import profileStack from '../routes';
import { RoleApi } from '../redux/constant';
import exploreStack from '../../Explore/routes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
  },
  separatorComponent: {
    backgroundColor: 'white',
  },

  headerSection: {
    height: 30,
  },
});

interface Props {
  t: any;
  navigation: any;
}

interface State{
  data: Array<any>;
}
const list = [
  {
    name: 'My Account',
    type: 'screen',
    stack: rootStack.profileStack,
    screen: profileStack.account,
    role: [RoleApi.USER, RoleApi.OWNER],
  },
  // {
  //   name: 'Bookings', type: 'screen',
  // },
  {
    name: 'Đăng ký làm chủ nhà',
    type: 'screen',
    stack: rootStack.profileStack,
    screen: profileStack.registerOwner,
    role: [RoleApi.USER],
  },
  {
    name: 'Phòng trọ của tôi',
    type: 'screen',
    stack: rootStack.profileStack,
    screen: profileStack.myProperty,
    role: [RoleApi.OWNER],
  },
  {
    name: 'Tạo không gian, khu trọ',
    type: 'screen',
    stack: rootStack.exploreStack,

    screen: exploreStack.createProperty,
    role: [RoleApi.OWNER],
  },
  {
    name: 'Danh sách khu trọ được đặt',
    type: 'screen',
    stack: rootStack.profileStack,

    screen: profileStack.listBooking,
    role: [RoleApi.OWNER],
  },
  {
    name: 'Danh sách đã đặt',
    type: 'screen',
    stack: rootStack.profileStack,

    screen: profileStack.listBooked,
    role: [RoleApi.USER, RoleApi.OWNER],
  },
  // {
  //   name: 'Help & Support', type: 'screen',
  // },
  {
    name: 'Settings',
    type: 'screen',
    stack: rootStack.profileStack,

    screen: profileStack.setting,
    role: [RoleApi.OWNER, RoleApi.USER],
  },
  // {
  //   name: 'Logout', type: 'screen',
  // },
];

class Settings extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: list,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      this.setState({
        data: list.filter((l) => {
          if (!_.isEmpty(_.intersection(Global.roleApi, l.role))) {
            return l;
          }
        }),
      });
    });
  }

  renderSectionHeader = () => <View style={styles.headerSection} />;

  ItemSeparatorComponent = () => (
    <View style={styles.separatorComponent}>
      <Divider style={{ backgroundColor: '#B1ADAD' }} />
    </View>
  );

  renderItemFlatlist = ({ item }: { item: any}) => {
    const check = _.intersection(Global.roleApi, item.role);

    if (!_.isEmpty(check)) {
      if (item.role.length === 1
        && item.role[0] === RoleApi.USER
        && _.includes(Global.roleApi, RoleApi.OWNER)) {
        return null;
      }
      return (
        <QuickView
          onPress={() => NavigationService.navigate(item.stack, { screen: item.screen })}
          height={50}
          center
          row
        >
          <QuickView flex={1}><Text>{item?.name}</Text></QuickView>
          <QuickView><Icon name="chevron-right" /></QuickView>
        </QuickView>
      );
      // }
    }
    return null;
  };

  keyExtractor = (item: any, index: any) => index;

  render() {
    const { t } = this.props;
    const { data } = this.state;
    return (
      <Container>
        <Header title={t('header:profile')} />
        <QuickView paddingHorizontal={10} />
        <FlatList
          style={{ paddingHorizontal: 20 }}
          data={data}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          renderItem={this.renderItemFlatlist}
        />
        <QuickView paddingHorizontal={20}>
          <LoginButton />
          <LogoutButton onPressCustom={() => {
            this.setState({ data: [] });
            Global.roleApi = [];
          }}
          />
        </QuickView>
      </Container>
    );
  }
}
export default withTranslation()(Settings as any);
