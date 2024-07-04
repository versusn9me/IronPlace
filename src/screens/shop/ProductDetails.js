import React, { useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown'; 

  const PRODUCT_OFFERS_URL = 'https://app.ironplace.ru/api/product-offers';

  const ProductDetails = ({ route, navigation }) => {
    const { product } = route.params;
    const [productOffers, setProductOffers] = useState([]);
    const [selectedMeasurement, setSelectedMeasurement] = useState('кг');
    const [selectedSort, setSelectedSort] = useState('Дешевле');
    const [showOffers, setShowOffers] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
      const fetchProductOffers = async () => {
        try {
          const response = await fetch(`${PRODUCT_OFFERS_URL}?group_id=${product.id}`);

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const data = await response.json();
          setProductOffers(data.productOffers.data);
        } catch (error) {
          console.error('Error fetching product offers:', error);
        }
      };

      fetchProductOffers();
    }, [product.id]);

    const handleMeasurementChange = (measurement) => {
      setSelectedMeasurement(measurement);

      // Update offers based on selected measurement
      const updatedOffers = productOffers.map((offer) => {
        const measurementId = product.priceMeasurements?.[measurement];
        const updatedPrice = offer.price; // Update price based on measurement
        const updatedPriceMeasurement = measurement; // Update measurement unit
        return { ...offer, price: updatedPrice, priceMeasurementName: updatedPriceMeasurement };
      });
      setProductOffers(updatedOffers);
    };

    const handleSortChange = (sort) => {
      setSelectedSort(sort);

      // Sort offers based on the selected sort
      const sortedOffers = [...productOffers].sort((a, b) => {
        if (sort === 'Дешевле') {
          return parseFloat(a.price) - parseFloat(b.price); // Ascending
        } else if (sort === 'Дороже') {
          return parseFloat(b.price) - parseFloat(a.price); // Descending
        }
        return 0; 
      });
      setProductOffers(sortedOffers);
    };

    const renderOfferItem = ({ item }) => {
      const priceMeasurement = product.priceMeasurements?.[item.priceMeasurementId];
      return (
        <View style={styles.offerItemContainer}>
          {/* Handle null offer_image_url */}
          {item.offer_image_url ? (
            <Image source={{ uri: item.offer_image_url }} style={styles.offerImage} />
          ) : (
            <View style={styles.offerImagePlaceholder} /> 
          )}
          <View style={styles.offerDetails}>
            <Text style={styles.offerProviderName}>{item.provider_name}</Text>
            <Text style={styles.offerPrice}>
              {item.price} <Text style={styles.offerPriceMeasurement}>{priceMeasurement}</Text>
            </Text> 
          </View>
          <TouchableOpacity
            onPress={() => {
              // Handle "В корзину" button click
              console.log('Offer "В корзину" clicked:', item);
            }}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartButtonText}>В корзину</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const handleShowOffers = () => {
      setShowOffers(!showOffers);
      scrollRef.current?.scrollTo({ y: 0, animated: true }); 
    };

    const handleAddToCart = () => {
      // Implement your "Add to Cart" logic here
      console.log('Add to cart button pressed');
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Image
              source={require('/Users/Vladislav/react-native-ui/src/assets/images/img/logo.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.productContent} ref={scrollRef}>
          <View style={styles.productInfo}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productPriceContainer}>
                <Text style={styles.productPrice}>
                  От {product.price} 
                </Text>
                <Text style={styles.productPriceMeasurement}>
                  /{product.measurement_name}
                </Text>
              </View>
              <Text style={styles.productProviders}>
                Поставщики: {product.providersCount}
              </Text>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>В корзину</Text>
          </TouchableOpacity>

          {/* Offers Section */}
          <View style={styles.optionsContainer}>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Сортировать по:</Text>
              <SelectDropdown
                data={['Дешевле', 'Дороже']}
                onSelect={handleSortChange}
                buttonStyle={styles.dropdownButton}
                buttonTextStyle={styles.dropdownButtonText}
                defaultButtonText={selectedSort}
                dropdownStyle={styles.dropdown}
              />
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Единица измерения:</Text>
              <SelectDropdown
                data={['м', 'кг', 'т', 'шт']} //  Updated dropdown options
                onSelect={handleMeasurementChange}
                buttonStyle={styles.dropdownButton}
                buttonTextStyle={styles.dropdownButtonText}
                defaultButtonText={selectedMeasurement}
                dropdownStyle={styles.dropdown}
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleShowOffers} style={styles.showOffersButton}>
            <Text style={styles.showOffersButtonText}>
              {showOffers ? 'Скрыть предложения' : 'Показать предложения'}
            </Text>
          </TouchableOpacity>

          {showOffers && (
            <FlatList
              data={productOffers}
              numColumns={1}
              renderItem={renderOfferItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.offersList}
            />
          )}
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFD333',
  },
  headerContent: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    left: 16,
    top: 5,
    padding: 8,
    backgroundColor: '#FFD333',
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 50,
    padding: 25,
    alignItems: 'center',
    marginLeft: 70,
  },
  productContent: {
    padding: 16,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  productPriceMeasurement: {
    fontSize: 20,
  },
  productProviders: {
    fontSize: 16,
  },
  addToCartButton: { // Add to cart button styling
    backgroundColor: '#FFD333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownButton: {
    backgroundColor: '#FFD333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  dropdown: {
    backgroundColor: '#fff',
  },
  showOffersButton: {
    backgroundColor: '#FFD333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
  showOffersButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  offersList: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  offerItemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 8,
    borderRadius: 5,
  },
  offerProviderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  offerPrice: {
    fontSize: 16,
  },
});

export default ProductDetails;