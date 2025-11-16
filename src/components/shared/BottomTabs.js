import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import HomeScreen from "../../screens/homeScreen/HomeScreen";
import Fonts from "../../../assets/fonts/Fonts";
import Colors from "../../utils/colors/Colors";

// SVG icons
import HomeIconFooter from '../../../assets/icons/HomeIconFooter.svg';
import HomeIconFooterSelected from '../../../assets/icons/HomeIconFooterSelected.svg';
import CategoriesIconFooter from '../../../assets/icons/CategoriesIconFooter.svg';
import CategoriesIconFooterSelected from '../../../assets/icons/CategoriesIconFooterSelected.svg';
import HowToPlayIconFooter from '../../../assets/icons/HowToPlayIconFooter.svg';
import ProfileIconFooter from '../../../assets/icons/ProfileIconFooter.svg';
import ProfileIconFooterSelected from '../../../assets/icons/ProfileIconFooterSelected.svg';


const EmptyScreen = () => null;         //  مؤقت لأنه باقي الصفحات ما سويتها

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: { active: HomeIconFooterSelected, inactive: HomeIconFooter },
  Categories: { active: CategoriesIconFooterSelected, inactive: CategoriesIconFooter },
  Profile: { active: ProfileIconFooterSelected, inactive: ProfileIconFooter },
  About: { active: HowToPlayIconFooter, inactive: HowToPlayIconFooter },
};

const tabLabels = {
  Home: "الرئيسية",
  Categories: "الفئات",
  Profile: "حسابي",
  About: "نحن مين",
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.colors.primary,
        tabBarInactiveTintColor: Colors.colors.text,
        tabBarStyle: {
          height: verticalScale(70),
          paddingTop: verticalScale(10),
        },
        tabBarLabelStyle: {
          fontFamily: "Cairo-Medium",
          fontSize: 12,
        },

        tabBarIcon: ({ focused }) => {
          const Icon = focused 
            ? tabIcons[route.name].active 
            : tabIcons[route.name].inactive;
          const iconSize = moderateScale(24);
          const iconHeight = verticalScale(24);
          return <Icon width={iconSize} height={iconHeight} />;
        },

      })}
    >
      <Tab.Screen name="About" component={EmptyScreen} options={{ tabBarLabel: tabLabels.About }} />
      <Tab.Screen name="Categories" component={EmptyScreen} options={{ tabBarLabel: tabLabels.Categories}} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: tabLabels.Home }} />
      <Tab.Screen name="Profile" component={EmptyScreen} options={{ tabBarLabel: tabLabels.Profile }} />

    </Tab.Navigator>
  );
};

export default BottomTab;
