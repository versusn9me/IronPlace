import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({onPress, text, type = "PRIMARY"}) =>{
    return(
        <Pressable 
            onPress={onPress} 
            style={[styles[`container_${type}`]]} >
            <Text style={[styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFD333',
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems:'center',
        borderRadius: 5,

    },
    container_PRIMARY:{
        backgroundColor: '#FFD333',
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems:'center',
        borderRadius: 5,
        marginVertical:10
    },
    container_SECONDARY:{
        borderWidth:2,
        borderColor: "#00000",
        padding: 10,
        marginVertical: 10,
        borderRadius: 40
    },  
    container_TERIARY:{
        margin: 10
    },
    text:{
        fontWeight: 'bold',
        color: 'white'
    },
    text_TERIARY:{
        color: 'grey'
    },
    text_PRIMARY:{
        fontWeight: 'bold',
        color: 'white'
    }
});



export default CustomButton