import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, ImageBackground, Dimensions, SafeAreaView} from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';

import GameHeader from '../../components/custom/GameHeader';
import Colors from "../../utils/colors/Colors";
import useGameSessionStore from '../../store/GameSessionStore';
import useGameSettingsStore from '../../store/Store'; 
import apiRequests from '../../api/api';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameScreen = () => {
  const navigation = useNavigation();
  const { groupId, isGameActive } = useGameSessionStore();
  const { gameName, teamName1, teamName2 } = useGameSettingsStore();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const [openedQuestions, setOpenedQuestions] = useState([]);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => Orientation.unlockAllOrientations();
  }, []);

  useEffect(() => {
    if (!isGameActive || !groupId) {
      navigation.goBack();
      return;
    }

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await apiRequests.getGameByGroupId(groupId);

        if (response?.data?.categories) {
          setCategories(response.data.categories);
        } else if (response?.data?.data?.categories) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [groupId, isGameActive]);

  const handlePointPress = (categoryId, pointValue) => {
    const questionId = `${categoryId}-${pointValue}`;
    
    // إضافة السؤال للقائمة المستخدمة
    setOpenedQuestions((prev) => [...prev, questionId]);

    console.log("Navigating to question:", questionId);
  };

  // كل صفحة تحتوي على 4 فئات كحد أقصى
  const chunkArray = (arr, size = 4) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const pagedCategories = chunkArray(categories, 4);

  const handleScroll = (event) => {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    // حساب الارتفاع المخصص لكل صفحة بورد
    const boardHeight = SCREEN_HEIGHT - verticalScale(60); 
    const index = Math.round(scrollOffset / boardHeight);
    setPageIndex(index);
  };

  const renderPoints = (count) => {
    const points = [];
    for (let i = 1; i <= (parseInt(count) || 4); i++) {
      points.push(i * 100);
    }
    return points;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader gameName={gameName || "اسم اللعبة"} />

      <View style={styles.content}>
        
        {/* ===== معلومات الفرق ===== */}
       {/* <View style={styles.sideSection}>
           <View style={styles.teamCard}>
              <Text style={styles.teamNameLabel} numberOfLines={1}>{teamName1 || "الفريق 1"}</Text>
              <Text style={styles.teamScore}>0</Text>
           </View>
           
           <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
           </View>

           <View style={styles.teamCard}>
              <Text style={styles.teamNameLabel} numberOfLines={1}>{teamName2 || "الفريق 2"}</Text>
              <Text style={styles.teamScore}>0</Text>
           </View>
        </View>
        */}

        {/* ===== البورد ===== */}
        <View style={styles.boardWrapper}>
          <ScrollView 
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {pagedCategories.map((page, pageIdx) => (
              <View 
                key={pageIdx} 
                style={[
                  styles.pageContainer, 
                  page.length < 4 && styles.centerPageContent 
                ]}
              >
                {page.map((cat) => (
                  <View key={cat.id} style={styles.categoryColumn}>

                    <ImageBackground 
                      source={{ uri: cat.photo || 'https://via.placeholder.com/150' }} 
                      style={styles.categoryHeader}
                      imageStyle={{ borderRadius: moderateScale(10) }}
                    >
                      <View style={styles.overlay}>
                        <Text style={styles.categoryTitle} numberOfLines={2}>
                          {cat.category_name}
                        </Text>
                      </View>
                    </ImageBackground>

                    {/* النقاط */}
                    <View style={styles.pointsList}>
                      {renderPoints(cat.questions_count).map((p) => {
                        // يتاكد إذا كان الزر قد انضغط ولا لا
                        const isOpened = openedQuestions.includes(`${cat.id}-${p}`);
                        
                        return (
                          <TouchableOpacity 
                            key={p} 
                            style={[
                                styles.pointBtn, 
                                isOpened && styles.disabledBtn 
                            ]}
                            activeOpacity={0.8}
                            disabled={isOpened}
                            onPress={() => handlePointPress(cat.id, p)}
                          >
                            <Text style={styles.pointText}>{p}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* Dots  */}
          {pagedCategories.length > 1 && (
            <View style={styles.dotsContainer}>
              {pagedCategories.map((_, index) => (
                <View 
                  key={index} 
                  style={[styles.dot, pageIndex === index && styles.activeDot]} 
                />
              ))}
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.colors.background },
  content: { flex: 1, flexDirection: 'row' },

  sideSection: {
    width: '25%',
    backgroundColor: 'rgba(0,0,0,0.02)', 
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(10)
  },
  teamCard: {
    backgroundColor: Colors.colors.primary,
    width: '85%',
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    elevation: 3,
  },
  teamNameLabel: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(13) },
  teamScore: { color: '#fff', fontSize: moderateScale(22), fontWeight: 'bold', marginTop: 5 },
  vsContainer: { marginVertical: verticalScale(10) },
  vsText: { fontWeight: 'bold', color: Colors.colors.primary, fontSize: moderateScale(18) },

  // (Board Section)
  boardWrapper: { 
    width: '75%', 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingLeft: scale(10),
    paddingRight: scale(25), 
  },
  pageContainer: {
    width: '100%', 
    height: SCREEN_HEIGHT - verticalScale(70), 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    paddingTop: verticalScale(10),
  },

  centerPageContent: {
    justifyContent: 'center',
    gap: scale(20), 
  },
  categoryColumn: { 
    width: '23%', 
    alignItems: 'center' 
  },
  categoryHeader: {
    width: '100%',
    height: verticalScale(50), 
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(5) 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  categoryTitle: { 
    color: '#FFF', 
    fontSize: moderateScale(16), 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  pointsList: { 
    width: '100%' 
  },
  pointBtn: {
    width: '100%',
    height: verticalScale(28), 
    backgroundColor: Colors.colors.primary, 
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(5) 
  },

  disabledBtn: {
    backgroundColor: '#989898ff',
    opacity: 0.6
  },
  pointText: { 
    color: '#FFF', 
    fontSize: moderateScale(14), 
    fontWeight: 'bold' 
  },

  //  ستايل الـ Dots 
  dotsContainer: {
    position: 'absolute',
    right: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 3,
    backgroundColor: '#D1D1D1',
    marginVertical: 4
  },
  activeDot: { 
    backgroundColor: Colors.colors.primary, 
    height: scale(14), 
    width: scale(6)
  }
});

export default GameScreen;