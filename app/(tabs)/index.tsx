import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Restart from 'react-native-restart';
import { Accelerometer } from 'expo-sensors';
import { useEffect } from 'react';

export default function HomeScreen() {

  useEffect(() => {
    let subscription: { remove: () => void };
    
    async function checkSensor() {
      const isAvailable = await Accelerometer.isAvailableAsync();
      console.log({isAvailable});
      if (isAvailable) {
        subscription = Accelerometer.addListener(({ x, y, z }) => {
          console.log(x, y, z);
        });
      }
    }
    checkSensor();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Reload bundle" onPress={() => Restart.restart()} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
