import * as React from 'react';
import { memo, useMemo } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { GREY_COLOR, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../constants';
import { getTitleLengths } from '../utilities/math';

interface SkeletonProps {
  index: number;
}

export const Skeleton: React.FC<SkeletonProps> = memo(({ index }) => {
  // Computed Values
  const firstLineLengths = useMemo(() => getTitleLengths(), []);

  return (
    <View style={[styles.fullWidth, styles.gap]}>
      <Image
        style={styles.image}
        source={{
          uri: `https://picsum.photos/seed/${index + 1}/${THUMBNAIL_HEIGHT}/${THUMBNAIL_WIDTH}`,
        }}
      />
      <View style={[styles.row, styles.gap]}>
        <View style={styles.avatar} />
        <View style={[styles.flex, styles.wrap, styles.row, styles.gap, styles.titlePaddingOffset]}>
          {firstLineLengths.map((length, index) => (
            <View key={index} style={[styles.title, { width: `${length}%` }]} />
          ))}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fullWidth: { width: '100%' },
  gap: { gap: 8 },
  row: { flexDirection: 'row' },
  wrap: { flexWrap: 'wrap' },
  image: {
    borderRadius: 8,
    aspectRatio: 800 / 480,
    resizeMode: 'cover',
    backgroundColor: GREY_COLOR,
  },
  avatar: {
    height: 32,
    width: 32,
    backgroundColor: GREY_COLOR,
    borderRadius: 16,
  },
  title: {
    borderRadius: 4,
    height: 14,
    backgroundColor: GREY_COLOR,
  },
  titlePaddingOffset: {
    paddingTop: (32 - 14) / 2,
  },
});
