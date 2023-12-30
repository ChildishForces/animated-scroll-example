export const getRandomWordLength = () => Math.max(20, Math.round(Math.random() * 60));

export const getTitleLengths = () => {
  let total: number = 0;
  const segments: number[] = [];
  const totalLength = 25 + Math.round(Math.random() * 100);

  while (total < totalLength) {
    const value = getRandomWordLength();
    total += value;
    segments.push(value);
  }

  return segments;
};

export const clamp = (value: number, min: number, max: number) => {
  'worklet';

  return Math.max(min, Math.min(max, value));
};
