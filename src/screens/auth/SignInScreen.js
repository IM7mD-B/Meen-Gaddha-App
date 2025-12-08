import { StyleSheet, TouchableOpacity, TextInput, Image, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import Header from '../../components/shared/Header'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import colors from '../../utils/colors/Colors';
import Lock from "../../../assets/icons/Lock.svg";
import Mail from "../../../assets/icons/Mail.svg";
import CustomInput from '../../components/shared/CustomInput'
import { Fonts } from '../../../assets/fonts/Fonts';


const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("خطأ ⚠️", "يرجى إدخال البريد الإلكتروني وكلمة المرور.")
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

      <View style={styles.welcomeTextContainer}>
        <Text style={[styles.welcomeText, { color: colors.colors.text }]}>جاهز؟</Text>
        <Text style={[styles.welcomeText, { color: colors.colors.text }]}>سجل دخولك و ورّينا 💪 </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder='البريد الإلكتروني '
          value={email}
          onChangeText={setEmail}
          textAlign='right'
          icon={Mail}
        />
        <CustomInput
          placeholder='كلمة المرور'
          value={password}
          onChangeText={setPassword}
          textAlign='right'
          secure={true}
          icon={Lock}
        />
      </View>

      {/* TODO هنا تحتاج تعدل شكل الزر بعد ما تحددو قلوبل ستايل ولا كمبوننت */}
      <View style={[globalStyles.buttonSginIn, {backgroundColor:colors.colors.accent}]}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={[styles.signInText, { color: colors.colors.text }]}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>

      {/* TODO هنا تحتاج تغير الانتقال بعد ما تكتمل صفحه تغيير كلمه المرور */}
      <View style={styles.forgetcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
          <Text style={[styles.forgetText, { color: colors.colors.secondary }]}>نسيت كلمة المرور؟</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default SignInScreen

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
  },
  forgetcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20)
  },
  forgetText: {
    marginHorizontal: scale(2),
    fontSize: moderateScale(16),
    textDecorationLine: "underline",
    fontFamily: Fonts.FontMedium
    // ...globalStyles.smallText
  },
  signInText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.FontMedium
  },
  welcomeText: {
    fontSize: moderateScale(29),
    fontFamily: Fonts.FontBold,

  },
  inputContainer: {
    height: verticalScale(140),
    justifyContent: 'space-between',
    marginBottom:verticalScale(50),
    marginTop:verticalScale(20),
  }

})