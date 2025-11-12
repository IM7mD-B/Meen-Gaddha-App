import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Arrow_Back from '../../../assets/icons/Arrow_Back.svg';
import Fonts from "../../../assets/fonts/Fonts";
import Colors from "../../utils/colors/Colors";

const Header = ({
  showBack = false,
  showProfile = false,
  showTitle = false,
  title = '',
  onBackPress = () => { },
  onProfilePress = () => { },
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Left section */}
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress}>
              <Arrow_Back width={scale(35)} height={verticalScale(32)} />
            </TouchableOpacity>
          )}

          {showProfile && (
            <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
              <View style={styles.profileAvatar} />

              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>طال عمرك</Text>
                <Text style={styles.profileRole}>لاعب جديد</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Center title */}
        {showTitle && (
          <View style={styles.centerContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  safeArea: {
    backgroundColor: Colors.colors.background,
  },

  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(50),
    backgroundColor: Colors.colors.background,
  },

  leftContainer: {
    position: "absolute",
    left: scale(12),
    paddingTop: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
  },

  profileButton: {
    flexDirection: "row",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(12),
    gap: scale(8),
  },

  profileAvatar: {
    width: scale(32),
    height: scale(32),
    backgroundColor: "#D9D9D9",
    borderRadius: moderateScale(8), 
  },

  profileTextContainer: {
    flexDirection: "column",
    alignItems: 'flex-start',
  },

  profileName: {
    color: Colors.colors.text,
    fontSize: scale(12),
    fontFamily: "Cairo-Medium", 
  },

  profileRole: {
    color: Colors.colors.text,
    fontSize: scale(14),
    fontFamily: "Cairo-Medium", 
  },

  centerContainer: {
    position: "absolute",
    alignItems: "center",
    paddingTop: verticalScale(10),
  },

  titleText: {
    fontSize: moderateScale(25),
    fontFamily: "Cairo-Medium",
    color: Colors.colors.text,
  },
});

export default Header;
