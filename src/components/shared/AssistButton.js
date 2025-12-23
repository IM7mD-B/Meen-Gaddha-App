import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useState } from 'react';

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
                            <IconComponent width={24} height={24} fill="#000" />
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
    button: {
        marginHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
    },
    icon: {
        borderWidth: 2,
    },
    text: {
        marginTop: 5,
        fontWeight: 'bold',
        marginLeft: 10
    },
    iconContainer: {
        borderWidth: 3,
        borderRadius: 20, // إذا تبغى يكون دائري
        padding: 6,       // فراغ بين البوردر والأيقونة
        alignItems: 'center',
        justifyContent: 'center',
      },
});
