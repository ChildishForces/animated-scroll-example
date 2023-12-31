import * as React from 'react';
import { StyleSheet, Switch, SwitchChangeEvent, Text, View } from 'react-native';

import { useBinaryTabBar } from '../state/settings';

export const SettingsScreen = () => {
  // External State
  const [binaryTabBarActive, setBinaryTabBarActive] = useBinaryTabBar();

  // Methods
  const handleSetBinaryTabBar = (event: SwitchChangeEvent) =>
    setBinaryTabBarActive(event.nativeEvent.value);

  return (
    <View style={[styles.gap, styles.center, styles.root]}>
      <View style={[styles.gap, styles.row, styles.center]}>
        <Switch value={binaryTabBarActive} onChange={handleSetBinaryTabBar} />
        <Text>Enable binary tab bar collapse</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  gap: { gap: 16 },
  center: { justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row' },
});
