import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryCard from '../../components/custom/CategoryCard';
import GameHeader from '../../components/custom/GameHeader';
import Colors from "../../utils/colors/Colors";

// ميثود تقسيم الكاتوقريز إلى صفوف كل صف 4 عناصر
const chunkRows = (arr, size = 4) => {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
};

export default function GameScreen() {
  const mockCategories = [
    { id: 1, category_name: "أكلات", photo: "", questions_count: 8 },
    { id: 2, category_name: "ولا كلمه", photo: "", questions_count: 8 },
    { id: 3, category_name: "براندات", photo: "", questions_count: 8 },
    { id: 4, category_name: "مسلسلات وأفلام", photo: "", questions_count: 8 },
    { id: 5, category_name: "أكلات", photo: "", questions_count: 8 },
    { id: 6, category_name: "ولا كلمه", photo: "", questions_count: 8 },
    { id: 7, category_name: "براندات", photo: "", questions_count: 8 },
    { id: 8, category_name: "مسلسلات وأفلام", photo: "", questions_count: 8 },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Orientation.lockToLandscape(); 
    setCategories(mockCategories);

    return () => Orientation.unlockAllOrientations();
  }, []);

  const rows = chunkRows(categories);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <GameHeader gameName="اسم اللعبه" />

      <SafeAreaView style={styles.safeContainer}>
        {rows.map((row, index) => (
          <View
            key={index}
            style={[
              styles.row,
              row.length < 4 && styles.centerRow 
            ]}
          >
            {row.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.colors.background,
    padding: moderateScale(16),
  },

  safeContainer: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: verticalScale(20),
  },

  centerRow: {
    justifyContent: 'center',   
    gap: scale(20),             
  },
});
