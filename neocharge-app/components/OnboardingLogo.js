import React from 'react';
import { View, StyleSheet} from 'react-native';
import MainLogo from '../assets/main-logo.svg';

const OnboardingLogo = props => {

  return (
    <View style={styles.imageContainer}>
        < MainLogo />
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