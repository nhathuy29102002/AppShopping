import React from 'react';
import { Image } from 'react-native';

import { SCREEN_WIDTH } from '~/constants';

export const Banner = (props) => {
  const { gapHorizontal = 16, borderRadius = 10 } = props;

  const imageURI =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZghFE4KlGyrb5TfTgzHVjpSXN6x1kEz1X1g&s';

  return (
    <Image
      resizeMode='cover'
      style={{
        width: SCREEN_WIDTH - gapHorizontal * 2,
        height: SCREEN_WIDTH * 0.35,
        marginHorizontal: gapHorizontal,
        borderRadius: borderRadius,
      }}
      source={{
        uri: imageURI,
      }}
    />
  );
};
