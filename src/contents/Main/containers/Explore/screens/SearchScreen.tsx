/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Container, Header, Text } from '@components';
import { Color } from '@themes/Theme';
import React, { PureComponent } from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

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
        inputStyle={{ fontSize: 14 }}
        onChangeText={this.updateSearch}
        value={search}
        platform="android"
        lightTheme
        placeholder="Search by Location, Area or Pin Code"
        searchIcon={{ color: '#363636' }}
        cancelIcon={{ color: '#363636' }}
        placeholderTextColor="#363636"
        containerStyle={{
          width: '100%',
          elevation: 20,
          backgroundColor: Color.greyS,
          borderWidth: 1,
          borderColor: 'rgba(177, 173, 173, 0.2)',
          borderRadius: 10,
        }}
        inputContainerStyle={{
          height: 30,
          borderRadius: 22.5,
          backgroundColor: Color.greyS,
        }}
      />
    );
  };

  render() {
    return (
      <Container>
        <Header
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
