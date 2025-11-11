import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../utils/Colors/Colors';
import { GlobalStyle } from '../../utils/GlobalStyle/GlobalStyle';

const BottomPopup = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.overlayTouchable} onPress={onClose} />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.content}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000040', // شفافية الخلفية
  },
  overlayTouchable: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    borderTopRightRadius: scale(40),
    borderTopLeftRadius: scale(40),
    padding: scale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: verticalScale(),
    justifyContent: 'space-between',
  },
  title: {
    ...GlobalStyle.sheetTitle,
    color: Colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },

  close: {
    fontSize: scale(17),
    color: Colors.textSecondary,
  },
  content: {
    marginTop: verticalScale(16),
color: Colors.red,
  },
})
