import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { GREY_COLOR, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../constants';
import { getTitleLengths } from '../utilities/math';

interface SkeletonProps {
  index: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ index }) => {
  // Computed Values
  const firstLineLengths = useMemo(() => getTitleLengths(), []);

  return (
    <View style={[styles.fullWidth, styles.gap]}>
      <Image
        style={styles.image}
        source={{
          uri: `https://picsum.photos/seed/${index}/${THUMBNAIL_HEIGHT}/${THUMBNAIL_WIDTH}`,
        }}
      />
      <View style={[styles.fullWidth, styles.wrap, styles.row, styles.gap]}>
        {firstLineLengths.map((length, index) => (
          <View key={index} style={[styles.title, { width: `${length}%` }]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  gap: { gap: 8 },
  row: { flexDirection: 'row' },
  wrap: { flexWrap: 'wrap' },
  image: {
    borderRadius: 8,
    aspectRatio: 800 / 480,
    resizeMode: 'cover',
  },
  title: {
    borderRadius: 4,
    height: 14,
    backgroundColor: GREY_COLOR,
  },
});
