import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import MenuScreen from './src/screens/MenuScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import RestaurantInfoScreen from './src/screens/RestaurantInfoScreen';
import { AppProvider } from './src/context/AppContext';
import { theme } from './src/theme/theme';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Configure navigation theme to match Ocean Professional
const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: '#e5e7eb',
    primary: theme.colors.primary
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: '#6b7280',
              tabBarStyle: {
                backgroundColor: theme.colors.surface,
                borderTopColor: '#e5e7eb',
                height: 60,
                paddingBottom: 8,
                paddingTop: 8
              },
              tabBarIcon: ({ color }) => {
                let iconName: string = 'grid';
                if (route.name === 'Menu') iconName = 'restaurant-outline';
                else if (route.name === 'Orders') iconName = 'receipt-outline';
                else if (route.name === 'Restaurant') iconName = 'information-circle-outline';
                return <Icon name={iconName} size={22} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
            <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: 'Orders' }} />
            <Tab.Screen name="Restaurant" component={RestaurantInfoScreen} options={{ title: 'Info' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
