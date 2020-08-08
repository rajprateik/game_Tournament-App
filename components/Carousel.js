import React from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const MyCarousel = ({data}) => {
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.slide}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        sliderWidth={width}
        itemWidth={width - 9}
        data={data}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    marginTop: 10,
  },
  item: {
    flex: 1,
    width: width - 10,
    height: height / 4,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 2}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: width - 10,
    height: height / 5,
    borderRadius: 20,
  },
});
