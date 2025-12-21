import { StyleSheet, Animated, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MeenGaddhaLogo from '../../../assets/images/Meen_Gaddha_Logo.svg';
import useAuthStore from '../../store/AuthStore';

const SplashScreen = ({ navigation }) => {
    const fadeAnimImages = useRef(new Animated.Value(0)).current;

    // Zustand
    const restoreSession = useAuthStore(state => state.restoreSession);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    useEffect(() => {
        const init = async () => {

            // استرجاع التوكن + المستخدم
            await restoreSession();

            // يشوف اذا قد انعرض القيم انستركشن من قبل ولا( يعني اول تشغيل للعبه ولا لا)
            const hasSeenInstructions = await AsyncStorage.getItem('hasSeenInstructions');

            Animated.sequence([
                Animated.timing(fadeAnimImages, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.delay(1000),
                Animated.timing(fadeAnimImages, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ]).start(() => {

                // توجيه حسب حالة تسجيل الدخول
                if (isAuthenticated) {
                    navigation.replace('Home'); //  مسجل دخول
                } else if (!hasSeenInstructions) {
                    navigation.replace('GameInstructions'); // أول مرة يشغل اللعبة
                } else {
                    navigation.replace('Home'); // غير مسجل، ومو اول مره يشغل اللعبه
                }
            })
        }

        init();
    }, []);

    return (
        <Animated.View
            style={{
                flex: 1,
                opacity: fadeAnimImages,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: "#F4F4F4"
            }}
        >
            <MeenGaddhaLogo
                width={scale(220)}
                height={verticalScale(230)}
                style={{
                    marginTop: verticalScale(30)
                }}
            />
        </Animated.View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({

})

// zustand بدل usecontext
/*
كيف نخلي البرنامج يدعم لغتين + جهتين
*/