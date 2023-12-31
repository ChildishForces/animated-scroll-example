import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Separator } from './Separator';
import { Skeleton } from './Skeleton';
import { SCROLL_DISTANCE } from '../constants';
import { useHeaderLayout } from '../context/HeaderLayoutContext';
import { useScrollContext } from '../context/ScrollContext';
import { clamp } from '../utilities/math';

export const ContentScroller: React.FC = () => {
  // Context
  const [scrollValue] = useScrollContext();
  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderLayout();

  // Animated
  const previousScrollValue = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      const { y } = event.contentOffset;

      if (y < 0 || y > event.contentSize.height) {
        return;
      }

      scrollValue.value = clamp(
        scrollValue.value + (y - previousScrollValue.value) / SCROLL_DISTANCE,
        0,
        1,
      );
      previousScrollValue.value = y;
    },
    [bottom],
  );

  // Computed Values
  const contentContainerStyle = useMemo(
    () => ({ paddingTop: 16 + headerHeight + top, paddingBottom: 16 + bottom + 40 }),
    [headerHeight, top, bottom],
  );

  return (
    <Animated.FlatList
      scrollEventThrottle={16}
      style={styles.root}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      data={new Array<undefined>(100)}
      renderItem={({ index }) => <Skeleton key={index} index={index} />}
      ItemSeparatorComponent={Separator}
      onScroll={scrollHandler}
      showsVerticalScrollIndicator={false}
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
