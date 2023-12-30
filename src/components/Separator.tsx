import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { GREY_COLOR } from '../constants';

export const Separator: React.FC = () => <View style={styles.root} />;

const styles = StyleSheet.create({
  root: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: GREY_COLOR,
    marginVertical: 16,
  },
});
