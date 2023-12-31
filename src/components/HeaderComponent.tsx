import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/src/types';
import { getHeaderTitle } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { type LayoutChangeEvent, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
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
      transform: [{ translateY: easedValue.value * -height }],
    }),
    [easedValue, height, top],
  );
  const animatedTextStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(easedValue.value, [0, 1], [1, Platform.OS === 'android' ? 0.75 : 0]),
      transform:
        Platform.OS === 'android'
          ? [
              { scale: interpolate(easedValue.value, [0, 1], [1, 0.75]) },
              { translateY: interpolate(easedValue.value, [0, 1], [0, 18]) },
            ]
          : undefined,
    }),
    [easedValue],
  );

  return (
    <Animated.View style={[styles.root, { paddingTop: Math.max(top, 16) }, animatedStyle]}>
      <BlurView style={[StyleSheet.absoluteFill, styles.background]} />
      <View onLayout={onLayout} style={styles.padding}>
        <Animated.Text style={[styles.title, animatedTextStyle]}>{title}</Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: GREY_COLOR,
  },
  padding: { paddingTop: 8, paddingHorizontal: 16, paddingBottom: 16 },
  title: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  background: {
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
});
