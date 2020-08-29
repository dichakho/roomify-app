/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { QuickView, Text, Container, Header, Body } from '@components';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';

interface Props {
  t: any;
}
class SavedListScreen extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Header title={t('header:saved')} />
        <Body>
          <QuickView>
            <Text center>Example Screen</Text>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduce, withTranslation())(SavedListScreen as any);
