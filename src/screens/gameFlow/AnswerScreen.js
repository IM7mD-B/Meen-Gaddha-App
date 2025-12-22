import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from "react-native-safe-area-context";

import GameHeader from '../../components/custom/GameHeader';
import GameCard from '../../components/shared/GameCards';
import Colors from "../../utils/colors/Colors";
import image from '../../../assets/images/Meen_Gaddha_Logo.svg'



const AnswerScreen = () => {

    useEffect(() => {
        Orientation.lockToLandscape();

        return () => Orientation.unlockAllOrientations();
    }, []);
    return (
        <View style={styles.container}>
            <GameHeader gameName="اسم اللعبه" />
            <SafeAreaView style={styles.safeContainer}>

                <GameCard
                    title="ما هي أشهر البراندات العالمية؟"
                    imageUri= {image}
                    points={200}
                    showTimer={true}
                />
            </SafeAreaView>
        </View>
    )
}

export default AnswerScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.colors.background
    },

})