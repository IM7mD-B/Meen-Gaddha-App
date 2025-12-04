import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters'


const dropdown = () => {

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    const options = [4, 6, 8]

    const handleSelect = (value) => {
        setSelected(value)
        setOpen(false)
    }

    return (
        <View style={styles.container}>


            <TouchableOpacity
                style={styles.selector}
                onPress={() => setOpen(!open)}
            >
                <Text style={styles.selectorText}>
                    {selected ? `عدد الأسئلة : ${selected}` : "كم سؤال تبغون تتحدون فيه؟ 🤔"}
                </Text>
            </TouchableOpacity>

            {open && (
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
            )}
        </View>
    )
}

export default dropdown

const styles = StyleSheet.create({
    container: {
        width: scale(250),
        height: verticalScale(50),
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
        borderBottomRightRadius: moderateScale(20),
        borderBottomLeftRadius: moderateScale(20),
        elevation: 3,

    },
    option: {
        borderBottomWidth: 1,
        // borderWidth:1,
        // borderColor:"#707070",
        padding: moderateScale(15),
        borderBottomColor:"#ddd",
        
    },
    optionText: {
        fontSize: moderateScale(15)
    }

})