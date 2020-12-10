import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body, Button, Input as AppInput, ImagePicker, FlatList,
} from '@components';
import { Color } from '@themes/Theme';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { amenitiesGetList } from '../redux/slice';
import { amenitiesSelector } from '../redux/selector';

const amenitiess = [
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
  getAmenities: (query?: TQuery) => any;
  amenities: TArrayRedux;
  route?: any;
}
interface State {
  data: Array<any>;
}
class CreateRoom extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { getAmenities } = this.props;
    getAmenities({ fields: 'id,name,iconName,iconType', limit: 100 });
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.data.length === 0) {
      return { data: nextProps?.amenities?.data };
    }
    return { ...prevState };
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

  render() {
    const { data } = this.state;
    const { amenities, route } = this.props;
    console.log('🚀 ~ file: CreateRoom.tsx ~ line 221 ~ CreateRoom ~ render ~ route', route.params);

    return (
      <Container>
        <Header backIcon title="Tạo phòng" />
        <Body scroll dismissKeyboard>
          <QuickView scroll paddingHorizontal={20} flex={1}>
            <AppInput
              labelProps={{ marginTop: 20 }}
              inputStyle={{ fontSize: 16 }}
            // ref={(ref: any) => { this.description = ref; }}
              containerStyle={{
                paddingHorizontal: 0,
                // marginBottom: 20,
                backgroundColor: Color.white,
                borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
              }}
              inputContainerStyle={{
                borderColor: Color.black,
                borderBottomWidth: 1,
              // ...hasErrors('description'),
              }}
              label="Tiêu đề phòng"
              showLabel
              validationField="empty"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
              placeholder="Phòng sạch, đẹp, có gác ..."
            />

            <AppInput
              labelProps={{ marginTop: 20 }}
              inputStyle={{ fontSize: 16 }}
            // ref={(ref: any) => { this.description = ref; }}
              containerStyle={{
                paddingHorizontal: 0,
                // marginBottom: 20,
                backgroundColor: Color.white,
                borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
              }}
              inputContainerStyle={{
                borderColor: Color.black,
                borderBottomWidth: 1,
              // ...hasErrors('description'),
              }}
              label="Nội dung mô tả"
              showLabel
              validationField="empty"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
              placeholder="Môi trường sống văn hóa, sạch sẽ ..."
            />
            <AppInput
              keyboardType="number-pad"
              labelProps={{ marginTop: 20 }}
              inputStyle={{ fontSize: 16 }}
            // ref={(ref: any) => { this.description = ref; }}
              containerStyle={{
                paddingHorizontal: 0,
                // marginBottom: 20,
                backgroundColor: Color.white,
                borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
              }}
              inputContainerStyle={{
                borderColor: Color.black,
                borderBottomWidth: 1,
              // ...hasErrors('description'),
              }}
              label="Giá tiền"
              showLabel
              validationField="empty"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
              // placeholder="Môi trường sống văn hóa, sạch sẽ ..."
            />

            <QuickView height={180} marginTop={10}>
              <Text marginVertical={10}>Hình ảnh</Text>
              <ImagePicker
                multi
                uploadImgContainer={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#E6E9F0',
                  borderRadius: 10,
                }}

                // ref={(ref) => {
                //   this.imgs = ref;
                // }}
                imgUploaded={{ width: 120, height: 120 }}
              />
            </QuickView>
            {/* <FlatList
              data={amenities}
              renderItem={this.renderItem}
              numColumns={2}
            /> */}

            <QuickView>
              <Text marginVertical={10}>Tiện ích</Text>
              <QuickView row justifyContent="space-between" style={{ flexWrap: 'wrap' }}>
                {data.map((item) => (
                  <QuickView
                    key={item?.id}
                    backgroundColor={item.checked ? Color.white : '#E6E9F0'}
                    onPress={() => this.toggleItem(item.id)}
                  // flex={1}
                    width="45%"
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
                ))}
              </QuickView>
            </QuickView>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  amenities: parseArraySelector(applyArraySelector(amenitiesSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getAmenities: (query?: TQuery) => dispatch(amenitiesGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
