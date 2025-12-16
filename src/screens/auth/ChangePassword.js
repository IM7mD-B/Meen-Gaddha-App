import { StyleSheet, TouchableOpacity, TextInput, Image, Text, View, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import Header from '../../components/shared/Header'
import { changePasswordSchema } from '../../utils/validation/Validation'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import colors from '../../utils/colors/Colors';
import Lock from "../../../assets/icons/Lock.svg";
import CustomInput from '../../components/shared/CustomInput'


const ChangePassword = ({ navigation }) => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setError] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async () => {
    try {

      setError({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

      await changePasswordSchema.validate(
        {

          currentPassword,
          newPassword,
          confirmPassword,

        },
        { abortEarly: false }
      )

      const response = await apiRequests.postRegister({

        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      console.log('Register Response', response.data);

      Alert.alert("تم ✓", "تم تغيير كلمة المرور بنجاح", [

        { text: "حسناً", onPress: () => navigation.goBack() }
      ]);
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
        Alert.alert("خطأ ❌", "حدثت مشكلة في تغيير كلمة المرور")
      }
    }

  };


  return (
    <View style={styles.container}>

      {/* ====== Header ====== */}
      <Header
        showBack={true}
        showIcon={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: verticalScale(50) }} // عشان مايعلق شي أسفل
        showsVerticalScrollIndicator={false} // إخفاء شريط التمرير لو تحب
        keyboardShouldPersistTaps="handled" // عشان لما تضغط على زر يتفاعل بدون غلق الكيبورد
      >

        <View style={styles.welcomeTextContainer}>
          <Text style={[globalStyles.WelcomeText, { color: colors.colors.text, marginBottom: verticalScale(60) }]}> تغيير كلمة المرور</Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder='كلمة المرور الحالية'
            value={currentPassword}
            onChangeText={setCurrentPassword}
            textAlign='right'
            secure={true}
            icon={Lock}
          />
          {errors.currentPassword ? (
            <Text style={styles.errorText}>{errors.currentPassword}</Text>
          ) : null}

          <CustomInput
            placeholder=' كلمة المرور الجديدة'
            value={newPassword}
            onChangeText={setNewPassword}
            textAlign='right'
            secure={true}
            icon={Lock}
          />
          {errors.newPassword ? (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          ) : null}

          <CustomInput
            placeholder='تأكيد كلمة المرور  '
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            textAlign='right'
            secure={true}
            icon={Lock}
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        <TouchableOpacity 
        style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.Buttonbackground, marginTop: verticalScale(70) }]}
        onPress={handleChangePassword}>
            <Text style={[globalStyles.buttonText, { color: colors.colors.background }]}> تغيير كلمة المرور</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colors.background,
  },
  welcomeTextContainer: {
    justifyContent: 'center',
    marginTop: verticalScale(30),
    marginLeft: scale(20),
  },

  inputContainer: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    height:verticalScale(200),
  },
})
