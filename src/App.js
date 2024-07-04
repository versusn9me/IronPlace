/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Home from './screens/Home';

import Colors from './constants/Colors';

import { Provider, MD2DarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import ProductsList from './screens/shop/ProductsList';
import DetailsScreen from './screens/shop/DetailsScreen';
import ConfirmEmail from './screens/profile/Authentification/ConfirmEmail';
import ForgotPassword from './screens/profile/Authentification/ForgotPassword';
import NewPassword from './screens/profile/Authentification/NewPassword';
import SingInScrenn from './screens/profile/Authentification/SingIn';
import SingUpScrenn from './screens/profile/Authentification/SingUp';
import MainProfile from './screens/profile/MainProfile';
import PList from './screens/shop/PList';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ProductDetails from './screens/shop/ProductDetails';
import Tovar from './screens/shop/Tovar';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <Provider theme={isDarkMode ? MD2DarkTheme : PaperDefaultTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor} />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

const options = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
}

const Stack = createSharedElementStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Products" component={ProductsList} />
      <Stack.Screen name="PList" component={PList} />
      <Stack.Screen name="Details" component={DetailsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
     <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
     <Stack.Screen name="Tovar" component={Tovar} />
     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
     <Stack.Screen name="NewPassword" component={NewPassword} />
     <Stack.Screen name="SingInScrenn" component={SingInScrenn} />
     <Stack.Screen name="SingUpScrenn" component={SingUpScrenn} />
     <Stack.Screen name="MainProfile" component={MainProfile} />
     <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default App;

