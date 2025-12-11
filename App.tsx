import { StatusBar, useColorScheme } from 'react-native';
import { TaskScreen } from './app/taskScreen/task.screen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TaskScreen />
    </>
  );
}

export default App;
