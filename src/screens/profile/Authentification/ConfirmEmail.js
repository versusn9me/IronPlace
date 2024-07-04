import React, { useState } from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from "C:/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png";
import CustomInput from "../../../components/CastomInput/CastomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import { Alert } from "react-native";

const ConfirmEmail = () => {
    const route = useRoute();
    const {control, handleSubmit, watch} = useForm({
      defaultValues: {username: route?.params?.username},
    });
  
    const username = watch('username');
  
    const navigation = useNavigation();
  
    const onConfirmPressed = async data => {
      try {
        await Auth.confirmSignUp(data.username, data.code);
        navigation.navigate('SingInScrenn');
      } catch (e) {
        Alert.alert('Oops', e.message);
      }
    };
  
    const onSignInPress = () => {
      navigation.navigate('SingUpScrenn');
    };
  
    const onResendPress = async () => {
      try {
        await Auth.resendSignUp(username);
        Alert.alert('Success', 'Code was resent to your email');
      } catch (e) {
        Alert.alert('Oops', e.message);
      }
    };
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Подтверждение почты</Text>
  
          <CustomInput
            name="username"
            control={control}
            placeholder="Логин"
            rules={{
              required: 'Введите логин',
            }}
          />
  
          <CustomInput
            name="code"
            control={control}
            placeholder="Проверочный код"
            rules={{
              required: 'Введите проверочный код',
            }}
          />
  
          <CustomButton text="Проверить" onPress={handleSubmit(onConfirmPressed)} />
  
          <CustomButton
            text="Отправить еще раз"
            onPress={onResendPress}
            type="SECONDARY"
          />
  
          <CustomButton
            text="Вернуться к регистрации"
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


export default ConfirmEmail