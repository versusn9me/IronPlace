import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, Alert } from "react-native";
import Logo from "C:/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png";
import CustomInput from "../../../components/CastomInput/CastomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('App started');

const SingInScrenn = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [xsrfToken, setXsrfToken] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm();

  

  useEffect(() => {
    const fetchXsrfToken = async () => {
      try {
        const response = await axios.get('https://app.ironplace.xyz:443/sanctum/csrf-cookie', {
          withCredentials: true
        });
        const xsrfTokenCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('XSRF-TOKEN'));
        const xsrfToken = xsrfTokenCookie.split('=')[1].split(';')[0].trim();
        await AsyncStorage.setItem('xsrfToken', xsrfToken);
        console.log('XSRF token stored:', xsrfToken); // Add this line
        setXsrfToken(xsrfToken);
      } catch (error) {
        console.error("Error fetching XSRF token:", error);
      }
    };
    fetchXsrfToken();
  }, []);

const onSignInPressed = async (data) => {
  if (loading) {
    return;
  }

  setLoading(true);
  try {
    const xsrfToken = await AsyncStorage.getItem('xsrfToken'); 
    console.log('XSRF token retrieved:', xsrfToken);
    const headers = {
      'Cookie': `XSRF-TOKEN=${xsrfToken}`
    };
    console.log('Headers:', headers);
    
    const response = await axios({
      method: 'post',
      url: "https://app.ironplace.xyz/login",
      data: {
        email: data.email,
        password: data.password
      },
      headers: {
        'Cookie': `XSRF-TOKEN=${xsrfToken}`  
      },
      
      withCredentials: true
    });
    
      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token);
        navigation.navigate("MainProfile");
      } else {
        Alert.alert("Oops", response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Oops", "Something went wrong");
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SingUpScrenn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: "Введите Email" }}
        />
        <CustomInput
          name="password"
          placeholder="Пароль"
          secureTextEntry
          control={control}
          rules={{
            required: "Введите пароль",
            minLength: {
              value: 3,
              message: "Длина пароля минимум 3 символа",
            },
          }}
        />
        <CustomButton
          text={loading ? "Загрузка..." : "Войти"}
          onPress={handleSubmit(onSignInPressed)}
        />
        <CustomButton
          text="Забыли пароль?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <CustomButton
          text="Еще нет аккаунта?"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SingInScrenn;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    height: 100,
    maxWidth: 300,
    maxHeight: 200
  },
});
