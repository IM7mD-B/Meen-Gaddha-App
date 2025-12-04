import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../../utils/colors/Colors';
import Header from "../../components/shared/Header";
import { Fonts } from '../../../assets/fonts/Fonts';

const categories = ['كل الفئات', 'السعودية', 'الرياضة', 'إسلامي'];

const CategoriesScreen = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const numbers = [4, 6, 8];

  const toggleCategory = (category) => {
    if (!selectedNumber) return;

    if (selectedCategories.includes(category)) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([category]);
    }
  };

  const selectNumber = (num) => {
    setSelectedNumber(num);
    setSelectedCategories([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header showBack showTitle title="اختر والعب" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.numbersContainer}>
          {numbers.map((num) => {
            const isActive = selectedNumber === num;
            return (
              <TouchableOpacity
                key={num}
                style={[
                  styles.numberButton,
                  isActive && styles.numberButtonActive
                ]}
                onPress={() => selectNumber(num)}
              >
                <Text style={[styles.unitText, isActive && styles.numberTextActive]}>فئات</Text>
                <Text style={[styles.numberText, isActive && styles.numberTextActive]}>{num}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item);
            return (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  isSelected && styles.categorySelected
                ]}
                onPress={() => toggleCategory(item)}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.filterContainer}>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.colors.background,
  },
  content: {
    padding: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbersContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: verticalScale(20), 
    width: '100%',
  },
  numberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.colors.background,
    borderColor: '#e4e4e4ff',
    borderWidth: 1,
  },
  numberButtonActive: {
    backgroundColor: Colors.colors.primary,
  },
  numberText: { 
    color: Colors.colors.primary, 
    fontFamily: Fonts.FontMedium,
    fontWeight: 'bold', 
    fontSize: moderateScale(18) 
  },
  numberTextActive: { 
    color: '#fff' 
  },
  unitText: {
    color: Colors.colors.primary,
    fontFamily: Fonts.FontMedium,
    fontWeight: 'bold',
    transform: [{ rotate: '-90deg' }], 
    fontSize: moderateScale(14),
  },
  categoriesContainer: { 
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#000',
    marginRight: scale(10),
    backgroundColor: '#F4F4F4',
  },
  categorySelected: {
    borderColor: Colors.colors.primary,
    backgroundColor: '#F4F4F4',
  },
  categoryText: { 
    color: '#000',
    fontFamily: Fonts.FontMedium,
    fontSize: moderateScale(14),
  }, 
  categoryTextActive: { 
    color: Colors.colors.primary
  }, 
  filterContainer: {
    marginTop: verticalScale(30),
    height: verticalScale(200),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CategoriesScreen;
