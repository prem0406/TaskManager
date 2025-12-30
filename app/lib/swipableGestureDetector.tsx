import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export const SwipableGestureDetector: React.FC<
  PropsWithChildren<{ onDelete: () => void }>
> = ({ children, onDelete }) => {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const handleDelete = () => {
    // Animate out then delete
    translateX.value = withTiming(-400, { duration: 300 }, finished => {
      if (finished) {
        scheduleOnRN(onDelete);
      }
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Store the current position when gesture starts
      contextX.value = translateX.value;
    })
    .onUpdate(event => {
      // Only allow left swipe (negative translation)
      const newValue = contextX.value + event.translationX;
      if (newValue < 0) {
        translateX.value = newValue;
      } else {
        translateX.value = 0;
      }
    })
    .onEnd(event => {
      // Check if swiped past threshold (-100px)
      if (translateX.value < -100) {
        // Snap to show delete button
        translateX.value = withSpring(-100, {
          damping: 20,
          stiffness: 200,
        });
      } else {
        // Return to original position
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Hidden Delete Button */}
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Swipeable Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 1,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
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

// Usage: Wrap your entire app with GestureHandlerRootView once
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
//
// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       {/* Your content */}
//       <CustomSwipeable onDelete={() => deleteTask(id)}>
//         <YourTaskItem />
//       </CustomSwipeable>
//     </GestureHandlerRootView>
//   );
// }
