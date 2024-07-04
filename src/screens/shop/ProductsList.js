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
import PList from './PList';
const { width } = Dimensions.get('window');

const API_URL = 'https://app.ironplace.xyz/api/catalog';

const CategoryItem = ({ item, onPress }) => {
  // Render the category item with or without an image based on depth
  if (item.depth === 0) {
    // Top-level category: Render with image
    const imageSource = item.file_id && item.file_id !== 'null'
      ? { uri: `https://app.ironplace.xyz/upload/iblock/${item.file_id}.jpg` }
      : require('./Materials.png'); 

    return (
      <TouchableOpacity onPress={onPress} style={styles.categoryItem}>
        <View style={styles.categoryImageContainer}>
          <Image source={imageSource} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    );
  } else {
    // Nested category: Render without image
    return (
      <TouchableOpacity onPress={onPress} style={styles.nestedCategoryItem}>
        <Text style={styles.nestedCategoryName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
};

const ProductItem = ({ item, onPress }) => {
 

  return (
    <TouchableOpacity onPress={onPress} style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text> 
    </TouchableOpacity>
  );
};

const ProductList = ({ navigation }) => {
  const [catalogData, setCatalogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [numColumns, setNumColumns] = useState(2); // Default number of columns

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setCatalogData(data.catalog || []);
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const handleCategoryPress = (category) => {
    if (category.depth === 2) {
      // Navigate to product list page
      navigation.navigate('PList', { category }); // Pass the category object
    } else if (category.children && category.children.length > 0) {
      // If the category has children, go deeper
      setCurrentCategory(category);
      setNumColumns(1); // Set to 1 for a single column
    } else {
      // If no children, do nothing
    }
  };

  const renderCategoryItems = ({ item }) => (
    <CategoryItem item={item} onPress={() => handleCategoryPress(item)} />
  );

  const renderProductItems = ({ item }) => (
    <ProductItem item={item} onPress={() => handleCategoryPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png')} style={styles.logo} /> 
      </View>

      {isLoading ? (
        <Text>Загрузка каталога...</Text>
      ) : (
        <ScrollView>
          <View style={styles.categoryContainer}>
            <FlatList
              style={styles.categoryFlatListContainer}
              data={catalogData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCategoryItems}
            />
          </View>

          <View style={styles.productsContainer}>
            {currentCategory ? (
              <FlatList
                key={`category-${currentCategory.id}`} // Force re-render when numColumns changes
                data={currentCategory.children}
                numColumns={numColumns}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductItems}
              />
            ) : (
              <Text style={styles.selectCategoryText}>
                Выберите категорию, чтобы просмотреть товары
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color
  },
  header: {
    backgroundColor: '#FFD333', // Header background color
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust logo width
    height: 50, // Adjust logo height
    resizeMode: 'contain',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryFlatListContainer: {
    paddingRight: 16, 
  },
  categoryItem: {
    alignItems: 'center', 
    padding:10
  },
  categoryImageContainer: {
    width: 80, 
    height: 80, 
    borderRadius: 10, 
    overflow: 'hidden', 
    marginBottom: 8, 
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '900',
    color: '#333', // Text color
  },
  // Style for nested categories (without images)
  nestedCategoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nestedCategoryName: {
    fontSize: 16,
    color: '#333',
  },
  productsContainer: {
    padding: 16,
  },
  productItem: {
    width: width / 2 - 24,
    marginRight: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', // Text color
  },
  selectCategoryText: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 16,
    color: '#333', // Text color
  },
});

export default ProductList;