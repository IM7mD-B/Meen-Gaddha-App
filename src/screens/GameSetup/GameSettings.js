import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import CustomInput from '../../components/shared/CustomInput'
import Dropdown from "../../components/custom/dropdown";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'
import { Fonts } from '../../../assets/fonts/Fonts';
import colors from '../../utils/colors/Colors';
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import apiRequests from '../../api/api';

const GameSettings = () => {
    const [gameName, setGameName] = useState("")
    const [tameName1, setTeamName1] = useState("")
    const [teamName2, setTeamName2] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadCategories()
    }, [])
    
    const loadCategories = async () => {
        try{
            const res = await apiRequests.getExclusiveCategory()
                setCategories(res.data.data || [])
        }catch (err) {
            console.log('Error : ', err)
        }
    }
    
    const renderCategoryCard = ({ item }) => (
        <View style={styles.cardWrapper}>
          <View style={styles.cardBox}>
            <Image source={{ uri: item.photo }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.category_name}</Text>
          </View>
        </View>
      );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS يستخدم padding، Android يستخدم height
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // ضبط المسافة حسب الحاجة
        >
            {/* ====== Header ====== */}
            <Header
                showBack={true}
                showTitle={true}
                title="جهز اللعبة"
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: verticalScale(50) }} // عشان مايعلق شي أسفل
                showsVerticalScrollIndicator={false} // إخفاء شريط التمرير لو تحب
                keyboardShouldPersistTaps="handled" // عشان لما تضغط على زر يتفاعل بدون غلق الكيبورد
            >


                {/*====== Categorize Cards ====== */}
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:scale(10)}}
                >
                    {categories.map((item , index) => (
                        <View key={index}>
                            {renderCategoryCard ({item})}
                        </View>
                    ))}
                </ScrollView>

                {/* ====== Input Text ====== */}
                <View style={styles.inputTextCon}>
                    <Text style={styles.gameText}>
                        🕹️  اسم اللعبة
                    </Text>

                    <CustomInput placeholder=" سموها بطريقتكم!"
                        shape="gameName"
                        value={gameName}
                        onChangeText={setGameName}
                        maxLength={20}
                        showCounter={true} />
                    <CustomInput placeholder="  اسم الفريق الأول"
                        shape="teamName" value={tameName1}
                        onChangeText={setTeamName1}
                        maxLength={15}
                        showCounter={true} />
                    <CustomInput placeholder=" اسم الفريق الثاني "
                        shape="teamName"
                        value={teamName2}
                        onChangeText={setTeamName2}
                        maxLength={15}
                        showCounter={true} />
                </View>
                <View>
                    <Dropdown />
                </View>

                <View style={styles.buttonCon}>
                    <View style={[globalStyles.buttonMedium, { backgroundColor: colors.colors.Buttonbackground }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={[globalStyles.mainTitle, { color: colors.colors.background }]}>إنشاء الحساب</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default GameSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,

    },
    inputTextCon: {
        marginTop: verticalScale(30)
    },
    gameText: {
        fontSize: moderateScale(22),
        fontFamily: Fonts.FontBold,

    },
    buttonCon: {
        marginTop: verticalScale(40),
    },
    cardWrapper: {
        width: scale(110),
        alignItems: 'center',
        marginBottom: verticalScale(5),
      },
      
      cardBox: {
        width: scale(100),
        height: scale(147),
        backgroundColor: colors.colors.primary,
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(5),
      },
      
      cardImage: {
        width: scale(90),
        height: scale(90),
        resizeMode: 'contain',
        marginVertical:verticalScale(5)
      },
      
      cardTitle: {
        ...globalStyles.cardsText,
        textAlign: 'center',
        color:colors.colors.textWight
      },
      
})