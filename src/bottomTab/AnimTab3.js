import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';
import ColorScreen from '../screens/ColorScreen';
import * as Animatable from 'react-native-animatable';
import ProductsList from '../screens/shop/ProductsList';
import SingInScrenn from '../screens/profile/Authentification/SingIn';
import SingUpScrenn from '../screens/profile/Authentification/SingUp';
import MainProfile from '../screens/profile/MainProfile';
import { createStackNavigator } from '@react-navigation/stack';
import ConfirmEmail from '../screens/profile/Authentification/ConfirmEmail';
import ForgotPassword from '../screens/profile/Authentification/ForgotPassword';
import NewPassword from '../screens/profile/Authentification/NewPassword';
import PList from '../screens/shop/PList';
import DetailsScreen from '../screens/shop/DetailsScreen';
import ProductDetails from '../screens/shop/ProductDetails';

const TabArr = [
  { route: 'Главная', label: 'Главная', type: Icons.Feather, icon: 'home', component: ProductsList, color: Colors.primary, alphaClr: Colors.primaryAlpha },
  { route: 'Поиск', label: 'Поиск', type: Icons.Feather, icon: 'search', component: MainProfile, color: Colors.green, alphaClr: Colors.greenAlpha },
  { route: 'Корзина', label: 'Корзина', type: Icons.Feather, icon: 'shopping-cart', component: ColorScreen, color: Colors.red, alphaClr: Colors.redAlpha },
  { route: 'Профиль', label: 'Профиль', type: Icons.FontAwesome, icon: 'user-circle-o', component: ConfirmEmail, color: Colors.purple, alphaClr: Colors.purpleAlpha },
];

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="SingInScrenn" component={SingInScrenn} />
      <Stack.Screen name="SingUpScrenn" component={SingUpScrenn} />
      <Stack.Screen name="MainProfile" component={MainProfile} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="PList" component={PList} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.primary} />
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: Colors.white, paddingHorizontal: 8
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default function AnimTab3() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
            zIndex: 10
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen 
              key={index} 
              name={item.route} 
              component={item.route === 'Профиль' ? ProfileStack : item.component} // Изменено
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          );
        })}
        
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
})