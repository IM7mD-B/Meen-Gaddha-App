import { StyleSheet, TouchableOpacity, TextInput, Image, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import Header from '../../components/shared/Header'
import { loginSchema } from '../../utils/validation/Validation'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import colors from '../../utils/colors/Colors';
import Lock from "../../../assets/icons/Lock.svg";
import Mail from "../../../assets/icons/Mail.svg";
import CustomInput from '../../components/shared/CustomInput'
import { Fonts } from '../../../assets/fonts/Fonts';
import apiRequests from '../../api/api'
import useAuthStore from '../../store/AuthStore';

const SignInScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState({
    email: '',
    password: '',
  });

  // Zustand login action
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    try {

      setError({
        email: '', password: ''
      })

      await loginSchema.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      )

      const response = await apiRequests.postLogin({
        email,
        password,
      })
      console.log('Login Response', response.data)

      // تخزين المستخدم + التوكن
      await login(response.data.token, response.data.User);
      const redirectTo = route.params?.redirectTo || 'Home';
      navigation.navigate(redirectTo);

      // Alert.alert("تم ✅", "تم تسجيل الدخول بنجاح!")

      // التنقل يتم تلقائي من Navigation حسب isAuthenticated

    } catch (err) {
      if (err.inner) {
        const newErrors = {}
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setError(newErrors)

      } else if (err.response) {

        // لو الخطأ من السيرفر
        console.log('Server Error:', err.response.data);
        Alert.alert("خطأ ❌", err.response.data.message || "حدثت مشكلة");

      } else {

        console.log('Login Error:', err)
        Alert.alert("خطأ ❌", "حدثت مشكلة في تسجيل الدخول")
      }
    }
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

      {/* ====== Email ======*/}
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder='البريد الإلكتروني '
          value={email}
          onChangeText={setEmail}
          textAlign='right'
          icon={Mail}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        {/* ====== Password ======*/}
        <CustomInput
          placeholder='كلمة المرور'
          value={password}
          onChangeText={setPassword}
          textAlign='right'
          secure={true}
          icon={Lock}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      {/* ====== Button SginIn ======*/}
      <View style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.accent }]}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={[styles.signInText, { color: colors.colors.text }]}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: verticalScale(50),
    marginTop: verticalScale(20),
  },
  errorText: {
    color: 'red',
    marginLeft: scale(25),
    fontSize: moderateScale(12),
    marginTop: verticalScale(3),

  },

})