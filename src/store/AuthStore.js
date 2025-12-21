import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  // ====== STATE ======
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // ====== ACTIONS ======

  // Login
  login: async (token, user) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  // Logout
  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userInfo');

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  // Restore session
  restoreSession: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userInfo = await AsyncStorage.getItem('userInfo');

      if (token && userInfo) {
        set({
          token,
          user: JSON.parse(userInfo),
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
