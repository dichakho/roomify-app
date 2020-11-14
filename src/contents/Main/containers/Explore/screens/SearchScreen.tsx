/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body, Container, Header, Text,
} from '@components';
import { Color } from '@themes/Theme';
import React, { PureComponent } from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';

interface State {
  search: string;
}
interface Props {}
class SearchScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  updateSearch = (search: string) => {
    this.setState({ search });
  };

  renderCenterComponent = () => {
    const { search } = this.state;
    return (
      <SearchBar
        // onClear={this.onClear}
        // onSubmitEditing={this.onSubmitEditing}
        inputStyle={{ fontSize: 14, color: lightComponentColor.textColor }}
        onChangeText={this.updateSearch}
        value={search}
        // platform="ios"
        lightTheme
        placeholder="Search by Location, Area or Pin Code"
        searchIcon={false}
        // searchIcon={{
        //   name: 'chevron-left',
        //   type: 'entypo',
        //   color: lightComponentColor.textColor,
        // }}
        clearIcon={{ color: lightComponentColor.textColor }}
        placeholderTextColor={lightComponentColor.textColor}
        containerStyle={{
          width: '100%',
          elevation: 20,
          backgroundColor: Color.grey2,
          borderWidth: 1,
          borderColor: 'rgba(177, 173, 173, 0.2)',
          borderRadius: 10,
        }}
        inputContainerStyle={{
          height: 30,
          borderRadius: 22.5,
          backgroundColor: Color.grey2,
        }}
      />
    );
  };

  render() {
    return (
      <Container>
        <Header
          backIcon
          placement="left"
          centerComponent={this.renderCenterComponent()}
        />
        <Body>
          <Text>Hello</Text>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
