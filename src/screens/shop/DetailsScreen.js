import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const API_URL = 'https://app.ironplace.xyz/api/catalog';

const PList = ({ route }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/${category.id}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category.id]);

  const renderProductItem = ({ item }) => {
    // Render a product with its name
    const imageSource = item.file_id && item.file_id !== 'null'
      ? { uri: `https://app.ironplace.xyz/upload/iblock/${item.file_id}.jpg` }
      : require('./Materials.png'); // Default image

    return (
      <View style={styles.productItemContainer}>
        <Image source={imageSource} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png')}
          style={styles.logo}
        />
      </View>

      {isLoading ? (
        <Text>Загрузка товаров...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.productList}>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
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
    padding: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  productList: {
    padding: 10,
  },
  productItemContainer: {
    width: width / 2 - 20,
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  productName: {
    textAlign: 'center',
  },
});

export default PList;