import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const PRODUCT_GROUP_URL = 'https://app.ironplace.ru/api/product-groups';

const Tovar = ({ route, navigation }) => {
  const { categorySlug } = route.params; 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${PRODUCT_GROUP_URL}?slug=${categorySlug}`); 
        console.log('Дурка')
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.productGroups.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItemContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetails', { product: item })} 
          style={styles.productImageContainer}
        >
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </TouchableOpacity>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>
            {/* Wrap the price and measurement_name in Text components */}
            От <Text style={styles.productPriceValue}>{item.price}</Text> за <Text style={styles.productPriceMeasurement}>{item.measurement_name}</Text> 
          </Text> 
          <Text style={styles.productProviders}>
            Поставщики: {item.providers_count}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        <Image
          source={require('/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png')}
          style={styles.logo}
        />
      </View>

      {isLoading ? (
        <Text>Загрузка товаров...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.Tovar}>
          <FlatList
            data={products}
            numColumns={1} 
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    logo: {
        width: 150, 
        height: 50,
        padding: 25,
        alignItems: 'center',
    
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFD333',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    padding: 8,
    backgroundColor: '#FFD333',
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 50,
    padding: 25,
    alignItems: 'center',
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  Tovar: {
    padding: 16,
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 8,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
  },
  productProviders: {
    fontSize: 12,
    color: '#888',
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
});

export default Tovar;