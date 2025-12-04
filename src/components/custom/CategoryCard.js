import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from "../../utils/colors/Colors";

// فانكشن لتوليد قيم الأزرار
const generateButtonValues = (count) => {
  const pairs = count / 2;
  const values = [];
  for (let i = 1; i <= pairs; i++) {
    const value = i * 200;
    values.push(value, value);
  }
  return values;
};

const CategoryCard = ({ category }) => {
  const { category_name, photo, questions_count } = category;
  const values = generateButtonValues(questions_count);
  const isTwoColumns = questions_count > 4;

  return (
    <View style={styles.cardContainer}>

      <ImageBackground
        source={
          category.photo
            ? { uri: category.photo }
            : require('../../../assets/images/MeenGaddhaLogo.png')
        }
        style={styles.image}
        imageStyle={{ borderRadius: moderateScale(16) }}
      >
        <View style={styles.overlay} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category_name}</Text>
        </View>
      </ImageBackground>

      <View
        style={[
          styles.buttonsContainer,
          isTwoColumns && { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }
        ]}
      >
        {values.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              isTwoColumns && { width: "48%" }  // عمودين إذا 6 أو 8
            ]}
          >
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "23%",
    marginBottom: verticalScale(20),
  },

  image: {
    width: "100%",
    height: verticalScale(61),  
    justifyContent: "center",  
    alignItems: "center",       
    borderRadius: moderateScale(16),
    overflow: "hidden",        
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
  },

  title: {
    color: "#fff",
    fontSize: moderateScale(18),
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    marginTop: verticalScale(10),
    justifyContent: "center",  
    alignItems: "center",      
  },

  button: {
    backgroundColor: Colors.colors.primary,
    paddingVertical: verticalScale(8),
    width: verticalScale(114),
    borderRadius: moderateScale(19),
    marginBottom: verticalScale(8), 
    alignItems: "center",      
  },

  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
});
