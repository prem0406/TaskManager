import { TaskScreen } from './app/taskScreen/task.screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <TaskScreen />
    </SafeAreaProvider>
  );
}

export default App;
