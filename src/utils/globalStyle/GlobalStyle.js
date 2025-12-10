import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../colors/Colors";
import {Fonts} from '../../../assets/fonts/Fonts.js';

const globalStyles = StyleSheet.create({

  // Buttons 
  buttonSginIn: {                           //زر الساين وبدءالقيم
    width: scale(254),
    height: verticalScale(47),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
  },
  buttonMedium: {                           //زر الاجابه والاختيار
    width: scale(330),
    height: verticalScale(39),
    borderRadius: moderateScale(22),
    backgroundColor: colors.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
  },
  buttonFull: {                           //زر البروفايل والدفع
    width: scale(320),
    height: verticalScale(30),
    borderRadius: moderateScale(10),
    backgroundColor: colors.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAid: {                           //ازار وسائل المساعده
    width: scale(27),
    height: verticalScale(25),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.colors.primary,
    borderColor: colors.colors.primary,
  },
  buttonText: {                           //نص داخل الازرار
    color: colors.colors.primary,
    fontFamily: Fonts.FontBold,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Text Styles 
  mainTitle: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.FontBold,
  },
  subTitle: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.FontSemiBold,
  },
  bodyText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.FontMedium,
  },
  smallText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.FontMedium,
  },
});

export default globalStyles;
