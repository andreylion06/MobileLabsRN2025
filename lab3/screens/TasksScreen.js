import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClickableObject from '../components/ClickableObject';
import ProgressOverview from '../components/ProgressOverview';
import initialTasks from '../data/taskList';

const TasksScreen = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [taskList, setTaskList] = useState(initialTasks);

  const incrementProgressOverview = (taskId, increment = 1) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, progress: Math.min(task.progress + increment, task.goal) }
          : task
      )
    );
  };

  const handleInteraction = (points, gestureType) => {
    setTotalPoints(prev => prev + points);
    incrementProgressOverview('score100', points);

    const gestureTaskMap = {
      tap: 'tap10',
      doubleTap: 'doubleTap5',
      longPress: 'longPress',
      pan: 'pan',
      pinch: 'pinch',
      swipeRight: 'swipeRight',
      swipeLeft: 'swipeLeft',
    };

    const taskId = gestureTaskMap[gestureType];
    if (taskId) {
      incrementProgressOverview(taskId);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.pointsText}>Очки: {totalPoints}</Text>
      <ProgressOverview tasks={taskList} />
      <View style={styles.clickableArea}>
        <ClickableObject onScore={handleInteraction} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  pointsText: {
    fontSize: 28,
    marginBottom: 200,
  },
  clickableArea: {
    position: 'absolute',
    top: 230,
  },
});

export default TasksScreen;
