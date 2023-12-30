import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useScrollContext } from '../context/ScrollContext';
import { ValuesType } from '../types';

interface TabBarButtonProps extends BottomTabBarProps {
  index: number;
  route: ValuesType<TabNavigationState<ParamListBase>['routes']>;
}

export const TabBarButton: React.FC<TabBarButtonProps> = ({
  index,
  state,
  descriptors,
  navigation,
  route,
}) => {
  const [scrollValue, resetScrollValue] = useScrollContext();

  // Computed Values
  const { options } = descriptors[route.key];
  const Icon = options.tabBarIcon!;
  const isFocused = state.index === index;

  // Methods
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      if (scrollValue.value > 0) {
        resetScrollValue();
      }

      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      style={styles.button}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon focused={isFocused} color={isFocused ? '#006ad3' : '#444'} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    aspectRatio: 1,
    borderRadius: 999,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
