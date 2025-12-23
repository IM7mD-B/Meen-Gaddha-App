import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from '../../utils/globalStyle/GlobalStyle'

import GameHeader from '../../components/custom/GameHeader';
import GameCard from '../../components/shared/GameCards';
import AssistButton from '../../components/shared/AssistButton';
import colors from "../../utils/colors/Colors";
import image from '../../../assets/images/Meen_Gaddha_Logo.svg'
import QuestionScreen from './QuestionScreen';



const AnswerScreen = ({ navigation }) => {

    useEffect(() => {
        Orientation.lockToLandscape();

        return () => Orientation.unlockAllOrientations();
    }, []);
    return (
        <View style={styles.container}>
            <GameHeader gameName="اسم اللعبه" />
            <SafeAreaView style={styles.safeContainer}>

                <View>
                    <GameCard
                        title="ما هي أشهر البراندات العالمية؟"
                        imageUri={image}
                        points={200}
                        showTimer={true}
                        showAns={true}
                    />

                    <View style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.accent }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('QScreen')}>
                            <Text style={[styles.signInText, { color: colors.colors.text }]}>تسجيل الدخول</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AssistButton />

            </SafeAreaView>
        </View>
    )
}

export default AnswerScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
    },
    safeContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    }

})