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
    paddingTop: 160,
    paddingBottom: 120
  }
});

export default OnboardingLogo;