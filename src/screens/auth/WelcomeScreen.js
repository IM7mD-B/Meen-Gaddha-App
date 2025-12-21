import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { version } from 'react'
import AuthImage from '../../../assets/images/AuthImage.svg'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import { Fonts } from '../../../assets/fonts/Fonts';
import colors from '../../utils/colors/Colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'


const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

            {/* ===== Top iamge ===== */}
            <AuthImage style={styles.topImage} />

            {/* ===== Titles ====== */}
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>جاهزين للتحدي؟🔥</Text>
                <Text style={styles.subtitleText}>سو حسابك أو دخل كضيف وخلّك قد التحدي 💥</Text>
            </View>
            <View style={styles.buttonCon}>
                {/* ===== Buttons ===== */}
                <View style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.accent }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={[styles.signInText, { color: colors.colors.text }]}>تسجيل الدخول </Text>
                    </TouchableOpacity>
                </View>

                <View style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.Buttonbackground }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={[styles.signUpText, { color: colors.colors.background }]}>إنشاء الحساب</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Sign in as Guest */}
            <View style={styles.guestcontainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={[styles.guestText, { color: colors.colors.secondary }]}>الدخول كضيف</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
    },
    topImage: {
        alignSelf: 'center',
        marginTop: verticalScale(70)
    },
    textContainer: {
        alignItems: 'center',
        marginTop: verticalScale(25),
        height: verticalScale(100),
        justifyContent: 'space-around'
    },
    titleText: {
        fontSize: moderateScale(25),
        fontFamily: Fonts.FontBold,
        color: colors.colors.text,
    },
    subtitleText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.FontMedium,
        color: colors.colors.text,
    },
    signUpText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.FontMedium
    },
    signInText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.FontMedium
    },
    guestcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: verticalScale(25)
    },
    guestText: {
        marginHorizontal: scale(2),
        fontSize: moderateScale(16),
        textDecorationLine: "underline",
        fontFamily: Fonts.FontMedium
        // ...globalStyles.smallText
    },
    buttonCon:{
        height:verticalScale(120),
        justifyContent:'space-between',
        marginTop:verticalScale(20)
    },
})
