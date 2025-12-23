import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from '../../utils/globalStyle/GlobalStyle'

import GameHeader from '../../components/custom/GameHeader';
import TeamTurns from '../../components/custom/AnsTeamTurns';
import GameCard from '../../components/shared/GameCards';
import AssistButton from '../../components/shared/AssistButton';
import colors from "../../utils/colors/Colors";
import image from '../../../assets/images/Meen_Gaddha_Logo.svg'
import QuestionScreen from './QuestionScreen';



const AnswerScreen = ({ navigation }) => {

    useEffect(() => {
        Orientation.lockToLandscape();

        return () => Orientation.unlockAllOrientations();
    }, []);

    const [teams, setTeams] = useState([
        { id: 0, name: 'فريق محمد', points: 0 },
    ]);

    const [activeTeamIndex, setActiveTeamIndex] = useState(0);

    const updatePoints = (teamId, value) => {
        setTeams(prev =>
            prev.map(team =>
                team.id === teamId ? { ...team, points: team.points + value } : team
            )
        );
    };

    return (
        <View style={styles.container}>
            <GameHeader gameName="اسم اللعبه" />
            <SafeAreaView style={styles.safeContainer}>

                <View>
                    <GameCard
                        title="ما هي أشهر البراندات العالمية؟"
                        imageUri={image}
                        points={200}
                        showTimer={true}
                    />

                    <View style={[globalStyles.buttonAns, {
                        backgroundColor: colors.colors.AnsButton,
                        alignSelf: 'center',
                        marginTop: verticalScale(20)
                    }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('QScreen')}>
                            <Text style={[globalStyles.ansButtonTitle, { color: colors.colors.textWight }]}>طلع الجواب </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                        <TeamTurns
                            team={teams[0]}
                            imageVariant= 'team1'
                            showPoints={true}
                            onIncrease={(id) => updatePoints(id, 100)}
                            onDecrease={(id) => updatePoints(id, -100)}
                        />
                    <AssistButton />

                </View>

            </SafeAreaView>
        </View>
    )
}

export default AnswerScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
    },
    safeContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    }

})