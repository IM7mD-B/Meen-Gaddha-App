import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
// import i18n from './i18n'; // ✅ استورد النسخة الكاملة مباشرة
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { isAndroid, storageHandler } from './src/utils/helpers/Helpers';
import MainStack from './src/stacks/MainStack';

export default function App() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  useEffect(() => {
    (async () => {
      const lang = await storageHandler('get', 'language');
      // const appLanguage = lang || language;
      // if (lang == null) {
      I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        i18n.changeLanguage('ar');
        storageHandler('store', 'language', 'ar');
        if (isAndroid() && !I18nManager.isRTL) RNRestart.restart();
      // } else {
      //   i18n.changeLanguage(appLanguage);
      // }
    })();
  }, []);

  useEffect(() => {
    I18nManager.allowRTL(language === 'ar');
    I18nManager.forceRTL(language === 'ar');
  }, [language]);

  return (
      <MainStack />
  );}
