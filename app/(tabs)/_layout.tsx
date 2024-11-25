import { Tabs } from 'expo-router';
import { useSegments } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import WellnessScreen from './wellness';
import ProfileScreen from './ProfilePage';
import NutritionScreen from './ProfilePage';
import LoginScreen from '../auth/Login';
import HealthCheckTab from './ProfilePage';
import { Image, Platform, StyleSheet, View } from 'react-native';
import OverView from './overView';
import Activity from './activity';
import Biomarkers from './biomarkers';
import Nutrition from './nutrition';

// Create Top Tab Navigator
const TopTab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
 
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
          textTransform: 'none',
        },

      
        tabBarIndicatorStyle: {
          backgroundColor: '#1778F2',
          height: 4, 
          borderTopLeftRadius: 4, 
          borderTopRightRadius: 4, 
         
         
       
        },
        tabBarIndicatorContainerStyle: {
          justifyContent: 'center', // Center the indicator in the available space
        },
        tabBarStyle: {
          backgroundColor: '#fff', // Background color of the tab bar
          elevation: 3, // Shadow for Android
          shadowOpacity: 0.1, // Shadow for iOS
        },
        tabBarActiveTintColor:'#1778F2',
        tabBarInactiveTintColor: '#888',
      })}
    >
     
      <TopTab.Screen name="OverView" component={OverView} />
      <TopTab.Screen name="Activity" component={Activity} />
      <TopTab.Screen name="Nutrition" component={Biomarkers} />
      <TopTab.Screen name="Biomarkers" component={Nutrition} />
    </TopTab.Navigator>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments<any>();
  const Tab = createBottomTabNavigator();

  // Check if the current route is in the auth flow
  const isAuthRoute = segments[0] === 'auth';
  if (isAuthRoute) {
    // If on a login, signup, or OTP page, render without tabs
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#007bff', // Active icon color
        tabBarInactiveTintColor: '#888', // Inactive icon color
      }}
    >
      <Tab.Screen 
        name="index" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="head-side-virus" size={26} color={color} />
          ),
        }} 
      />
     
      <Tab.Screen 
        name="Food Data" 
        component={NutritionScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="chalkboard-user" size={26} color={color} />
          ),
        }} 
      />
    
      <Tab.Screen 
        name="TopTabs" 
        component={TopTabs} // Use Top Tab Navigator here
        options={{
          tabBarLabel: 'Top Tabs', 
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="bars" size={26} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="community" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="people-group" size={26} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="more" 
        component={HealthCheckTab} 
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="more-horizontal" size={26} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: 90,
    padding: 30,
    justifyContent: 'center',
    position: 'relative',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 20,
  },
});
