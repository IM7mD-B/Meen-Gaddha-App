import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../../assets/fonts/Fonts';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

import Diamond from '../../../assets/icons/Diamond.svg'
import Robot from '../../../assets/icons/Robot.svg'
import Face from '../../../assets/icons/Shushing_Face.svg'

const AssistButton = () => {

    const [clicked, setClicked] = useState([false, false, false])

    const buttons = [
        { title: 'استدعاء العقل المدبر', Image: Robot },
        { title: 'سكتهم!!', Image: Face },
        { title: 'تدبيل النقاط !!!', Image: Diamond },

    ]

    const handlePress = (index) => {
        const newClicked = [...clicked]
        newClicked[index] = true
        setClicked(newClicked)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>وسائل المساعدة</Text>
            {buttons.map((btn, index) => {
                const IconComponent = btn.Image;
                return (
                    <Pressable
                        key={index}
                        style={styles.button}
                        onPress={() => handlePress(index)}
                    >
                        <Text style={[styles.text, { color: clicked[index] ? '#888' : '#000' }]}>
                            {btn.title}
                        </Text>

                        <View style={[styles.iconContainer, { borderColor: clicked[index] ? '#888' : '#690303' }]}>
                            <IconComponent width={20} height={20} fill="#000" />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    )
}

export default AssistButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    titleText:{
        fontFamily:Fonts.FontBold,
        fontSize:moderateScale(16)
    },
    button: {
        paddingVertical: verticalScale(3),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
    },
    icon: {
        borderWidth: moderateScale(2),
    },
    text: {
        marginLeft: scale(5),
        fontFamily:Fonts.FontBold,
    },
    iconContainer: {
        borderWidth: moderateScale(2.5),
        borderRadius: moderateScale(20), 
        padding: moderateScale(5),       
        alignItems: 'center',
        justifyContent: 'center',
      },
});
