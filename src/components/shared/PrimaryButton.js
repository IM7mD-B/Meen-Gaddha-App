import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import PrimaryText from './PrimaryText';
import { Colors } from '../../utils/Colors/Colors';
import { GlobalStyle } from '../../utils/GlobalStyle/GlobalStyle';
import { View } from 'react-native-ui-lib';

const PrimaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  isColored = true,
  isDisabled = false,
  children,
  //isLoading = false,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        {
          width: '100%',
          height: verticalScale(46),
          borderRadius: moderateScale(12),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDisabled? Colors.gray100:isColored ? Colors.primary : 'transparent',
          borderColor: isColored ? 'transparent' : Colors.gray200,
          borderWidth: isColored ? 0 : scale(1),
          paddingHorizontal: moderateScale(10),
        },
        style,
        
      ]}
      onPress={onPress}
    >
{/* if the children exist add children its if u want to add an icon or image  */}
    
     {children && children}
        
      
      <PrimaryText text={title} style={[GlobalStyle.buttonLg,{color: Colors.white} , textStyle]} />
    </TouchableOpacity>
  );
};

export default PrimaryButton;