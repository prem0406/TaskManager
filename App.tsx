import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskScreen } from './app/taskScreen/task.screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TaskScreen />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
