import React from 'react';
import useAuthStore from '../../store/AuthStore';
import WelcomeScreen from '../../screens/auth/WelcomeScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';


const ProfileGate = ({ navigation, route }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  // استخراج الـ redirectTo القادم من القيم سيتنقز
  const redirectTo = route.params?.params?.redirectTo || route.params?.redirectTo;

  if (!isAuthenticated) {
    // نمرر الـ redirectTo كـ params للويلكم سكرين
    return <WelcomeScreen navigation={navigation} route={{ params: { redirectTo } }} />;
  }

  return <ProfileScreen />;
};
export default ProfileGate;