import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Colors from '../../utils/colors/Colors';
import { Fonts } from '../../../assets/fonts/Fonts';

const CategoryCard = ({
    item,
    isActive,
    disabled,
    onPress,
    maroonMode = false,   //  لتغيير اللون
    showOverlay = false,  //  نضيف هذا البرُوب
}) => {
    return (
        <TouchableOpacity
            disabled={disabled || showOverlay}  //  إذا showOverlay true يمنع الضغط
            onPress={onPress}
            style={[
                styles.card,
                maroonMode || isActive ? styles.cardActive : styles.cardInactive,
            ]}
        >
            {/* CategoryImage */}
            <Image
                source={{ uri: item?.photo }}
                style={styles.cardImage}
                resizeMode="contain"
            />

            {/* CategoryName */}
            <Text style={[styles.cardText, (isActive || maroonMode) && styles.cardTextActive]}>
                {item.category_name}
            </Text>

            {/* overlay فقط إذا ممنوع الضغط */}
            {(disabled || showOverlay) && (
                <View style={styles.overlay} pointerEvents="none" />
            )}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        width: "32%",
        borderRadius: moderateScale(18),
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(8),
        marginBottom: verticalScale(20),
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    cardActive: {
        backgroundColor: Colors.colors.primary,
    },

    cardInactive: {
        backgroundColor: Colors.colors.background,
        borderWidth: 1,
        borderColor: "#DDD",
    },

    cardImage: {
        width: "80%",
        height: verticalScale(90),
        marginBottom: verticalScale(10),
    },

    cardText: {
        fontFamily: Fonts.FontMedium,
        fontSize: moderateScale(16),
        color: Colors.colors.text,
        textAlign: "center",
    },

    cardTextActive: {
        color: Colors.colors.background,
    },

    // هذا اللي يعطي شكل "مو مسموح الضغط عليه"
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.5)",
    },
});

export default CategoryCard;
