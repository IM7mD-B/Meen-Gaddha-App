import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, I18nManager, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../assets/fonts/Fonts';
import { useNavigation } from '@react-navigation/native';

// SVG
import Left_Arrow from "../../../assets/icons/Left_Arrow.svg";
import Right_Arrow from "../../../assets/icons/Right_Arrow.svg";
import TeamImage from '../../../assets/images/TeamImage.svg';
import Categories from '../../../assets/images/Categories.svg';
import WelcomeImage from '../../../assets/images/WelcomeImage.svg';

// تحديد إذا اللغة RTL
const isRTL = I18nManager.isRTL;

// Data
const onboardingData = [
    {
        id: '1',
        renderImage: () => (
            <WelcomeImage
                width={scale(300)}
                height={verticalScale(300)}
            />
        ),
        title: 'حـــياكم الله',
        subtitle:
            'جاهزين تختبرون معلوماتكم وتثبتون إنكم قدّها؟  فريقكم \n بانتظاركم والنتيجة بتقول من الزعيم الحقيقي! 👑',
    },
    {
        id: '2',
        renderImage: () => (
            <View style={styles.rowImages}>
                <TeamImage
                    width={scale(300)}
                    height={verticalScale(275)}
                    style={styles.svgMargin}
                />

            </View>
        ),
        title: 'جمّع فريقك وتحدّوا بعض!',
        subtitle:
            'نقاط الفوز تتحول لخصومات على مطاعم وكافيهات \n سعودية 🎉',
    },
    {
        id: '3',
        renderImage: () => (
            <View style={styles.rowImages}>
                <Categories
                    width={scale(300)}
                    height={verticalScale(300)}
                    style={styles.svgMargin}
                />

            </View>
        ),
        title: 'فزعة، تحدي، وضحك؟ 😎',
        subtitle:
            'أسئلة عن تراثنا، أكلنا، إعلامنا وديننا 🇸🇦\n جمعوا فريقكم وخلوّنا نشوف من قدّها فعلاً! 🔥',
    },
];

const GameInstructions1 = () => {
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            handleDone();
        }
    };
    const handleBack = () => {
        if (currentIndex > 0) {
            flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
        } else {
            handleDone();
        }
    };

    const handleSkip = () => {
        handleDone();
    };

    const handleDone = () => {
        navigation.navigate('Home');
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            {/* FlatList supports RTL */}
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.page}>
                        {item.renderImage()}
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                inverted={isRTL}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />

            {/* Dots */}
            <View style={styles.dotsContainer}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>

            {/* Buttons */}
            <View style={styles.skipContainer}>
                {currentIndex < onboardingData.length - 1 && (
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.buttonSkip}>تخطي</Text>
                    </TouchableOpacity>
                )}
            </View>


            <View style={styles.buttonsContainer}>
                {currentIndex < onboardingData.length - 1 ? (
                    <>
                        {currentIndex > 0 && (
                            <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
                                <Right_Arrow width={30} height={35} />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={handleSkip}>
                            <Text style={styles.buttonSkip}>تخطي</Text>
                        </TouchableOpacity>
                        {/* style={styles.ButtonNext} */}
                        <TouchableOpacity onPress={handleNext}  style={[styles.ButtonNext,{ width: currentIndex === 0 ? scale(310) : scale(230) }]}>
                            <Text style={styles.buttonText}>كمل  </Text>
                            <Left_Arrow/>
                        </TouchableOpacity>

                    </>
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: scale(300), }}>

                        <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
                            <Right_Arrow width={30} height={35} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDone} style={styles.ButtonNext}>
                            <Text style={styles.buttonText}>جاهز ؟</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </View>
    );
};

export default GameInstructions1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        justifyContent: 'space-between',
    },
    page: {
        width: scale(360),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(20),
    },
    rowImages: {

        marginBottom: verticalScale(20),
    },
    title: {
        fontFamily: Fonts.TajawalBold,
        fontSize: moderateScale(25),
        color: '#000',
        textAlign: 'center',
        marginBottom: verticalScale(10),
        fontWeight: 'bold'
    },
    subtitle: {
        fontFamily: Fonts.TajawalRegular,
        fontSize: moderateScale(15),
        color: '#000',
        textAlign: 'center',
        fontWeight: '600',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: verticalScale(20),
    },
    dot: {
        width: scale(10),
        height: verticalScale(9),
        borderRadius: 20,
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: 'rgba(105, 3, 3, 1)',
    },
    inactiveDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(20),
    },
    buttonText: {
        fontFamily: Fonts.TajawalRegular,
        color: '#000',
        fontSize: moderateScale(20),
        fontWeight: "700"
    },
    buttonSkip: {
        position: 'absolute',
        bottom: verticalScale(530),
        right: scale(270),
        fontSize: moderateScale(18),
        color: "#C32729",
        fontWeight: "500"
    },
    ButtonNext: {
        backgroundColor: "#F8C55A",
        width: scale(230),
        height: verticalScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection:"row",

    },
    buttonBack: {
        backgroundColor: "#B83239",
        width: scale(65),
        height: verticalScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20

    }
});
