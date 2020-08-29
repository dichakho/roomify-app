/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { QuickView, Text, Container, Header, Body } from '@components';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';

interface Props {
  t: any;
}
class AlertListScreen extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Header title={t('header:alert')} />
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

export default compose(withReduce, withTranslation())(AlertListScreen as any);
