// src/screens/Auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../../api/authApi';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      // 1. Gọi API đăng nhập
      const response: any = await authApi.login(username, password);
      
      // 2. Lưu Token vào bộ nhớ
      const { access, refresh } = response.data;
      await AsyncStorage.setItem('userToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
      
      // 3. Reset navigation và chuyển sang Main
      console.log("Login thành công!");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });

    } catch (error: any) {
      console.log('Login Error:', error);
      Alert.alert('Đăng nhập thất bại', 'Sai số điện thoại hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PMS Cư Dân</Text>
        <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại..."
          value={username}
          onChangeText={setUsername}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', justifyContent: 'center', padding: 20 },
  header: { marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0d6efd', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#6c757d' },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  label: { fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#dee2e6' },
  button: { backgroundColor: '#0d6efd', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default LoginScreen;