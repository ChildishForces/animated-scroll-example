import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Separator } from './Separator';
import { Skeleton } from './Skeleton';
import { TAB_BAR_HEIGHT } from '../constants';
import { useScrollContext } from '../context/ScrollContext';
import { clamp } from '../utilities/math';

export const ContentScroller: React.FC = () => {
  // Context
  const [scrollValue] = useScrollContext();
  const { bottom } = useSafeAreaInsets();

  // Animated
  const previousScrollValue = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      if (event.contentOffset.y < 0 || event.contentOffset.y > event.contentSize.height) {
        return;
      }

      scrollValue.value = clamp(
        scrollValue.value + (event.contentOffset.y - previousScrollValue.value) / 2,
        0,
        TAB_BAR_HEIGHT + bottom,
      );
      previousScrollValue.value = event.contentOffset.y;
    },
    [bottom],
  );

  return (
    <Animated.FlatList
      scrollEventThrottle={16}
      style={styles.root}
      contentContainerStyle={styles.container}
      contentInset={{ top: 16, bottom: 16 + bottom + 40 }}
      data={new Array<undefined>(100)}
      renderItem={({ index }) => <Skeleton index={index} />}
      ItemSeparatorComponent={Separator}
      onScroll={scrollHandler}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
});
