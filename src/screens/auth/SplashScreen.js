import { StyleSheet, Animated, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

import IllustrationMulti from '../../../assets/images/Illustration_Multi.svg';
import MeenGaddhaLogo from '../../../assets/images/Meen_Gaddha_Logo.svg';

const SplashScreen = ({ navigation }) => {
    const fadeAnimImages = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnimImages, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(1000),
            Animated.timing(fadeAnimImages, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            })
        ]).start(() => {
            navigation.replace('Home');
        })
    }, []);
    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnimImages, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: "#F4F4F4" }}>
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