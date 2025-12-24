import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native';

import LogoIcon from "../../../assets/images/Meen_Gaddha_Logo.svg";
import LogoutIcon from "../../../assets/icons/Logout.svg";
import {Fonts} from "../../../assets/fonts/Fonts";
import Colors from "../../utils/colors/Colors";
import useGameSessionStore from '../../store/GameSessionStore';

const GameHeader = ({
    showLogo = true,
    showLogout = false,
    gameName = "",
    onExitPress,
}) => {

    const navigation = useNavigation();

    // ====== Game Session ======
    const endSession = useGameSessionStore(state => state.endSession);

    const handleExit = () => {
        Alert.alert(
            "إنهاء اللعبة",
            "هل متأكد تبغى تخرج وتنهي الجلسة؟",
            [
                { text: "إلغاء", style: "cancel" },
                {
                    text: "خروج",
                    style: "destructive",
                    onPress: () => {
                        endSession(); // 🔥 إنهاء السيشن
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* Left */}
                <View style={styles.leftContainer}>
                    {showLogo && (
                        <LogoIcon
                            width={scale(74)}
                            height={verticalScale(53)}
                        />
                    )}
                </View>

                {/* Center */}
                <View style={styles.centerContainer}>
                    <Text style={styles.gameName}>{gameName + "!🏁"}</Text>
                </View>

                {/* Right */}
                <View style={styles.rightContainer}>
                    {showLogout && (
                        <TouchableOpacity
                            onPress={onExitPress || handleExit}
                            style={styles.exitBtn}
                        >
                            <Text style={styles.exitText}>خروج</Text>
                            <LogoutIcon
                                width={scale(39)}
                                height={verticalScale(26)}
                            />
                        </TouchableOpacity>
                    )}
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.colors.background,
        width: '100%',
    },

    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(12),
        width: '100%',
    },

    /* Left */
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    exitBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6),
        backgroundColor: "#FDCE5C",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(15),
    },

    exitText: {
        fontFamily: Fonts.FontSemiBold || "Cairo-SemiBold",
        fontSize: moderateScale(15),
        color: Colors.colors.primary,
    },

    /* Center */
    centerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10),
    },

    gameName: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.FontBold || "Cairo-Bold",
        color: Colors.colors.text,
    },

    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: scale(90),
    },
});

export default GameHeader;
