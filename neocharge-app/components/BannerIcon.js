import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const BannerIcon = props => {

  return (
    <View style={styles.imageContainer}>
        <Image source={require('../assets/NeoCharge-Banner-Logo.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 20
  }
});

export default BannerIcon;