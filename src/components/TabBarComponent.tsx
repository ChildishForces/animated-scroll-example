import type { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { TabBarButton } from './TabBarButton';
import { TAB_BAR_HEIGHT } from '../constants';
import { useScrollContext } from '../context/ScrollContext';

interface TabBarComponentProps extends BottomTabBarProps {
  scrollValue: SharedValue<number>;
}

export const TabBarComponent: React.FC<TabBarComponentProps> = ({
  state,
  navigation,
  descriptors,
  insets,
}) => {
  // Context
  const [scrollValue] = useScrollContext();

  // Animated
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: scrollValue.value }],
    }),
    [scrollValue],
  );

  return (
    <Animated.View style={[styles.root, styles.center, { bottom: insets.bottom }, animatedStyle]}>
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
