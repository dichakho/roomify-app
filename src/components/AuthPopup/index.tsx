import React, { PureComponent } from 'react';
import { Overlay } from 'react-native-elements';
import rootStack from '@contents/routes';
import authStack from '@contents/Auth/containers/routes';
import NavigationService from '@utils/navigation';
import { QuickView, Text, Button } from '@components';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';

interface Props {
  overlayIsVisible: boolean;
  toggleOverlay: () => any;
}
interface State {
  stateOverlayIsVisible: boolean
}
class AuthPopup extends PureComponent<Props, State> {
  render() {
    const { overlayIsVisible, toggleOverlay } = this.props;
    return (
      <Overlay
        isVisible={overlayIsVisible}
        // height={200}
        overlayStyle={{ borderRadius: 8, height: 200, width: '80%' }}
      >
        <QuickView>
          <Text center bold type="title" color={lightPrimaryColor} marginTop={32}>
            Thông báo
          </Text>
          <Text center fontSize={16} marginTop={12} marginHorizontal={30}>
            {`Bạn cần đăng nhập
để sử dụng chức năng này.`}
          </Text>
          <QuickView
            row
            justifyContent="space-between"
            paddingHorizontal={30}
            // width={250}
            // marginHorizontal={50}
            // center
            marginTop={12}
          >
            <Button
              outline
              title="Đóng"
              width={110}
              onPress={toggleOverlay}
            />
            <Button
              title="Đăng nhập"
              titleColor="#FFFFFF"
              width={110}
              onPress={() => {
                toggleOverlay();
                NavigationService.navigate(rootStack.authStack, {
                  screen: authStack.loginScreen,
                });
              }}
            />
          </QuickView>
        </QuickView>
      </Overlay>
    );
  }
}

export default AuthPopup;
