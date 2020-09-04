import { Image, Text } from '@components';
import QuickView from '@components/Common/View/QuickView';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { vndPriceFormat } from '@utils/functions';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Property {
  thumbnail: string;
  totalBed: number;
  totalBath: number;
  price: number;
  address: string;
}

interface Props {
  data: Property;
  onPress: (event: GestureResponderEvent) => void;
}

const PropertyCart: FC<Props> = ({ data, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={{ uri: data.thumbnail }} height={160} />
    <QuickView
      marginTop={20}
      justifyContent="space-between"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <QuickView
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text> 1,200 sq.ft </Text>
        <Text fontWeight="bold"> {data.totalBed} Beds </Text>
        <Text fontWeight="bold"> {data.totalBath} Bath </Text>
      </QuickView>
      <Text color="#DC2F2F" fontSize="large" fontWeight="bold">
        ${vndPriceFormat(data.price)}
      </Text>
    </QuickView>
    <Text
      marginTop={10}
      icon={{
        name: 'map-pin',
        color: lightPrimaryColor,
        type: 'feather',
        size: 13,
      }}
      fontSize="small"
      color="#77858C">
      {data.address}
    </Text>
  </TouchableOpacity>
);

export default PropertyCart;
