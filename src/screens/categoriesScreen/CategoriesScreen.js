import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../../utils/colors/Colors';
import Header from "../../components/shared/Header";
import { Fonts } from '../../../assets/fonts/Fonts';
import apiRequests from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import CategoryCard from "../../components/custom/CategoryCard";
import useGameSettingsStore from '../../store/Store';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [collectionData, setCollectionData] = useState([]);
  const [tabs, setTabs] = useState(["كل الفئات"]);
  const [selectedFilter, setSelectedFilter] = useState("كل الفئات");
  const [filteredData, setFilteredData] = useState([]);
  const {
    questionsCount,
    setQuestionsCount,
    selectedCategory,
    setSelectedCategory,
  } = useGameSettingsStore();

  const numbers = [4, 6, 8];

  const fetchCollection = async () => {
    try {
      const res = await apiRequests.getCollection();
      const data = res?.data?.data ?? [];

      setCollectionData(data);
      setFilteredData(data);

      const dynamicTabs = data.map(item => item.name);
      setTabs(["كل الفئات", ...dynamicTabs]);

    } catch (error) {
      console.log("Error fetching collection:", error);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  const applyFilter = (filter) => {
    setSelectedFilter(filter);

    if (filter === "كل الفئات") {
      setFilteredData(collectionData);
    } else {
      const filtered = collectionData.filter(item => item.name === filter);
      setFilteredData(filtered);
    }
  };

  const selectNumber = (num) => {
    setQuestionsCount(num);

    setSelectedCategory(
      selectedCategory.slice(0, num)
    );
  };



  const toggleCard = (item) => {
    if (!questionsCount) return;

    const alreadySelected = selectedCategory.some(cat => cat.id === item.id);

    let updatedSelection = [];

    if (alreadySelected) {
      updatedSelection = selectedCategory.filter(cat => cat.id !== item.id);
    } else if (selectedCategory.length < questionsCount) {
      updatedSelection = [...selectedCategory, item];
    } else {
      return;
    }

    setSelectedCategory(updatedSelection);

    if (updatedSelection.length === questionsCount) {
      navigation.navigate('GameSettings');
    }
  };



  return (
    <View style={styles.container}>
      <Header showBack showTitle title="اختر والعب" />

      <ScrollView contentContainerStyle={styles.content}>

        {/* Number Selector */}
        <View style={styles.numbersContainer}>
          {numbers.map((num) => {
            const isActive = questionsCount === num;
            return (
              <TouchableOpacity
                key={num}
                style={[styles.numberButton, isActive && styles.numberButtonActive]}
                onPress={() => selectNumber(num)}
              >
                <Text style={[styles.unitText, isActive && styles.numberTextActive]}>فئات</Text>
                <Text style={[styles.numberText, isActive && styles.numberTextActive]}>{num}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tabs */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={(item, idx) => idx.toString()}
          contentContainerStyle={styles.categoriesContainer}
          renderItem={({ item }) => {
            const active = selectedFilter === item;
            return (
              <TouchableOpacity
                style={[styles.categoryButton, active && styles.categorySelected]}
                onPress={() => applyFilter(item)}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Category cards */}
        <View style={styles.cardsContainer}>
          {filteredData?.map((collection) =>
            collection.category?.map((item) => {
              if (!item) return null;

              const isActive = selectedCategory.includes(item.id);

              return (
                <CategoryCard
                  key={item.id}
                  item={item}
                  isActive={selectedCategory.some(cat => cat.id === item.id)}
                  disabled={false}
                  showOverlay={!questionsCount}
                  onPress={() => toggleCard(item)}
                />



              );
            })
          )}
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
    color: Colors.colors.background
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
    alignItems: 'flex-start',
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
  },

  categoryText: {
    color: '#000',
    fontFamily: Fonts.FontMedium,
    fontSize: moderateScale(14),
  },

  categoryTextActive: {
    color: Colors.colors.primary
  },

  cardsContainer: {
    marginTop: verticalScale(10),
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: verticalScale(5),
  },

});

export default CategoriesScreen;
