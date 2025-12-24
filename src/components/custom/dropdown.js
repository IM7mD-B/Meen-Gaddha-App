import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'
import globalStyles from '../../utils/globalStyle/GlobalStyle'
import colors from '../../utils/colors/Colors';
import useGameSettingsStore from '../../store/Store';


const dropdown = () => {

    const [open, setOpen] = useState(false)
    const { questionsCount, setQuestionsCount } = useGameSettingsStore();

    const options = [4, 6]

    const handleSelect = (value) => {
        setQuestionsCount(value);
        setOpen(false);
    };


    return (
        <View style={styles.container}>


            <TouchableOpacity
                style={styles.selector}
                onPress={() => setOpen(!open)}
            >
                <Text style={[globalStyles.subTitle, { color: colors.colors.secondary }]}>
                    {questionsCount
                        ? `عدد الأسئلة : ${questionsCount}`
                        : "كم سؤال تبغون تتحدون فيه؟ 🤔"}
                </Text>

            </TouchableOpacity>

            {open && (
                <View style={styles.dropdownCon}>
                    <View style={styles.dropdown}>
                        {options.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={styles.option}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.optionText}> {item} </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    )
}

export default dropdown

const styles = StyleSheet.create({
    container: {
        width: scale(250),
        borderWidth: 1.5,
        borderColor: "#707070",
        marginTop: verticalScale(20),
        marginHorizontal: scale(20),
        borderRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(0),
        borderBottomLeftRadius: moderateScale(0),

    },
    selector: {
        padding: moderateScale(15),
        backgroundColor: "#fff",
        borderTopRightRadius: moderateScale(20),
        borderTopLeftRadius: moderateScale(20),
    },
    selectorText: {
        fontSize: scale(16)
    },
    dropdown: {
        backgroundColor: "#fff",
        elevation: 5,

    },
    dropdownCon: {
        width: scale(248),
        borderWidth: 1,
    },
    option: {
        borderBottomWidth: 1,
        // borderWidth:1,
        // borderColor:"#707070",
        padding: moderateScale(15),
        borderBottomColor: "#ddd",

    },
    optionText: {
        fontSize: moderateScale(15)
    }

})