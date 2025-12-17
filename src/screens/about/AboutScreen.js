import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors/Colors';
import InfoCard from '../../components/custom/InfoCard'
import MyIcon1 from '../../../assets/icons/Start img.svg'
import MyIcon2 from '../../../assets/icons/Target img.svg'
import MyIcon3 from '../../../assets/icons/Team img.svg'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MGIcon from '../../../assets/icons/MG_Icon.svg'
import { Fonts } from '../../../assets/fonts/Fonts';

const AboutScreen = () => {
    return (

        <View style={styles.container}>
            <View style={styles.titleCon}>
                <Text style={styles.titleText} >وش سالفة  </Text>
                <MGIcon />
            </View>
            <View style={styles.subTitleCon}>
                <Text style={styles.subTitleText} >لعبة تجمع بين المتعة والتعلم في تجربة فريدة تتناسب مع جميع افراد العائلة </Text>
            </View>


            <View style={styles.infoCardsCon}>
                <InfoCard
                    icon={<MyIcon3 />}

                    showTitle={true}
                    title="كوّنوا فريقكم"
                    showSubTitle={true}
                    subTitle="اجمعوا العائلة والأصدقاء وحددوا الفرق."
                />
                <View style={[{ marginBottom: verticalScale(20) }]}>
                    <InfoCard
                        icon={<MyIcon2 />}

                        showTitle={true}
                        title="حددوا الفئات"
                        showSubTitle={true}
                        subTitle="اختاروا نوع الأسئلة أو الفئات اللي تحبونها قبل بدء التحدي."
                    />
                </View>
                <InfoCard
                    icon={<MyIcon1 />}

                    showTitle={true}
                    title="ابدأوا اللعب !"
                    showSubTitle={true}
                    subTitle="شغّلوا اللعبة على التلفزيون و اجمعوا 
       النقاط، وابدأوا التحدي مع الضحك
        والمتعة!"
                />
            </View>
            
            <View style={styles.titleCon}>
                <Text style={styles.titleText} >وسائل المساعدة</Text>
            </View>

        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
    },
    titleCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(40)

    },
    subTitleCon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding : moderateScale(30)
    },
    titleText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.FontBold
    },
    subTitleText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.FontMedium,
        textAlign:'center',

    },
    infoCardsCon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginTop: verticalScale(20)

    },
})