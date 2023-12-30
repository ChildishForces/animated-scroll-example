import * as React from 'react';
import { View } from 'react-native';

import { ContentScroller } from '../components/ContentScroller';

export const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ContentScroller />
    </View>
  );
};
