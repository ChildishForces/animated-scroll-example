import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/src/types';
import { getHeaderTitle } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { type LayoutChangeEvent, StyleSheet, Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GREY_COLOR } from '../constants';
import { useHeaderLayout } from '../context/HeaderLayoutContext';
import { useScrollContext } from '../context/ScrollContext';

interface HeaderComponentProps extends BottomTabHeaderProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ route, options, onLayout }) => {
  // Computed Values
  const [scrollValue] = useScrollContext();
  const height = useHeaderLayout();
  const { top } = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);

  // Animated
  const easedValue = useDerivedValue(() => Easing.ease(scrollValue.value), [scrollValue]);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: easedValue.value * -(height - top) }],
    }),
    [scrollValue, height, top],
  );

  return (
    <Animated.View
      style={[styles.root, { paddingTop: Math.max(top, 16) }, animatedStyle]}
      onLayout={onLayout}>
      <BlurView style={[StyleSheet.absoluteFill, styles.background]} />
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: GREY_COLOR,
    height: 95,
  },
  title: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  background: {
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
});
