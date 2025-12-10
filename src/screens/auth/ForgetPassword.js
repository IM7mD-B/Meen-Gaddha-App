import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import ForgetIamge from '../../../assets/images/ForgetPassImage.svg'
import Header from '../../components/shared/Header'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import colors from '../../utils/colors/Colors';
import CustomInput from '../../components/shared/CustomInput'
import { Fonts } from '../../../assets/fonts/Fonts';
import Mail from "../../../assets/icons/Mail.svg";



const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        if (!email.trim()) {
            Alert.alert("خطأ ⚠️", "يرجى إدخال البريد الإلكتروني ")
            return;
        }
        Alert.alert("تم ✅", "تم تسجيل الدخول بنجاح!");
        {/* TODO هنا تحتاج تغير الانتقال بعد ما تاخذ الهوم */ }

        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>

            {/* ====== Header ======*/}
            <Header
                showBack={true}
                showIcon={true}
                onBackPress={() => navigation.goBack()}
            />

            {/* ====== Welcome Text ======*/}
            <View style={styles.welcomeTextContainer}>
                <Text style={[styles.welcomeText, { color: colors.colors.text }]}>نسيت كلمة المرور؟ بسيطة!</Text>
                <Text style={[styles.subWelcomeText, { color: colors.colors.text }]}>ادخل بريدك ونرسل لك رابط إعادة التعيين</Text>
            </View>

            {/* ====== Image ======*/}
            <ForgetIamge style={styles.image} />

            {/* ====== Input Text ======*/}
            <View style={styles.inputContainer}>
                <CustomInput
                    placeholder='البريد الإلكتروني '
                    value={email}
                    onChangeText={setEmail}
                    textAlign='right'
                    icon={Mail}
                />
            </View>

            {/* ====== Button ======*/}
            <View style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.accent }]}>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={[styles.signInText, { color: colors.colors.text }]}>ارسال</Text>
                </TouchableOpacity>
            </View>
           
            <View style={styles.resentCon}>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={[styles.resentText, { color: colors.colors.text }]}>اعادة الارسال</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
    },
    welcomeTextContainer: {
        justifyContent: 'center',
        marginTop: verticalScale(30),
        marginBottom: verticalScale(40),
        marginLeft: scale(40),
        height: verticalScale(90),
        justifyContent: 'space-between'
    },
    welcomeText: {
        fontSize: moderateScale(24),
        fontFamily: Fonts.FontBold,
    },
    subWelcomeText: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.FontSemiBold,
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(40)
    },
    signInText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.FontMedium
    },
    resentCon:{
        alignItems:'center',
        marginTop:verticalScale(20),
    },
    resentText:{
        fontSize:moderateScale(16),
        fontFamily:Fonts.FontMedium
    },
})