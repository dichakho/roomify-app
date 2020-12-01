/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body,
} from '@components';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Information from '../Container/CreateProperty/Information';
import Utilities from '../Container/CreateProperty/Utilities';
import Location from '../Container/CreateProperty/Location';
import Confirmation from '../Container/CreateProperty/Confirmation';
import { clearPayloadProperty } from '../redux/slice';

const labels = ['Thông tin', 'Địa chỉ', 'Tiện ích', 'Xác nhận'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: lightPrimaryColor,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: lightPrimaryColor,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: lightPrimaryColor,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: lightPrimaryColor,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: lightPrimaryColor,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: lightPrimaryColor,
};
enum ContentEnum {
  INFORMATION = 0,
  LOCATION,
  UTILITIES,
  CONFIRMATION,
}
interface Props {
  clear: () => any;

}
interface State {
  currentPosition: number;
}
class CreatePropertyScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPosition: 0,
    };
  }

  componentDidMount() {
    const { clear } = this.props;
    clear();
  }

  onPageChange = (position: number) => {
    this.setState({ currentPosition: position });
  };

  goNextPage = () => {
    const { currentPosition } = this.state;
    this.setState({ currentPosition: currentPosition + 1 });
  };

  renderViewPagerPage = (data: any) => {
    let content: any;
    // return (
    //   <>
    //     <Information />
    //     <Location />
    //     <Utilities />
    //     <Confirmation />
    //   </>
    // );
    switch (data) {
      case ContentEnum.INFORMATION:
        content = <Information goNextPage={this.goNextPage} />;
        break;
      case ContentEnum.LOCATION:
        content = <Location goNextPage={this.goNextPage} />;
        break;
      case ContentEnum.UTILITIES:
        content = <Utilities goNextPage={this.goNextPage} />;
        break;
      case ContentEnum.CONFIRMATION:
        content = <Confirmation />;
        break;

      default:
        content = <Information goNextPage={this.goNextPage} />;
        break;
    }
    return content;
  };

  render() {
    const { currentPosition } = this.state;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Container>
          <Header backIcon title="List your space" />
          <Body>
            <QuickView marginTop={20}>
              <StepIndicator
                stepCount={4}
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                onPress={(position) => this.onPageChange(position)}
              />
            </QuickView>

            {this.renderViewPagerPage(currentPosition)}
            {/* <Swiper
            // style={{ flexGrow: 1 }}
            loop={false}
            index={currentPosition}
            autoplay={false}
            // showsButtons
            onIndexChanged={(position) => this.onPageChange(position)}>
            {labels.map((page) => this.renderViewPagerPage(page))}
          </Swiper> */}
          </Body>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  clear: () => dispatch(clearPayloadProperty()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePropertyScreen);
