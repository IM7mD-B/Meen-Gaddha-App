import React, { useEffect, useState } from 'react';
import { I18nManager, Platform } from 'react-native';
import './i18n';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { storageHandler } from './src/utils/helpers/Helpers';
import MainStack from './src/stacks/MainStack';
import useAuthStore from './src/store/AuthStore';


export default function App() {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  const restoreSession = useAuthStore(state => state.restoreSession);


  useEffect(() => {
    (async () => {

      // Restore Auth Session
      await restoreSession();

      // Language
      const lang = await storageHandler('get', 'language');
      const appLanguage = lang || 'ar';

      i18n.changeLanguage(appLanguage);

      // تفعيل RTL
      if (appLanguage === 'ar' && !I18nManager.isRTL) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        RNRestart.Restart();

        //  يعيد التشغيل تلقائيًا
        
      }

      await storageHandler('store', 'language', appLanguage);
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return <MainStack />;
}
