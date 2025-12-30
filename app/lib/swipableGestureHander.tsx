import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// Define props interface
interface SwipeableGestureHandlerProps {
  onDelete: () => void;
}

// Right action component with proper typing
function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onDelete: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    // Smooth opacity and scale animation as you swipe
    const opacity = interpolate(drag.value, [-100, 0], [1, 0]);

    const scale = interpolate(drag.value, [-100, 0], [1, 0.5]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={onDelete}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Delete item"
    >
      <Reanimated.View style={styleAnimation}>
        <Text style={styles.deleteText}>Delete</Text>
      </Reanimated.View>
    </TouchableOpacity>
  );
}

export const SwipeableGestureHandler: React.FC<
  PropsWithChildren<SwipeableGestureHandlerProps>
> = ({ children, onDelete }) => {
  const translateX = useSharedValue(0);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSwipeEnd = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      translateX.value = withTiming(-400, { duration: 300 }, () => {
        scheduleOnRN(onDelete);
      });
    }
  };

  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      // overshootRight={false}
      rightThreshold={40}
      renderRightActions={(prog, drag) => RightAction(prog, drag, onDelete)}
      onSwipeableWillOpen={() => handleSwipeEnd('right')}
    >
      <Reanimated.View style={rowStyle}>{children}</Reanimated.View>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  swipeable: {
    backgroundColor: '#f5f3f7',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
