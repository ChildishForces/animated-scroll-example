import type { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { TabBarButton } from './TabBarButton';
import { TAB_BAR_HEIGHT, TRANSITION_QUICK } from '../constants';
import { useScrollContext } from '../context/ScrollContext';
import { useBinaryTabBar } from '../state/settings';

export const TabBarComponent: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  descriptors,
  insets,
}) => {
  // Context
  const [scrollValue] = useScrollContext();

  // External State
  const [tabBarBinaryCollapse] = useBinaryTabBar();

  // State
  const [height, setHeight] = useState(0);

  // Animated
  const easedValue = useDerivedValue(() => Easing.ease(scrollValue.value), [scrollValue]);
  const shownAmount = useDerivedValue(
    () => withTiming(scrollValue.value > 0.5 ? 1 : 0, TRANSITION_QUICK),
    [scrollValue],
  );
  const correctValue = useDerivedValue(
    () => (tabBarBinaryCollapse ? shownAmount.value : easedValue.value),
    [tabBarBinaryCollapse],
  );
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: correctValue.value * height }],
    }),
    [correctValue, height],
  );

  // Methods
  const handleLayout = (event: LayoutChangeEvent) => setHeight(event.nativeEvent.layout.height);

  return (
    <Animated.View
      style={[
        styles.root,
        styles.center,
        { paddingBottom: Math.max(insets.bottom, 16) },
        animatedStyle,
      ]}
      onLayout={handleLayout}>
      <View style={styles.container}>
        <BlurView style={StyleSheet.absoluteFill} />
        <View style={[styles.row, styles.gap, styles.center]}>
          {state.routes.map((route, index) => (
            <React.Fragment key={index}>
              <TabBarButton
                state={state}
                route={route}
                index={index}
                descriptors={descriptors}
                navigation={navigation}
                insets={insets}
              />
              {index !== state.routes.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    left: 16,
    right: 16,
    bottom: 0,
    position: 'absolute',
  },
  container: {
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_HEIGHT / 2,
    backgroundColor: 'rgba(220,220,220,0.5)',
    overflow: 'hidden',
    padding: 8,
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 16,
  },
  row: { flexDirection: 'row' },
  gap: { gap: 16 },
  button: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    aspectRatio: 1,
    borderRadius: 999,
    height: '100%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
