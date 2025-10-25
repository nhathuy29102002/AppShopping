import i18n from 'i18next';
import { Pressable, View } from 'react-native';

import { hideMessage, showMessage as show } from 'react-native-flash-message';

import { Icon, Text } from '~/components';
import { SCREENS } from '~/constants';
import { navigate } from '~/navigators';
import { colors, fontSizes } from '~/styles';

export const showMessage = (msg) => {
  show({
    message: msg,
    type: 'none',
    titleStyle: {
      fontSize: fontSizes.bodyMedium,
      textAlign: 'center',
    },
    textStyle: {
      fontSize: fontSizes.bodyMedium,
      textAlign: 'center',
    },
    backgroundColor: colors.messageBackground,
    color: colors.light,
  });
};

export const showMessageAddToCart = () => {
  return show({
    message: '',
    duration: 5000,
    type: 'info',
    animated: false,
    titleStyle: {},
    style: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      marginBottom: -5,
    },
    onPress: () => {},

    renderCustomContent: () => {
      return (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.65)',
            flexDirection: 'row',
            borderRadius: 20,
            marginBottom: 50,
          }}>
          <Text
            style={{
              color: colors.light,
              paddingLeft: 12,
              paddingVertical: 10,
            }}>
            {i18n.t('addedToCart')} &nbsp;&nbsp; |
          </Text>
          <Pressable
            onPress={() => {
              navigate(SCREENS.CART);
              hideMessage();
            }}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}>
            <Icon size={16} color={colors.light} name='cart' />
            <Text style={{ color: colors.light }}>
              &nbsp;{i18n.t('viewCart')}
            </Text>
          </Pressable>
        </View>
      );
    },
  });
};
