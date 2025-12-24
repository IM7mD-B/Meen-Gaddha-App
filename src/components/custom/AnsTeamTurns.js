import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Tame1 from '../../../assets/images/Team1.svg'
import Tame2 from '../../../assets/images/Team2.svg'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Fonts } from '../../../assets/fonts/Fonts';
import Colors from '../../utils/colors/Colors';


const teamImages = {
    team1: Tame1,
    team2: Tame2
};

const ansTeamTurns = ({
    team,              // { id, name, points }
    imageVariant = 'team1',  // "team1" أو "team2"
    showPoints = true,       // تظهر النقاط أو لا
    onIncrease,              // دالة تزيد النقاط
    onDecrease,              // دالة تنقص النقاط
}) => {
    const TeamImage = teamImages[imageVariant];

    return (
        <View style={styles.container}>

            {/* الصورة + الاسم */}
            <View style={styles.header}>
                <TeamImage width={60} height={60} />
                <Text style={styles.name}>{team.name}</Text>
            </View>

            {/* النقاط */}
            {showPoints && (
                <View style={styles.pointsContainer}>
                    <Pressable style={styles.button} onPress={() => onDecrease(team.id)}>
                        <Text style={styles.btnText}>-</Text>
                    </Pressable>

                    <Text style={styles.points}>{team.points}</Text>

                    <Pressable style={styles.button} onPress={() => onIncrease(team.id)}>
                        <Text style={styles.btnText}>+</Text>
                    </Pressable>
                </View>
            )}

        </View>
    );
};

export default ansTeamTurns;

// ---------------- Styles ----------------
const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(12),
        backgroundColor: '#fff',
        marginBottom: verticalScale(20),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    image: {
        width: scale(50),
        height: scale(50),
        borderRadius: moderateScale(25),
        marginRight: scale(10),
    },
    name: {
        fontSize: moderateScale(13),
        borderTopRightRadius: moderateScale(20),
        borderBottomRightRadius:moderateScale(20),
        textAlign:'center',
        backgroundColor: "#FFD9DB79",
        fontFamily:Fonts.FontSemiBold,
        padding:moderateScale(8),
        flex:1,
    },
    pointsContainer: {
        marginTop: verticalScale(10),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    points: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
    },
    button: {
        borderRadius: moderateScale(20),
        backgroundColor: Colors.colors.text,
        height:verticalScale(22),
        width:scale(25),
        justifyContent:'center',
        alignItems:'center'        
    },
    btnText: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: Colors.colors.textWight
    },
});
