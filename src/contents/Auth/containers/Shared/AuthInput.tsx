import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { InputProps } from '@components/Common/Input';
import { Input } from '@components';
import { Color } from '@themes/Theme';

export interface AuthInputProps extends InputProps{
  leftIconName?: string;
}

class AuthInput extends PureComponent<AuthInputProps> {
  static defaultProps = {
    backgroundColor: Color.grey,
    // color: '#727A8E',
    placeholderTextColor: Color.black,
    height: 50,
    center: true,
    // textCenter: true,
    // shadow: true,
    rightIconColor: Color.black,
    containerStyle: { borderWidth: 1 },
  };

  input: any;

  getText = () => this.input.getText();

  focus = () => this.input.focus();

  render() {
    const { leftIconName, theme, ...otherProps } = this.props;
    const leftIcon = leftIconName ? {
      name: leftIconName, size: 22, color: Color.black, marginTop: 3,
    } : undefined;
    return (
      <Input
        ref={(ref: any) => { this.input = ref; }}
        {...otherProps}
        fontSize={18}
        leftIcon={leftIcon}
        containerStyle={{ borderBottomWidth: 0, borderColor: Color.grey }}
        inputContainerStyle={{ borderBottomWidth: 1, borderColor: Color.black }}
      />
    );
  }
}
export default withTheme(
  AuthInput as unknown as React.ComponentType<AuthInputProps & ThemeProps<any>>,
);
