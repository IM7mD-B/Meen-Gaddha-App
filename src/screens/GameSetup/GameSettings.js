import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Image, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import CustomInput from '../../components/shared/CustomInput'
import Dropdown from "../../components/custom/dropdown";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'
import { Fonts } from '../../../assets/fonts/Fonts';
import colors from '../../utils/colors/Colors';
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import apiRequests from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import useGameSettingsStore from '../../store/Store';
import useAuthStore from '../../store/AuthStore';
import useGameSessionStore from '../../store/GameSessionStore';

const GameSettings = () => {
    //const { isAuthenticated } = useAuthStore();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const navigation = useNavigation();
    const startSession = useGameSessionStore(state => state.startSession);
    const authStore = useAuthStore;

    useEffect(() => {
        console.log("Status changed:", isAuthenticated);
    }, [isAuthenticated]);

    // ====== Zustand Store ======
    const {
        gameName,
        teamName1,
        teamName2,
        questionsCount,
        selectedCategory,
        resetGameSettings,
        setGameName,
        setTeamName1,
        setTeamName2,
    } = useGameSettingsStore();

    const handleStartGame = async () => {
        try {
            // جلب القيم والتأكد من وجودها
            const authStore = useAuthStore.getState();
            const currentIsAuthenticated = authStore.isAuthenticated;

            //Validation
            if (
                !gameName ||
                !teamName1 ||
                !teamName2 ||
                !questionsCount ||
                selectedCategory.length === 0
            ) {
                return;
            }

            // فحص تسجيل الدخول
            if (!currentIsAuthenticated) {
                Alert.alert("تسجيل الدخول", "يجب تسجيل الدخول أولاً للبدء.", [
                    {
                        text: "حسناً", onPress: () => navigation.navigate('Home', {
                            screen: 'Profile',
                            params: { redirectTo: 'GameSettings' }
                        })
                    }
                ]);
                return;
            }

            // Payload
            const categoryIds = selectedCategory.map(item => item.id);
            const payload = {
                count_category: String(categoryIds.length),
                category_id: categoryIds,
                name_game: gameName,
                team_1: teamName1,
                team_2: teamName2,
                number_of_questions: String(questionsCount),
            };

            // API
            const response = await apiRequests.postCreationGroup(payload);

            if (response?.data?.status === 'success') {
                const groupId = response.data.group_id;
                startSession(groupId);
                navigation.navigate('GameScreen');
            } else {
                Alert.alert("خطأ من السيرفر", response?.data?.message || "فشل إنشاء اللعبة.");
            }

        } catch (error) {
            console.error("Critical Error:", error);
        }
    };

    const renderCategoryCard = ({ item }) => (
        <View style={styles.cardWrapper}>
            <View style={styles.cardBox}>
                <Image source={{ uri: item.photo }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.category_name}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS يستخدم padding، Android يستخدم height
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            {/* ====== Header ====== */}
            <Header
                showBack={true}
                showTitle={true}
                title="جهز اللعبة"
                onBackPress={() => {
                    navigation.navigate('Home', {
                        screen: 'Categories'
                    });
                }}
            />

            <View
                style={styles.container}
                contentContainerStyle={{ paddingBottom: verticalScale(50) }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                {/*====== Categorize Cards ====== */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: scale(10) }}
                >
                    {selectedCategory.map((item, index) => (
                        <View key={index}>
                            {renderCategoryCard({ item })}
                        </View>
                    ))}
                </ScrollView>

                {/* ====== Input Text ====== */}
                <View style={styles.inputTextCon}>
                    <Text style={styles.gameText}>
                        🕹️  اسم اللعبة
                    </Text>

                    <CustomInput
                        placeholder=" سموها بطريقتكم!"
                        shape="gameName"
                        value={gameName}
                        onChangeText={setGameName}
                        maxLength={10}
                        showCounter={true}
                    />

                    <CustomInput
                        placeholder="  اسم الفريق الأول"
                        shape="teamName"
                        value={teamName1}
                        onChangeText={setTeamName1}
                        maxLength={10}
                        showCounter={true}
                    />

                    <CustomInput
                        placeholder=" اسم الفريق الثاني "
                        shape="teamName"
                        value={teamName2}
                        onChangeText={setTeamName2}
                        maxLength={10}
                        showCounter={true}
                    />

                </View>

                <View>
                    <Dropdown />
                </View>

                <View style={styles.buttonCon}>
                    <TouchableOpacity
                        style={[globalStyles.buttonMedium, { backgroundColor: colors.colors.Buttonbackground }]}
                        onPress={handleStartGame}
                    >
                        <Text style={[globalStyles.mainTitle, { color: colors.colors.background }]}>
                            ابدأ اللعب
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
    },
    inputTextCon: {
        marginTop: verticalScale(10)
    },
    gameText: {
        fontSize: moderateScale(22),
        fontFamily: Fonts.FontBold,
        writingDirection: 'rtl',
    },
    buttonCon: {
        marginTop: verticalScale(30),
        marginBottom: verticalScale(40),
    },
    cardWrapper: {
        width: scale(110),
        alignItems: 'center',
        marginBottom: verticalScale(5),
    },
    cardBox: {
        width: scale(100),
        height: scale(147),
        backgroundColor: colors.colors.primary,
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(5),
    },
    cardImage: {
        width: scale(90),
        height: scale(90),
        resizeMode: 'contain',
        marginVertical: verticalScale(5)
    },
    cardTitle: {
        ...globalStyles.cardsText,
        textAlign: 'center',
        color: colors.colors.textWight
    },
})

export default GameSettings
