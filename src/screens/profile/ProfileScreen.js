import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SubscribeIcon from '../../../assets/images/Subscribe.svg';
import Profile from '../../../assets/images/Profile.svg';
import api from '../../api/api';
import { Alert } from 'react-native';
import useAuthStore from '../../store/AuthStore';
import Colors from '../../utils/colors/Colors';
import { Fonts } from '../../../assets/fonts/Fonts';

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState('subscription');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useAuthStore(state => state.logout);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.getProfile();
                const data = response.data;

                setUser({
                    name: data.name,
                    email: data.email || data.email || 'غير متوفر',
                });
            } catch (error) {
                console.log('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>

            </View>
        );
    }

    const handleLogout = () => {
        Alert.alert(
            'تسجيل الخروج',
            'هل أنت متأكد أنك تريد تسجيل الخروج؟',
            [
                {
                    text: 'لا',
                    style: 'cancel',
                },
                {
                    text: 'نعم',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                    },
                },
            ]
        );
    };


    return (
        <View style={styles.container}>
            {/* ===== Profile Header ===== */}
            <View style={styles.header}>
                <Profile width={scale(90)} height={scale(90)} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            {/* ===== Card ===== */}
            <View style={styles.card}>
                {/* Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => setActiveTab('subscription')}>
                        <Text style={[styles.tabText, activeTab === 'subscription' && styles.activeTab]}>
                            الاشتراك
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setActiveTab('settings')}>
                        <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTab]}>
                            اعدادات
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ===== Subscription ===== */}
                {activeTab === 'subscription' && (
                    <TouchableOpacity activeOpacity={0.85} style={styles.subscriptionContainer}>
                        <SubscribeIcon width={scale(90)} height={scale(90)} />
                        <Text style={styles.subTitle}>الاشتراك المميز</Text>
                        <Text style={styles.price}>19.99 ريال</Text>
                    </TouchableOpacity>
                )}

                {/* ===== Settings ===== */}
                {activeTab === 'settings' && (
                    <View style={styles.settingsCard}>
                        <SettingButton title="تغيير كلمة المرور" />
                        <View style={styles.divider} />
                        <SettingButton
                            title="تسجيل الخروج"
                            onPress={handleLogout}
                        />
                        <View style={styles.divider} />
                        <SettingButton title="تواصل معنا" />
                    </View>
                )}
            </View>
        </View>
    );
}

/* ===== Button ===== */
const SettingButton = ({ title, onPress }) => (
    <TouchableOpacity
        style={styles.settingBtn}
        activeOpacity={0.85}
        onPress={onPress}
    >
        <Text style={styles.settingText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.Buttonbackground,
    },

    header: {
        alignItems: 'center',
        marginTop: verticalScale(100),
    },

    name: {
        fontFamily: Fonts.FontBold,
        fontSize: moderateScale(22),
        marginTop: verticalScale(12),
    },

    email: {
        fontFamily: Fonts.FontRegular,
        fontSize: moderateScale(14),
        color: '#9A9A9A',
        marginTop: verticalScale(6),
        textDecorationLine: 'underline',
    },

    card: {
        marginTop: verticalScale(40),
        backgroundColor: Colors.colors.accentLight,
        borderRadius: moderateScale(32),
        padding: moderateScale(20),
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
        gap: scale(100),
    },

    tabText: {
        fontFamily: Fonts.FontRegular,
        fontSize: moderateScale(16),
        color: '#A38989',
    },

    activeTab: {
        color: '#000',
        fontWeight: '600',
    },

    subscriptionContainer: {
        alignItems: 'center',
        marginTop: verticalScale(10),
    },

    subTitle: {
        fontFamily: Fonts.FontRegular,
        fontSize: moderateScale(17),
        color: '#000',
        marginTop: verticalScale(10),
    },

    price: {
        fontFamily: Fonts.FontRegular,
        fontSize: moderateScale(14),
        color: '#000',
        marginTop: verticalScale(4),
    },

    settingsCard: {
        backgroundColor: Colors.colors.Buttonbackground,
        borderRadius: moderateScale(18),
        overflow: 'hidden',
    },

    settingBtn: {
        paddingVertical: verticalScale(14),
        alignItems: 'center',
    },

    settingText: {
        fontFamily: Fonts.FontMedium,
        color: '#FFF',
        fontSize: moderateScale(14),
    },
    divider: {
        height: verticalScale(1),
        backgroundColor: 'rgba(255,255,255,0.3)',
    }

});
