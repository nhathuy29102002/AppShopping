import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { productApi } from '~/apis';
import {
  Button,
  CartBadge,
  FixedBottom,
  Header,
  IconButton,
  LoadingIndicator,
  Screen,
  Text,
} from '~/components';
import { SCREEN_WIDTH } from '~/constants';
import { colors } from '~/styles';
import {
  getPercentPriceReduction,
  moneyFormat,
  showMessageAddToCart,
} from '~/utils';
import { cartActions } from '~/redux';

const IMAGE_WIDTH = SCREEN_WIDTH * 0.5;

export const ProductDetail = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { params } = route;
  const id = params.data;

  const [data, setData] = useState();

  const navigateToHome = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const getData = async () => {
    const response = await productApi.getOne(id);
    if (response?.data) {
      setData(response.data);
    }
  };

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart(data));
    showMessageAddToCart();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header
        rightComponent={
          <View style={styles.rightRow}>
            <CartBadge />
            <IconButton onPress={navigateToHome} name='goHome' />
          </View>
        }
      />
      <ScrollView style={styles.container}>
        {data && (
          <View style={styles.content}>
            <Image style={styles.image} source={{ uri: data?.image }} />
            <Text variant='titleLarge' style={styles.price}>
              {data?.price && moneyFormat(data?.price)}
            </Text>
            <Text>
              <Text style={styles.priceOld}>
                {data?.priceOld && moneyFormat(data?.priceOld)}
              </Text>
              <Text style={styles.percent}>
                {getPercentPriceReduction(data?.price, data?.priceOld)}
              </Text>
            </Text>
            <Text variant='titleMedium'>{data?.name}</Text>
            <Text>{data?.description}</Text>
          </View>
        )}
        {!data && <LoadingIndicator />}
      </ScrollView>
      {data && (
        <>
          <Button
            onPress={handleAddToCart}
            block
            title={t('productDetaiScreen.addProductToCart')}
            style={styles.fixedButton}
          />
          <FixedBottom />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rightRow: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    alignSelf: 'center',
  },
  container: {
    paddingTop: 8,
  },
  content: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  price: {
    color: colors.primary,
  },
  priceOld: {
    marginTop: 4,
    textDecorationLine: 'line-through',
    color: colors.tertiaryText,
  },
  button: { marginTop: 8 },
  percent: {
    color: colors.error,
  },
  fixedButton: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
});
