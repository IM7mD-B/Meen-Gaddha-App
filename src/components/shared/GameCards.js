import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Colors from "../../utils/colors/Colors";
import { Fonts } from '../../../assets/fonts/Fonts';


const GameCards = ({
    title = '',
    imageUri = '',
    points = null,
    showTimer = false,
    timer = 60,
    showAns = false,
    Ans = 'الجواب :',
}) => {

    const [countdown, setCountdown] = useState(timer);

    useEffect(() => {
        if (!showTimer) return

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [showTimer])


    return (
        <View style={styles.card}>
            {showTimer && (
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{countdown}s</Text>
                </View>
            )}

            {points !== null && (
                <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>{points}</Text>
                </View>
            )}

            <View style={styles.content}>
                <View style={styles.ansContent}>
                    {showAns && (
                        <View style={styles.ansContainer}>
                            <Text style={styles.ansText}>{Ans}</Text>
                        </View>
                    )}
                    <View style={styles.textContainer}>
                        <Text style={styles.questionText}>{title}</Text>
                    </View>
                </View>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
                ) : null}
            </View>

        </View>
    )
}

export default GameCards

const styles = StyleSheet.create({
    card: {
        width: scale(550),
        borderRadius: moderateScale(30),
        backgroundColor: Colors.colors.background,
        padding: scale(20),
        marginVertical: verticalScale(8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 2,
        borderColor: "#8E221F",
        alignSelf: 'center'
    },
    timerContainer: {
        position: 'absolute',
        top: scale(5),
        right: scale(5),
        backgroundColor: Colors.colors.secondary,
        paddingHorizontal: scale(25),
        paddingVertical: verticalScale(2),
        borderRadius: moderateScale(8),
        marginHorizontal: scale(5)
    },
    timerText: {
        color: Colors.colors.background,
        fontSize: moderateScale(15),
        fontWeight: 'bold',
    },
    pointsContainer: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#000',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(3),
        borderRadius: moderateScale(25),
        borderWidth: 2,
        borderColor: "#8E221F",
        borderTopLeftRadius: moderateScale(0),
        borderTopRightRadius: moderateScale(0)
    },
    pointsText: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: Colors.colors.textWight,
    },
    content: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(25),
    },
    ansContent: {
        alignItems: 'center',
        marginBottom:verticalScale(20)
    },
    ansContainer: {
        marginVertical:verticalScale(10)
    },
    ansText: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: Colors.colors.text,
    },
    textContainer: {
        marginHorizontal: scale(10),
        width: scale(250)
    },
    questionText: {
        fontSize: moderateScale(18),
        color: Colors.colors.text,
        textAlign: 'center',
        fontFamily: Fonts.FontBold,
        marginTop:verticalScale(10)
    },
    image: {
        width: scale(230),
        height: verticalScale(100),
        borderRadius: moderateScale(15),
        borderWidth: 1,
        
    },
});