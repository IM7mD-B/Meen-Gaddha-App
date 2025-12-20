import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Fonts } from '../../../assets/fonts/Fonts';
import Colors from "../../utils/colors/Colors";


const InfoCard = ({
    showSubTitle = false,
    showTitle = false,
    icon = null,
    title = '',
    subTitle = '',
}) => {


    return (
        <View style={styles.container}>

            {icon && (
                <View style={styles.iconWrapper}>
                    {icon}
                </View>
            )}
            {showTitle && (
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            )}

            {showSubTitle && (
                <View style={styles.subTitleContainer}>
                    <Text style={styles.subTitleText}>{subTitle}</Text>
                </View>
            )}

        </View>
    )
}

export default InfoCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colors.accentLight,
        height: verticalScale(91),
        width: scale(104),
        borderRadius: moderateScale(20),
        boxShadow: "1px 5px 5px rgba(0, 0, 0, 0.3)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        alignSelf: 'center',
    },
    titleText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.FontBold,
        textAlign: 'center'
    },
    subTitleContainer: {
        alignSelf: 'center'
    },
    subTitleText: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.FontSemiBold,
        textAlign: 'center'

    },
    iconWrapper: {
        position: 'absolute',
        top: -35, // يطلع خارج الكارد شوي
        alignSelf: 'center',
    },
})