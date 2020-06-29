import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class AuthLinks extends Component {
  state = {
    showModal: false,
  };

  render() {
    const {toggleAuthState, isLogin} = this.props;
    const authText = isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?';
    const authLink = isLogin ? 'Đăng ký' : 'Đăng nhập';
    const contentPosition = {
      justifyContent: isLogin ? 'space-between' : 'flex-end',
    };

    return (
      <View style={[styles.container, contentPosition]}>
        <View style={styles.switchAuthContainer}>
          <Text style={styles.text}>{authText} </Text>
          <TouchableOpacity onPress={() => toggleAuthState()}>
            <Text style={[styles.switchAuth, styles.text]}>{authLink}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 25,
  },
  text: {
    fontSize: 16,
  },
  switchAuthContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchAuth: {
    fontWeight: '700',
  },
});
