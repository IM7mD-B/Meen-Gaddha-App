import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Fonts } from '../../../assets/fonts/Fonts';
import Colors from "../../utils/colors/Colors";


const AssistCards = ({
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
            <View style={styles.textContainer}>
                {showTitle && (
                        <Text style={styles.titleText}>{title}</Text>
                )}

                {showSubTitle && (
                        <Text style={styles.subTitleText}>{subTitle}</Text>
            )}
            </View>

        </View>
    )
}

export default AssistCards

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colors.background,
        height: verticalScale(62),
        width: scale(322),
        borderRadius: moderateScale(25),
        boxShadow: "5px 10px 15px rgba(0, 0, 0, 0.25)",
        justifyContent: 'center',
        flexDirection: 'row',
    },
    titleText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.FontBold,
        writingDirection: 'rtl',
    },
    subTitleText: {
        fontSize: moderateScale(11),
        fontFamily: Fonts.FontSemiBold,
        writingDirection: 'rtl',
    },
    iconWrapper: {
        alignSelf:'center',   
        justifyContent:'center',
        marginHorizontal:scale(12)     
    },
    textContainer: {
        flex: 1,
        justifyContent:'center',
    },
})