import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const API_URL = 'https://app.ironplace.xyz/api/catalog'; 

const PList = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Find the category based on its ID (recursive search)
        const findCategory = (categoryData) => {
          for (const item of categoryData) {
            if (item.id === category.id) {
              return item;
            } else if (item.children) {
              const foundCategory = findCategory(item.children);
              if (foundCategory) {
                return foundCategory;
              }
            }
          }
          return null;
        };

        const categoryData = findCategory(data.catalog);

        if (categoryData && categoryData.children) {
          setProducts(categoryData.children); 
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category.id]); 

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Tovar', { categorySlug: item.slug })} 
        style={styles.productItemContainer}
      >
        {/* Check if file_id is available and create the image URI */}
        {item.file_id ? (
          <Image source={{ uri: `https://app.ironplace.xyz/storage/categories/${item.file_id}` }} style={styles.productImage} />
        ) : (
          // Display a placeholder or null image if file_id is missing
          <View style={styles.productImage} /> 
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
        <Text style={styles.categoryTitle}>{category.name}</Text>
      </View>

      {isLoading ? (
        <Text>Загрузка товаров...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.productList}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFD333',
  },
  logo: {
    width: 150, 
    height: 50,
    padding: 25,
    alignItems: 'center',
  },
  categoryTitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productList: {
    padding: 16,
  },
  productItemContainer: {
    marginBottom: 16,
  },
  productImageContainer: {
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  productDetails: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  productProviders: {
    fontSize: 14,
  },
  flatListContent: {
    flexDirection: 'column', // Arrange items vertically
    alignItems: 'center', 
  },
  addToCartButton: {
    backgroundColor: '#FFD333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 46,
    padding: 8,
    backgroundColor: '#FFD333',
    borderRadius: 5,
  }
});

export default PList; 