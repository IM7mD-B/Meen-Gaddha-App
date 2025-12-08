import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/shared/Header'
import CustomInput from '../../components/shared/CustomInput'
import Dropdown from "../../components/custom/dropdown";
import { moderateScale, verticalScale , scale} from 'react-native-size-matters'
import { Fonts } from '../../../assets/fonts/Fonts';

const GameSettings = () => {
    const [gameName, setGameName] = useState("")
    const [tameName1, setTeamName1] = useState("")
    const [teamName2, setTeamName2] = useState("")
    return (
        <View style={styles.container}>

            {/* ====== Header ====== */}
            <Header
                showBack={true}
                showTitle={true}
                title="جهز اللعبة"
                onBackPress={() => navigation.goBack()}
            />

            {/*====== Categorize Cards ====== */}
            <View style={styles.cardContainer}>
                <Text> here all cards</Text>

            </View>
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
                <Dropdown/>
            </View>
        </View>
    )
}

export default GameSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',

    },
    cardContainer: {
        borderWidth: 1,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputTextCon: {
        marginTop: verticalScale(40)
    },
    gameText:{
        fontSize:moderateScale(30),
        fontFamily: Fonts.FontBold,
        
    },


})