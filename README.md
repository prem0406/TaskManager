# TaskManager

A simple and clean **Task Manager app built with React Native**.  
It demonstrates swipe-to-delete functionality with smooth animations and a **Gmail-style Undo toast** at the bottom of the screen.

---

## Features

- Add and manage tasks
- Swipe left to reveal a Delete action
- Smooth swipe animations
- Gmail-style bottom toast with **Undo**
- Prevents accidental deletions
- Reusable swipeable component
- Optimized for FlatList usage

---

## Demo Behavior

1. Swipe a task to the left
2. Tap **Delete**
3. Task is removed from the list
4. Bottom toast appears: **“1 archived” | Undo**
5. Tap **Undo** to restore the task
6. If not undone, deletion is finalized after a delay

---

## Tech Stack

- React Native
- React Hooks
- Animated / Reanimated
- PanResponder or Gesture Handler
- Functional components

---

## Installation

Make sure your React Native environment is set up:
https://reactnative.dev/docs/environment-setup

Clone the repository:

```bash
git clone https://github.com/prem0406/TaskManager.git
cd TaskManager
```

Install dependencies:

```
yarn install
```

or

```
npm install
```

---

## Run the App

### Android

```
yarn android
```

### iOS

```
npx pod-install
yarn ios
```

---

## Usage

Wrap your app with `GestureHandlerRootView` (required for swipe gestures):

```
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskManager />
    </GestureHandlerRootView>
  );
}
```

---

## Swipeable Component Usage

```
<CustomSwipeable onDelete={() => handleDelete(task)}>
  <TaskItem task={task} />
</CustomSwipeable>
```

---

## Undo Delete Logic

Deletion happens in two phases.

### Soft Delete

- Item is removed from UI
- Toast with Undo is shown

### Final Delete

- Happens after timeout
- Cancelled if Undo is pressed

Example:

```
const handleDelete = (task) => {
  removeTask(task.id);
  showUndoToast(task);
};
```

```
const handleUndo = () => {
  restoreTask();
};
```

---

## Project Structure

```
src/
 ├── components/
 │   ├── CustomSwipeable.tsx
 │   ├── UndoToast.tsx
 │   ├── TaskItem.tsx
 ├── screens/
 │   ├── TaskListScreen.tsx
 ├── hooks/
 ├── utils/
```

---

## Known Limitations

- Supports left swipe only
- One swipeable row open at a time
- Toast is custom, not native Snackbar

---

## Possible Improvements

- Auto-close previously opened swipe rows
- Height-collapse animation on delete
- Haptic feedback on swipe threshold
- Queue-based toast handling
- Accessibility improvements

---

## Inspiration

- Gmail Android swipe-to-archive UX
- Modern mobile task management apps

---

## License

MIT License

---

## Author

**Prem Kumar**  
GitHub: https://github.com/prem0406
