import React, { useState } from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from "C:/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png";
import CustomInput from "../../../components/CastomInput/CastomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const NewPassword = () => {
    const {control, handleSubmit} = useForm();
  
    const navigation = useNavigation();
  
    const onSubmitPressed = async data => {
      try {
        await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
        navigation.navigate('SingInScrenn');
      } catch (e) {
        Alert.alert('Oops', e.message);
      }
    };
  
    const onSignInPress = () => {
      navigation.navigate('SingInScrenn');
    };
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Смена пароля</Text>
  
          <CustomInput
            placeholder="Логин"
            name="Username"
            control={control}
            rules={{required: 'Введите логин'}}
          />
  
          <CustomInput
            placeholder="Проверочный код"
            name="Code"
            control={control}
            rules={{required: 'Введите проверочный код'}}
          />
  
          <CustomInput
            placeholder="Введите новый пароль"
            name="Пароль"
            control={control}
            secureTextEntry
            rules={{
              required: 'Введите пароль',
              minLength: {
                value: 8,
                message: 'Длина пароля не меньше 8 символов',
              },
            }}
          />
  
          <CustomButton text="Принять" onPress={handleSubmit(onSubmitPressed)} />
  
          <CustomButton
            text="Назад к авторизации"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    );
  };


const styles = StyleSheet.create({
   text:{
    color:'grey',
    marginVertical:10
   },
   link:{
    color: '#8B00FF'
   },
    root:{
        alignItems: 'center',
        padding: 20
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'black',
        margin: 10
    }
});


export default NewPassword