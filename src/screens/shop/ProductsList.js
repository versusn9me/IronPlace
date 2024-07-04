import React from 'react'
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import Colors from '../../constants/Colors'
import { bagsList } from '../../constants/Constants'
import { ScrollView } from 'react-native-gesture-handler'
import { Pressable } from 'react-native'
import images from '../../constants/images'



const { width } = Dimensions.get('window');
const ListItem = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { item })}
        style={[styles.imageContainer, { backgroundColor: item.bgColor }]}>
        <SharedElement id={`item.${item.id}.image`}>
          <Image source={item.image} style={styles.image} />
        </SharedElement>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: Colors.darkGray }]}>{item.title}</Text>
        <Text style={styles.text}>${item.price}</Text>
      </View>
    </View>
  )
}
export default function ProductsList({ navigation, route }) {
  const list = [
    {
      id: "0",
      image: require("C:/Users/Vladislav/react-native-ui/src/assets/images/Category/Materials.png"),
      name: "Материалы",
    },
    {
      id: "1",
      image: require("C:/Users/Vladislav/react-native-ui/src/assets/images/Category/Obo.png"),
      name: "Оборудование",
    },
    {
      id: "2",
      image: require("C:/Users/Vladislav/react-native-ui/src/assets/images/Category/SIR.png"),
      name: "Строительство и ремонт",
    },
    {
      id: "3",
      image: require("C:/Users/Vladislav/react-native-ui/src/assets/images/Category/Services.png"),
      name: "Услуги",
    },
  ];

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        

        <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 10 }} autoPlay>
          <Image
            source={require("C:/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png")}
            style={styles.imaga}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  style={{ width: '100%', height: 50, resizeMode: "contain", borderRadius: 25 }}
                  source={item.image} // Correctly access the image from the current item
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 5,
                    paddingRight: 10,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={bagsList}
          numColumns={2}
          style={{ paddingVertical: 10 }}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={navigation} />
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imaga:{
    paddingRight: 0,
    paddingTop:70,
    width:230,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  item: {
    width: width / 2 - 24,
    marginLeft: 16,
    marginBottom: 16,
  },
  imageContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 14,
  },
  image: {
    height: 140,
    width: 140,
    resizeMode: 'center',
  },
  textContainer: {
    marginVertical: 4,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
})