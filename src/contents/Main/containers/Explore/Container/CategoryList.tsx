/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { FlatList as RNFlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { QuickView, Text, Image } from '@components';
import { vndPriceFormat } from '@utils/functions';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';

interface Props {
  categoryName?: string;
  data: Array<any>;
  mode?: number;
}
export class CategoryList extends PureComponent<Props> {
  renderThemeOne = (item: any) => (
    <QuickView style={{ width: 180 }} marginRight={20}>
      <Image source={{ uri: item?.coverUrl }} width={180} height={140} />
      <QuickView marginTop={15} marginLeft={10}>
        <Text type="paragraph" bold>
          {vndPriceFormat(item.price)}
        </Text>
        <Text marginTop={5} fontSize="small">
          {item.area}
        </Text>
        <Text
          marginTop={10}
          icon={{
            name: 'map-pin',
            color: lightPrimaryColor,
            type: 'feather',
            size: 12,
          }}
          fontSize="tiny"
          color="#77858C">
          {item.address}
        </Text>
      </QuickView>
    </QuickView>
  );

  renderThemeTwo = (item: any) => (
    <QuickView width={300} height={140} borderRadius={20} marginRight={20}>
      <QuickView
        backgroundImage={{
          source: { uri: item.coverUrl },
          imageStyle: { borderRadius: 20 },
        }}
        width={300}>
        <QuickView
          marginTop={100}
          marginRight={20}
          alignSelf="flex-end"
          borderRadius={10}
          backgroundColor="#FFFFFF"
          padding={5}
          row>
          <Text>Chỉ </Text>
          <Text bold color={lightPrimaryColor}>
            {vndPriceFormat(item.price)}/ căn/ tháng
          </Text>
        </QuickView>
      </QuickView>
    </QuickView>
  );

  renderRowItem = ({ item }: { item: any }) => {
    const { mode } = this.props;
    let theme = null;
    switch (mode) {
      case 1:
        theme = this.renderThemeOne(item);
        break;
      case 2:
        theme = this.renderThemeTwo(item);
        break;
      default:
        break;
    }

    return theme;
  };

  render() {
    const { categoryName, data } = this.props;
    // const data = [
    //   {
    //     coverUrl:
    //       'https://s3-alpha-sig.figma.com/img/0f14/5640/1a7cb0f8a6af33580734b2403203ba82?Expires=1599436800&Signature=ZqKbSbcQCsR6Qc~GwwGlEnDzSwG8ALOqXyFDP8i3eWNrDpw0Bm6FxOOE-adJ4OBYsjjcCtFhNunhqYlj4lwQE1xTzD3v6uaQJeYqT~jpy8msPp4ye3xbwSllFmo5HDVfIPhs5VSHt~RY4419L-7gx9r55aQFrkv55YgF1YD8VI5l6pbfIZImRgyqvgTmCbe~8Rp41iY7BTpPPr7-F0vZOn84z9LcG7BQcgEXuZ-TdbPufkCxloZ4VEAEI75MvtIA8m7-SaQuSMeC9sSTXmXdnAZ9OhFtHl3IG7Y5yn3SEpNhU7MESqJg3XcCge1rESICCIpT6raiEsFS-iL5S1kJvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    //     price: 1000000,
    //     address: 'Thanh Khê',
    //     area: '60m2',
    //   },
    //   {
    //     coverUrl:
    //       'https://s3-alpha-sig.figma.com/img/eb48/87a0/c4fa0f3907b14d0a3dbb91e7ca06cf1e?Expires=1599436800&Signature=IwrBjg8KcqjRbRY3MQvpK6f~H2ROfQrDfITJCWY5i3lmUN9hgZXpdvP0eSaPoCB3lRat~GVYYWpCS0eEpaH5SjXvEjwm380rjWh9hJV-4LU~KmlUQMIooDYu3X4Fdsn0Jz5JjsrCleS7iofIM8Nb0-9ojxSrs0d0x6-R70BlEdlWhAYlc7UAonpbqH-tK4Tqi1KgrHami1Lb-zOAn56W937UOjdunYPx5bXTm4cVegtNr9ipsXFO6VXHOzwCpVbe4BdNEKNVys0hYBQ~JskmW10BBK~oOWhJJAH8pPMsS-8o5yP3wschvZkpK78iOVL~47ayi3ycq1Il4IiQUchOrA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    //     price: 800000,
    //     address: 'Liên Chiểu',
    //     area: '60m2',
    //   },
    //   {
    //     coverUrl:
    //       'https://s3-alpha-sig.figma.com/img/0f14/5640/1a7cb0f8a6af33580734b2403203ba82?Expires=1599436800&Signature=ZqKbSbcQCsR6Qc~GwwGlEnDzSwG8ALOqXyFDP8i3eWNrDpw0Bm6FxOOE-adJ4OBYsjjcCtFhNunhqYlj4lwQE1xTzD3v6uaQJeYqT~jpy8msPp4ye3xbwSllFmo5HDVfIPhs5VSHt~RY4419L-7gx9r55aQFrkv55YgF1YD8VI5l6pbfIZImRgyqvgTmCbe~8Rp41iY7BTpPPr7-F0vZOn84z9LcG7BQcgEXuZ-TdbPufkCxloZ4VEAEI75MvtIA8m7-SaQuSMeC9sSTXmXdnAZ9OhFtHl3IG7Y5yn3SEpNhU7MESqJg3XcCge1rESICCIpT6raiEsFS-iL5S1kJvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    //     price: 1000000,
    //     address: 'Hải Châu',
    //     area: '60m2',
    //   },
    // ];
    return (
      <QuickView>
        <QuickView
          marginTop={40}
          row
          alignItems="center"
          justifyContent="space-between">
          <Text type="title" bold>
            {categoryName}
          </Text>
          <TouchableOpacity onPress={() => {}} style={{ padding: 5 }}>
            <Text fontSize="small" color="#B1ADAD">
              View All
            </Text>
          </TouchableOpacity>
        </QuickView>
        <RNFlatList
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
          horizontal
          data={data}
          renderItem={this.renderRowItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (state: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
