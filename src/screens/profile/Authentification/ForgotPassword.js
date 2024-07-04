import React, { useState } from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import CustomInput from "../../../components/CastomInput/CastomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import { Alert } from "react-native";

const ForgotPassword = () => {
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();
  
    const onSendPressed = async data => {
      
        navigation.navigate('NewPassword');
      
    };
  
    const onSignInPress = () => {
      navigation.navigate('SingInScrenn');
    };
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Смена пароля</Text>
  
          <CustomInput
            name="username"
            control={control}
            placeholder="Логин"
            rules={{
              required: 'Введите логин',
            }}
          />
  
          <CustomButton text="Отправить" onPress={handleSubmit(onSendPressed)} />
  
          <CustomButton
            text="Вернуться к авторизации"
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


export default ForgotPassword