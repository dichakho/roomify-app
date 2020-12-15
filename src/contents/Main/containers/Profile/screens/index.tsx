import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import {
  Container,
  Header,
  GoToExampleButton,
  Button,
  FlatList,
  Text,
  QuickView,
} from '@components';
import { ListItem, Divider, Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import PickerChangeLanguage from '@contents/Config/Shared/PickerChangeLanguage';
import LogoutButton from '@contents/Auth/containers/Login/Shared/LogoutButton';
import LoginButton from '@contents/Auth/containers/Login/Shared/LoginButton';
import NavigationService from '@utils/navigation';
import { Global } from '@utils/appHelper';
import _ from 'lodash';
import rootStack from '@contents/routes';
import profileStack from '../routes';
import { RoleApi } from '../redux/constant';

const BLUE = '#007AFF';
const GREY = '#8E8E93';

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
    screen: profileStack.account,
    role: [RoleApi.USER, RoleApi.OWNER],
  },
  // {
  //   name: 'Bookings', type: 'screen',
  // },
  {
    name: 'Đăng ký làm chủ nhà',
    type: 'screen',
    screen: profileStack.registerOwner,
    role: [RoleApi.USER],
  },
  {
    name: 'Phòng trọ của tôi',
    type: 'screen',
    screen: profileStack.myProperty,
    role: [RoleApi.OWNER],
  },
  // {
  //   name: 'Help & Support', type: 'screen',
  // },
  {
    name: 'Settings',
    type: 'screen',
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
    if (!_.isEmpty(_.intersection(Global.roleApi, item.role))) {
      return (
        <QuickView onPress={() => NavigationService.navigate(rootStack.profileStack, { screen: item.screen })} height={50} center row>
          <QuickView flex={1}><Text>{item?.name}</Text></QuickView>
          <QuickView><Icon name="chevron-right" /></QuickView>
        </QuickView>
      );
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
        <QuickView paddingHorizontal={10}>
          {/* <GoToExampleButton /> */}
          <LoginButton />
          <LogoutButton />
          {/* <Button onPress={() => NavigationService.navigate(profileStack.registerOwner)} height={50} title="Đăng ký làm chủ nhà" /> */}
          <GoToExampleButton />
        </QuickView>
        <FlatList
          style={{ paddingHorizontal: 20 }}
          data={data}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          renderItem={this.renderItemFlatlist}
        />
      </Container>
    );
  }
}
export default withTranslation()(Settings as any);
