import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const PhotoLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator size={80} color="#FFFF00" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 100,
    height: 100,
    borderRadius: 50,
	// backgroundColor: 'rgba(255, 255, 0, 0.2)', // Полупрозрачный желтый фон
    justifyContent: 'center',
    alignItems: 'center',
  },
});


