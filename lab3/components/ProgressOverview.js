import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const TaskProgress = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.progress >= task.goal).length;
  const progressRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;

  return (
    <View style={styles.wrapper}>
      <ProgressBar progress={progressRatio} color="#3ad406" style={styles.progressBar} />
      {tasks.map(task => (
        <Text key={task.id} style={styles.taskText}>
          {task.label} {task.progress >= task.goal ? '✅' : `(${task.progress}/${task.goal})`}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 180,
    paddingHorizontal: 30,
    width: '100%',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default TaskProgress;
