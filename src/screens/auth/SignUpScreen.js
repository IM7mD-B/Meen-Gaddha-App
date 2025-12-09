import { StyleSheet, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity, TextInput, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import User from "../../../assets/icons/User.svg";
import Header from '../../components/shared/Header'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import colors from '../../utils/colors/Colors';
import Lock from "../../../assets/icons/Lock.svg";
import Mail from "../../../assets/icons/Mail.svg";
import CustomInput from '../../components/shared/CustomInput'
import { Fonts } from '../../../assets/fonts/Fonts';
import { registerSchema } from '../../utils/validation/Validation';


const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSignUp = async () => {
        try {

            setError({
                name: '', email: '', password: '', confirmPassword: ''
            })

            await registerSchema.validate(
                {
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword
                },
                { abortEarly: false }
            )
            Alert.alert("تم ✓", "تم إنشاء الحساب بنجاح!");
            navigation.navigate("Home");
        } catch (err) {
            if (err.inner) {
                const newErrors = {}
                err.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setError(newErrors)
            }
        }

    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS يستخدم padding، Android يستخدم height
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // ضبط المسافة حسب الحاجة
        >
            {/* ====== Header ======*/}
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
                    <Text style={[styles.welcomeText, { color: colors.colors.text }]}> ياللّه حيه !</Text>
                    <Text style={[styles.welcomeText, { color: colors.colors.text }]}>انشئ حسابك و خلك قدها 👊🔥</Text>
                </View>

                {/* ====== Name ======*/}
                <View style={styles.inputContainer} >
                    <CustomInput
                        placeholder='اسم المستخدم'
                        value={name}
                        onChangeText={setName}
                        textAlign='right'
                        icon={User}
                    />
                    {errors.name ? (
                        <Text style={styles.errorText}>{errors.name}</Text>
                    ) : null}

                    {/* ====== Email ======*/}
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
                        icon={Lock} />
                    {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}

                    {/* ====== Confirm Password ======*/}
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

                {/* ====== Button SginIn ======*/}
                <View style={[globalStyles.buttonSginIn, { backgroundColor: colors.colors.Buttonbackground }]}>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={[styles.signUpText, { color: colors.colors.background }]}>إنشاء الحساب</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

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
        marginLeft: scale(20),
    },
    textInput: {
        flex: 1,
        color: colors.colors.text,
    },
    eyeButton: {
        marginRight: scale(10)
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
    },
    errorText: {
        color: 'red',
        marginLeft: scale(25),
        fontSize: moderateScale(12),
        marginTop: verticalScale(3),

    },
    welcomeText: {
        fontSize: moderateScale(24),
        fontFamily: Fonts.FontBold,

    },
    signUpText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.FontMedium
    },
    inputContainer: {
        marginVertical: verticalScale(20),
        height: verticalScale(290),
        justifyContent: 'space-between',
    },

})