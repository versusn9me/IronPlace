import React, { useState } from "react";
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Logo from "C:/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png";
import CustomInput from "../../../components/CastomInput/CastomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SingUpScrenn = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {username, password, email, name} = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username},
      });

      navigation.navigate('ConfirmEmail', {username});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SingInScrenn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Регистрация</Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="Имя"
          rules={{
            required: 'Введите имя',
            minLength: {
              value: 2,
              message: 'ФИО должно быть длинее 2 символов',
            },
            maxLength: {
              value: 24,
              message: 'Имя должно быть короче 24 символов',
            },
          }}
        />

        <CustomInput
          name="username"
          control={control}
          placeholder="Фамилия"
          rules={{
            required: 'Введите фамилию',
            minLength: {
              value: 3,
              message: 'Фамилия должна быть длинее 3 символов',
            },
            maxLength: {
              value: 24,
              message: 'Фамилия должна быть короче 24 символов',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Введите Email',
            pattern: {value: EMAIL_REGEX, message: 'Email неправильный'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Пароль"
          secureTextEntry
          rules={{
            required: 'Введите пароль',
            minLength: {
              value: 8,
              message: 'Длина пароля хотя бы 8 символов',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Повторите пароль"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Пароль не совпадает',
          }}
        />

        <CustomButton
          text="Зарегистрироваться"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          Регистрируясь вы принимаете{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            условия использования
          </Text>{' '}
          и{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Политику конфиденциальности
          </Text>
        </Text>

        <CustomButton
          text="Уже есть аккаунт?"
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


export default SingUpScrenn