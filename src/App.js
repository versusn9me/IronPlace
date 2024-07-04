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
import AnimTab3 from './bottomTab/AnimTab3';
import Home from './screens/Home';

import Colors from './constants/Colors';
import ContactList from './screens/ContactList';
import ListScreen from './screens/ListScreen';
import { Provider, MD2DarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import Screen from './screens/Screen';
import ProductsList from './screens/shop/ProductsList';
import DetailsScreen from './screens/shop/DetailsScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Fab from './screens/fab/Fab';
import DrawerNav1 from './screens/drawer/drawer1/DrawerNav1';
import HeaderAnim1 from './screens/animHeaders/HeaderAnim1';
import HeaderAnim2 from './screens/animHeaders/HeaderAnim2';
import HeaderAnim3 from './screens/animHeaders/HeaderAnim3';

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
      
      <Stack.Screen name="Tab3" component={AnimTab3} />
     
      <Stack.Screen name="Contacts" component={ContactList} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Screen" component={Screen} />
      <Stack.Screen name="Products" component={ProductsList} />
      <Stack.Screen name="Details" component={DetailsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name="Fab" component={Fab} />
      <Stack.Screen name="Drawer1" component={DrawerNav1} />

      <Stack.Screen name="HeaderAnim1" component={HeaderAnim1}
        options={{
          gestureEnabled: Platform.OS === 'ios',
        }}
      />
      <Stack.Screen name="HeaderAnim2" component={HeaderAnim2}
        options={{
           gestureEnabled: false,
        }}
      />
      <Stack.Screen name="HeaderAnim3" component={HeaderAnim3}
        options={{
           gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default App;

