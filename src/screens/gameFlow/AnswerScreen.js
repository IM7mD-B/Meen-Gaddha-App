import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

import GameHeader from '../../components/custom/GameHeader';
import GameCard from '../../components/shared/GameCards';
import image from '../../../assets/images/Meen_Gaddha_Logo.svg'
import colors from "../../utils/colors/Colors";


const AnswerScreen = () => {
    return (
        <View style={styles.container}>
            <GameHeader gameName="اسم اللعبه" />
            <SafeAreaView style={styles.safeContainer}>
                <View>
                    <GameCard
                        title="ما هي أشهر البراندات العالمية؟"
                        imageUri={image}
                        points={200}
                        showAns={true}

                    />

                    <Text style={[globalStyles.mainTitle, { alignSelf: 'center' }]}>مين جاوب صح ؟</Text>

                    <View style={[{
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                    }]}>

                        <View style={[globalStyles.buttonTeam]}>
                            <TouchableOpacity onPress={() => navigation.navigate('QScreen')}>
                                <Text style={[globalStyles.teamButtonTitle]}>طلع الجواب </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[globalStyles.buttonTeam, { marginTop: 15 }]}>
                            <TouchableOpacity onPress={() => navigation.navigate('QScreen')}>
                                <Text style={[globalStyles.teamButtonTitle]}>ولا أحد</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[globalStyles.buttonTeam]}>
                            <TouchableOpacity onPress={() => navigation.navigate('QScreen')}>
                                <Text style={[globalStyles.teamButtonTitle]}>طلع الجواب </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

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