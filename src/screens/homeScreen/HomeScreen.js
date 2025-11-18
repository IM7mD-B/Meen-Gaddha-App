import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import apiRequests from '../../api/api';
import Colors from '../../utils/colors/Colors';
import Header from "../../components/shared/Header";
import { Fonts } from '../../../assets/fonts/Fonts';

// مقاسات الكارد
const CARD_WIDTH = scale(221);
const CARD_SPACING = scale(15);
const CARD_HEIGHT = scale(330);


const HomeScreen = () => {
  const [popular, setPopular] = useState([]);
  const [exclusive, setExclusive] = useState([]); 

  const [activeIndex, setActiveIndex] = useState(0);

  // API 
  useEffect(() => {
    loadPopular();
    loadExclusiveCategories(); 
  }, []);

  const loadPopular = async () => {
    try {
      const res = await apiRequests.getMostSelectedCategory();
      setPopular(res.data.data || []);
    } catch (err) {
      console.log('Error Popular:', err);
    }
  };

  const loadExclusiveCategories = async () => { 
    try {
      const res = await apiRequests.getCollection();
      setExclusive(res.data.data[0]?.category || []); 
    } catch (err) {
      console.log('Error Exclusive:', err);
    }
  };

  //  الكارد اللي بالنص 
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });

  //  كارد الأكثر شهرة 
  const renderPopular = ({ item, index }) => {
    const isActive = index === activeIndex;

    const cardHeight = isActive ? verticalScale(350) : CARD_HEIGHT;
    const cardWidth = isActive ? scale(230) : CARD_WIDTH;
    const imageSize = isActive ? scale(165) : scale(140);

    return (
      <View style={[ styles.card,{ height: cardHeight, width: cardWidth } ]} >
        <Image
          source={{ uri: item.photo }}
          style={[ styles.popularImage, { width: imageSize, height: imageSize } ]}
        />
        <Text style={styles.cardText}>{item.category_name}</Text>
      </View>
    );
  };

  //  كارد الفئات الحصرية
  const renderExclusive = ({ item }) => ( 
    <View style={styles.exclusiveWrapper}> 
      <View style={styles.exclusiveCard}> 
        <Image source={{ uri: item.photo }} style={styles.exclusiveImage} /> 
      </View>
      <Text style={styles.exclusiveText}>{item.category_name}</Text> 
    </View>
  );


  const flatListRef = useRef(null);

  useEffect(() => {
    if (!popular.length) return;

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % popular.length;

      flatListRef.current?.scrollToOffset({
        offset: index * (CARD_WIDTH + CARD_SPACING),
        animated: false,
      });

      setActiveIndex(index);
    }, 3000);

    return () => clearInterval(interval);
  }, [popular]);


  return (
    <View style={styles.container}>
      {/* Header */}
      <Header showProfile />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(50) }}
      >

        <Text style={[styles.sectionTitle, { marginBottom: verticalScale(30) }]}>
          الأكثر شهرة
        </Text>

        {/* Carousel */}
        <FlatList
          ref={flatListRef}
          data={popular}
          horizontal
          renderItem={renderPopular}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: scale(60),
          }}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
        />

        <Text style={[styles.sectionTitle, { marginTop: verticalScale(25) }]}>
          الفئات الحصرية
        </Text>

        <FlatList
          data={exclusive} 
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          renderItem={renderExclusive} 
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{
            paddingHorizontal: scale(16),
            paddingTop: verticalScale(15),
          }}
        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
  },

  card: {
    width: CARD_WIDTH,
    height: verticalScale(300),
    backgroundColor: Colors.colors.primary,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(CARD_SPACING / 3),
    padding: scale(10),
  },

  popularImage: {
    width: scale(150),
    height: scale(150),
    resizeMode: 'contain',
    marginBottom: verticalScale(10),
  },

  cardText: {
    color: 'white',
    fontSize: moderateScale(20),
    fontFamily: Fonts.FontMedium,
    textAlign: 'center',
  },

 
  sectionTitle: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.FontBold,
    marginVertical: verticalScale(20),
    marginStart: scale(16),
    writingDirection: 'rtl',
  },

  exclusiveWrapper: { 
    width: scale(101),
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },

  exclusiveCard: { 
    width: scale(101),
    height: scale(107),
    backgroundColor: Colors.colors.primary,
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5),
  },

  exclusiveImage: { 
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
  },

  exclusiveText: { 
    marginTop: verticalScale(6),
    fontSize: moderateScale(14),
    fontFamily: Fonts.FontMedium,
    textAlign: 'center',
  },
});

export default HomeScreen;
