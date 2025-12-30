import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const UndoToast = ({
  visible,
  message,
  onUndo,
}: {
  visible: boolean;
  message: string;
  onUndo: () => void;
}) => {
  if (!visible) return null;

  return (
    <View style={toastStyles.container}>
      <Text style={toastStyles.text}>{message}</Text>
      <TouchableOpacity onPress={onUndo}>
        <Text style={toastStyles.undo}>UNDO</Text>
      </TouchableOpacity>
    </View>
  );
};

const toastStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  undo: {
    color: '#4ade80',
    fontWeight: '600',
    fontSize: 14,
  },
});
