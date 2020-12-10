/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Body, Text, FlatList, QuickView, Button, ImagePicker,
} from '@components';
import { Icon } from 'react-native-elements';
import { Color } from '@themes/Theme';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Dimensions } from 'react-native';
import { cloudinaryUploadSingle } from '@utils/functions';
import _ from 'lodash';
import { pushPayloadProperty } from '../../redux/slice';

const { width } = Dimensions.get('window');
const amenities = [
  {
    id: 1,
    name: 'WC riêng',
    iconName: 'toilet',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 2,
    name: 'Chỗ để xe',
    iconName: 'parking',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 3,
    name: 'Cửa sổ',
    iconName: 'window-closed-variant',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 4,
    name: 'An ninh',
    iconName: 'security',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 5,
    name: 'Wifi',
    iconName: 'wifi',
    iconType: 'antdesign',
    checked: false,
  },
  {
    id: 6,
    name: 'Tự do',
    iconName: 'clock',
    iconType: 'evilicon',
    checked: false,
  },

  {
    id: 7,
    name: 'Chủ riêng',
    iconName: 'account-key-outline',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 8,
    name: 'Máy lạnh',
    iconName: 'air-conditioner',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 9,
    name: 'Máy nước nóng',
    iconName: 'water-boiler',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 10,
    name: 'Nhà bếp',
    iconName: 'stove',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 11,
    name: 'Tủ lạnh',
    iconName: 'fridge-outline',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 12,
    name: 'Máy giặt',
    iconName: 'washing-machine',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 13,
    name: 'Gác lửng',
    iconName: 'stairs',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 14,
    name: 'Giường',
    iconName: 'bed-outline',
    iconType: 'ionicon',
    checked: false,
  },
  {
    id: 15,
    name: 'Tủ đồ',
    iconName: 'wardrobe-outline',
    iconType: 'material-community',
    checked: false,
  },
  {
    id: 16,
    name: 'Tivi',
    iconName: 'tv-outline',
    iconType: 'ionicon',
    checked: false,
  },
  {
    id: 17,
    name: 'Thú cưng',
    iconName: 'pets',
    iconType: 'material',
    checked: false,
  },
  {
    id: 18,
    name: 'Ban công',
    iconName: 'list-outline',
    iconType: 'ionicon',
    checked: false,
  },
];
interface Props {
  goNextPage: () => any;
  pushData: (data: any) => any;
  dataPost: any;
}
interface State {
  data: Array<any>;
  loadingState: boolean;
  checkNull: boolean;
}
class Utilities extends PureComponent<Props, State> {
  image: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: amenities,
      loadingState: false,
      checkNull: false,
    };
  }

  toggleItem = (id: number) => {
    const { data } = this.state;
    const newArray = [...data];
    newArray.forEach((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
    });
    this.setState({ data: newArray });
  };

  handleData = async () => {
    const { pushData, goNextPage } = this.props;
    const img = this.image.getDataImage();
    if (_.isNull(img)) {
      this.setState({ checkNull: true });
    } else {
      this.setState({ loadingState: true, checkNull: false });
      const result: any = await cloudinaryUploadSingle(img);
      pushData({
        thumbnail: result.url,
      });

      this.setState({ loadingState: false });
      goNextPage();
    }
  };

  renderItem = ({ item }: { item: any }) => (
    <QuickView
      backgroundColor={item.checked ? Color.white : '#E6E9F0'}
      onPress={() => this.toggleItem(item.id)}
      flex={1}
      marginHorizontal={5}
      marginVertical={10}
      style={{
        borderWidth: 1,
        borderColor: item.checked ? lightPrimaryColor : '#E6E9F0',
      }}
      borderRadius={10}
      padding={10}
      row
    >
      <QuickView flex={1}>
        <Icon
          color={item.checked ? lightPrimaryColor : Color.grey6}
          name={item.iconName}
          type={item.iconType}
          size={20}
        />
      </QuickView>
      <QuickView flex={4}>
        <Text
          numberOfLines={1}
          color={item.checked ? lightPrimaryColor : Color.grey6}
        >
          {item.name}
        </Text>
      </QuickView>
    </QuickView>
  );

  renderHeader = () => (
    <QuickView>
      <Text marginLeft={5} marginVertical={10}>
        Tiện ích
      </Text>
    </QuickView>
  );

  renderFooter = () => {
    const { goNextPage } = this.props;
    return <Button title="Tiếp theo" onPress={goNextPage} outline />;
  };

  render() {
    const { data, loadingState, checkNull } = this.state;
    const { goNextPage, dataPost } = this.props;
    console.log('dataPost', dataPost);

    return (
      <Body fullWidth showsVerticalScrollIndicator={false}>
        {/* <FlatList
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          data={data}
          renderItem={this.renderItem}
          numColumns={2}
        /> */}
        <Text marginBottom={20} type="title">Hình ảnh</Text>
        <ImagePicker
          // containerStyle={{ backgroundColor: 'red' }}
              // multi
          textDescription="Bấm vào đây để tải ảnh từ thư viện lên nhé!"
          textDesStyle={{ color: lightPrimaryColor }}
          uploadImgContainer={{
            width: width - 40,
            height: 150,
            // backgroundColor: '#E6E9F0',
            borderRadius: 10,
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: lightPrimaryColor,
          }}
          icon={{
            name: 'image', type: 'evilicon', color: lightPrimaryColor, size: 40,
          }}
          imgUploaded={{
            width: width - 40,
            height: 150,
          }}
          ref={(ref) => {
            this.image = ref;
          }}
        />
        {checkNull ? <Text center>Vui lòng chọn hình ảnh!</Text> : null}
        <QuickView justifyContent="flex-end" flex={1}>
          <Button loadingProps={{ color: lightPrimaryColor }} loading={loadingState} title="Tiếp theo" onPress={this.handleData} outline />
        </QuickView>
      </Body>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dataPost: state.main.explore.toJS().payloadProperty,
});

const mapDispatchToProps = (dispatch: any) => ({
  pushData: (data: any) => dispatch(pushPayloadProperty({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Utilities);
