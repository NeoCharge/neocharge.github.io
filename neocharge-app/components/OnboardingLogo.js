import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const OnboardingLogo = props => {

  return (
    <View style={styles.imageContainer}>
        <Image source={require('../assets/ColorLogo.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 160
  }
});

export default OnboardingLogo;