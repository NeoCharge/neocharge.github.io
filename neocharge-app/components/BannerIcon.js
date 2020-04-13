import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const BannerIcon = props => {

  return (
    <View style={styles.imageContainer}>
        <Image 
          style={styles.imageStyle}
          source={require('../assets/NeoCharge-Banner-Logo.png')}
          resizeMode='contain'/>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 20
  },
  imageStyle: {
    width: 50,
    height: 50

  }
});

export default BannerIcon;