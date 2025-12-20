import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors/Colors';
import InfoCard from '../../components/custom/InfoCard'
import AssistCard from '../../components/custom/AssistCards'
import StartIcon from '../../../assets/icons/Start img.svg'
import TargetIcon from '../../../assets/icons/Target img.svg'
import TeamIcon from '../../../assets/icons/Team img.svg'
import ChatGPTIcon from '../../../assets/icons/ChatGPT.svg'
import ConvertIcon from '../../../assets/icons/Convert.svg'
import AlarmIcon from '../../../assets/icons/Alarm.svg'
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
                    icon={<TeamIcon/>}

                    showTitle={true}
                    title="كوّنوا فريقكم"
                    showSubTitle={true}
                    subTitle="اجمعوا العائلة والأصدقاء وحددوا الفرق."
                />
                <View style={[{ marginBottom: verticalScale(20) }]}>
                    <InfoCard
                        icon={<TargetIcon/>}

                        showTitle={true}
                        title="حددوا الفئات"
                        showSubTitle={true}
                        subTitle="اختاروا نوع الأسئلة أو الفئات اللي تحبونها قبل بدء التحدي."
                    />
                </View>
                <Infoard
                    icon={<StartIcon/>}

                    showTitle={true}
                    title="ابدأوا اللعب !"
                    showSubTitle={true}
                    subTitle=" اجمعوا 
       النقاط، وابدأوا التحدي مع الضحك
        والمتعة!"
                />
            </View>
            
            <View style={styles.titleCon}>
                <Text style={styles.titleText} >وسائل المساعدة</Text>
            </View>

            <View style={styles.assistCardsCon}>
                <AssistCard
                    icon={<ChatGPTIcon />}

                    showTitle={true}
                    title="استدعاء العقل المدبر"
                    showSubTitle={true}
                    subTitle="اسألوا ChatGPT وخذوا إجابة وحدة قبل ما الوقت يخلص ⏳"
                />
                    <AssistCard
                        icon={<AlarmIcon />}

                        showTitle={true}
                        title="سكتّهم!!"
                        showSubTitle={true}
                        subTitle="امنعوا فريق الخصم من الإجابة على سؤال واحد 🔥"
                    />
                <AssistCard
                    icon={<ConvertIcon />}

                    showTitle={true}
                    title="تدبيل النقاط !!!"
                    showSubTitle={true}
                    subTitle="ضاعفوا نقاط سؤال واحد, فرصة لرفع رصيدكم بسرعة 🔄"
                />
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
        marginVertical: verticalScale(20)

    },
    subTitleCon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding : moderateScale(25)
    },
    titleText: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.FontBold
    },
    subTitleText: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.FontMedium,
        textAlign:'center',

    },
    infoCardsCon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginTop: verticalScale(20),
    },
    assistCardsCon:{
        alignItems:'center',
        justifyContent:'space-between',
        flex:1,
        marginBottom:verticalScale(25)
        
    },
})