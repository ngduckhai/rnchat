import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {showAlert} from '../../helpers/alert';
import AuthService from '../../services/auth-service';
import Indicator from '../components/indicator';
import ChatService from '../../services/chat-service';

export default class AuthForm extends Component {
  state = {
    name: '',
    password: '',
    isLoader: false,
  };

  componentDidUpdate(prevProps) {
    const {isLogin} = this.props;
    if (prevProps.isLogin !== isLogin) {
      this.setState({name: '', password: ''});
    }
  }

  login = () => {
    const {name, password} = this.state;
    const {isLogin, navigation} = this.props;
    const dataUser = {full_name: name, login: name, password: password};

    Keyboard.dismiss();

    if (!name.trim() || !password.trim()) {
      showAlert('THÔNG BÁO!\n\nVui lòng nhập Tài khoản và Mật khẩu.');
      return;
    }

    this.setState({isLoader: true});

    if (isLogin) {
      AuthService.signIn(dataUser)
        .then(() => {
          ChatService.setUpListeners();
          this.setState({isLoader: false});
          navigation.navigate('Dialogs');
        })
        .catch(error => {
          this.setState({isLoader: false});
          showAlert('LỖI!\n\nSai Tài khoản và Mật khẩu.');
        });
    } else {
      AuthService.signUp(dataUser)
        .then(() => {
          this.setState({isLoader: false});
          ChatService.setUpListeners();
          showAlert('Đăng ký thành công!');
          navigation.navigate('Dialogs');
        })
        .catch(error => {
          this.setState({isLoader: false});
          showAlert('Lỗi.\n\nĐăng ký không thành công.');
        });
    }
  };

  render() {
    const {name, password, isLoader} = this.state;
    const {isLogin} = this.props;
    return (
      <View style={styles.container}>
        {isLoader && <Indicator color={'green'} size={40} />}
        <TextInput
          placeholder="Tài khoản"
          placeholderTextColor="grey"
          returnKeyType="next"
          onSubmitEditing={() => this.emailInput.focus()}
          onChangeText={text => this.setState({name: text})}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          placeholderTextColor="grey"
          secureTextEntry={true}
          autoCapitalize="none"
          returnKeyType="done"
          onChangeText={text => this.setState({password: text})}
          value={password}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => this.login()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    height: 50,
    color: 'black',
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    fontSize: 18,
  },
  buttonContainer: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00e3cf',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
});
