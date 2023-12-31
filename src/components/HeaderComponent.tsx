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
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GREY_COLOR, TRANSITION_QUICK } from '../constants';
import { useHeaderLayout } from '../context/HeaderLayoutContext';
import { useScrollContext } from '../context/ScrollContext';
import { useBinaryTabBar } from '../state/settings';

interface HeaderComponentProps extends BottomTabHeaderProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ route, options, onLayout }) => {
  // External State
  const [tabBarBinaryCollapse] = useBinaryTabBar();

  // Computed Values
  const [scrollValue] = useScrollContext();
  const height = useHeaderLayout();
  const { top } = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);

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
      transform: [{ translateY: correctValue.value * -height }],
    }),
    [easedValue, height, top],
  );
  const animatedTextStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(correctValue.value, [0, 1], [1, Platform.OS === 'android' ? 0.75 : 0]),
      transform:
        Platform.OS === 'android'
          ? [
              { scale: interpolate(correctValue.value, [0, 1], [1, 0.75]) },
              { translateY: interpolate(correctValue.value, [0, 1], [0, 18]) },
            ]
          : undefined,
    }),
    [correctValue],
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
