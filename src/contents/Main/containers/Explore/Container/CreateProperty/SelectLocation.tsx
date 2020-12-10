/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ListCheckBox, QuickView, Text } from '@components';
import { Icon, Overlay } from 'react-native-elements';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import _ from 'lodash';
import { cityListSelector } from '../../redux/selector';

interface Props {
  title: string;
  data: Array<any>;
  onChange?: (value: number) => any;
  requiredValue?: number;
}
interface State {
  overlayIsVisible: boolean;
  selectedValue: number | null;
  dataState: Array<any>;
}
class SelectLocation extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      overlayIsVisible: false,
      selectedValue: null,
      dataState: [],
    };
  }

  // componentDidMount() {
  //   const { data } = this.props;
  //   console.log('data componentDidMount', data[0]?.id);
  //   this.setState({ selectedValue: data[0]?.id });
  // }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const data = [...nextProps.data];
    if (nextProps.data.length !== 0
      && _.difference(data, prevState.dataState).length !== 0
      && prevState.selectedValue === null) {
      return { selectedValue: nextProps.data[0]?.id };
    }
    return { ...prevState, dataState: data };
  }

  handleOnChange= (value: number) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    // console.log('value', value);

    this.setState((prevState: any) => ({ overlayIsVisible: !prevState.overlayIsVisible, selectedValue: value }));
  };

  toggleOverlay = () => {
    this.setState((prevState: any) => ({ overlayIsVisible: !prevState.overlayIsVisible }));
  };

  render() {
    const { title, data } = this.props;
    // console.log('data select location', data);

    const { overlayIsVisible, selectedValue, dataState } = this.state;
    // console.log('selectedValue', selectedValue);
    // console.log('🚀 ~ file: SelectLocation.tsx ~ line 48 ~ SelectLocation ~ render ~ selectedValue', selectedValue);
    const datas = [
      { id: 1, name: 'Mở bán dự án Residences Quy Nhơn' },
      { id: 2, name: 'Công bố dự án Phúc Yên Prosper Phố Đông Thủ Đức' },
      { id: 3, name: 'Công bố dự án Century City Long Thành' },
      { id: 4, name: 'Mở bán dự án Green Dragon City Quảng Ninh' },
    ];
    let selectedLabel = `Chọn ${title}`;

    if (data.length !== 0) {
      selectedLabel = data.filter((d) => d.id === selectedValue)[0]?.name || `Chọn ${title}`;
      // selectedLabel = data[selectedValue - 1]?.name;
    }

    return (
      <QuickView marginVertical={10}>
        <Overlay onBackdropPress={this.toggleOverlay} overlayStyle={{ width: '80%', borderRadius: 8 }} isVisible={overlayIsVisible}>
          <QuickView>
            <QuickView style={{ borderBottomWidth: 1, paddingVertical: 10, borderColor: lightPrimaryColor }}>
              <Text color={lightPrimaryColor} bold center type="title">Thành phố</Text>
            </QuickView>
            <QuickView height={200} scroll>
              <ListCheckBox
                onChange={this.handleOnChange}
                // defaultValue={[data[selectedValue - 1]?.id]}
                // defaultValue={[selectedValue || 1]}
                assistVal={[selectedValue || 1]}
                checkBoxProps={{ checkedColor: lightPrimaryColor }}
                single
                data={data || []}
              />
            </QuickView>
          </QuickView>
        </Overlay>
        <Text marginVertical={10}>{title || 'Tiêu đề'}</Text>
        <QuickView
          onPress={!_.isEmpty(data) ? this.toggleOverlay : () => {}}
          row
          justifyContent="space-between"
          style={{ borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
        >
          <Text>{selectedLabel}</Text>
          <Icon name="chevron-down" type="entypo" />
        </QuickView>
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  // city: parseArraySelector(applyArraySelector(cityListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation);
