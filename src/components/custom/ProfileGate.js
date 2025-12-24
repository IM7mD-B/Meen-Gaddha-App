import React from 'react';
import useAuthStore from '../../store/AuthStore';
import AuthStack from '../../stacks/AuthStack';
import ProfileScreen from '../../screens/profile/ProfileScreen';

// مؤقت لين اسوي صفحة البروفايل
//const ProfileScreen = () => null;

const ProfileGate = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  // غير مسجل
  if (!isAuthenticated) {
    return <AuthStack />;
  }

  // مسجل
  return <ProfileScreen />;
};

export default ProfileGate;

