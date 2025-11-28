import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Icon để làm đẹp Tab Bar

// Import các màn hình
import LoginScreen from './src/screens/Auth/LoginScreen';
import FeedbackListScreen from './src/screens/Feedback/FeedbackListScreen';
import CreateFeedbackScreen from './src/screens/Feedback/CreateFeedbackScreen'; // Đã import màn hình thật

// Tạo màn hình Home tạm thời
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0d6efd', marginBottom: 10 }}>
      Chào mừng Cư dân!
    </Text>
    <Text style={{ color: '#6c757d' }}>Đây là bảng tin & thông báo của BQL.</Text>
    <Text style={{ color: '#6c757d', marginTop: 5 }}>Vui lòng chọn tab "Phản hồi" để gửi yêu cầu.</Text>
  </View>
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- CẤU HÌNH TAB BAR (Thanh menu dưới đáy) ---
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#0d6efd',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Feedback') {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          } else {
            iconName = 'alert-circle';
          }

          // Trả về Icon tương ứng
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ' }} 
      />
      <Tab.Screen 
        name="Feedback" 
        component={FeedbackListScreen} 
        options={{ title: 'Phản hồi', headerShown: false }} // Ẩn header của Tab để dùng Header riêng trong FeedbackListScreen
      />
    </Tab.Navigator>
  );
}

// --- CẤU HÌNH APP CHÍNH (Luồng đi của ứng dụng) ---
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        
        {/* 1. Màn hình Đăng nhập (Mặc định) */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* 2. Màn hình Chính (Chứa 2 Tab: Home & Feedback) */}
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }} 
        />

        {/* 3. Màn hình Tạo phản hồi (Nằm đè lên trên Tab Bar) */}
        <Stack.Screen 
          name="CreateFeedback" 
          component={CreateFeedbackScreen} 
          options={{ 
            title: 'Gửi phản hồi mới',
            headerStyle: { backgroundColor: '#0d6efd' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}