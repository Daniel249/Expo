import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

const menuData = {
  food: [
    {
      id: 1,
      name: "Burger Deluxe",
      price: 12.99,
      description: "A massive burger with two beef patties, cheese, lettuce, tomatoes, onions, pickles, and our special sauce. This burger is so big you'll need two hands to hold it. Made with fresh ground beef, grilled to perfection, and served on a toasted sesame seed bun. The cheese is melted perfectly and the vegetables are crisp and fresh. This is not just any burger, this is a burger that will make you question all other burgers you've ever had in your life."
    },
    {
      id: 2,
      name: "Pizza Margherita",
      price: 15.50,
      description: "Traditional Italian pizza with fresh mozzarella, tomato sauce, and basil leaves. The dough is hand-tossed and made fresh daily using a secret recipe passed down through generations. The tomato sauce is made from San Marzano tomatoes imported directly from Italy, and the mozzarella is made from the finest buffalo milk. Each pizza is cooked in our wood-fired oven at exactly 800 degrees for 90 seconds to achieve the perfect crispy crust with just the right amount of char."
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      price: 13.75,
      description: "Classic Roman pasta dish with eggs, cheese, pancetta, and black pepper. This recipe uses authentic Pecorino Romano cheese and Parmigiano-Reggiano, combined with farm-fresh eggs from free-range chickens. The pancetta is crispy and perfectly rendered, and the pasta is cooked al dente. The sauce is created by combining the hot pasta with the egg mixture, creating a creamy texture without using any cream. This is how carbonara was meant to be made, no substitutions, no shortcuts."
    }
  ],
  beverages: [
    {
      id: 4,
      name: "Coffee Supreme",
      price: 4.25,
      description: "Premium arabica coffee beans sourced from small farms in Ethiopia, Colombia, and Guatemala. Each bean is carefully selected and roasted in small batches to bring out the unique flavor profile. The coffee has notes of chocolate, caramel, and a hint of fruitiness. It's served at exactly 165 degrees Fahrenheit in a pre-warmed cup to ensure optimal temperature and taste. This is not your average cup of coffee, this is a coffee experience that will transport you to the mountains where these beans were grown."
    },
    {
      id: 5,
      name: "Fresh Orange Juice",
      price: 3.50,
      description: "Freshly squeezed orange juice from Valencia oranges picked at peak ripeness. Each glass contains approximately 6-8 oranges that were squeezed just moments before serving. The oranges are sourced from organic farms and contain no pesticides or artificial additives. The juice is served immediately after squeezing to preserve all the natural vitamins and the fresh citrusy flavor. You can actually taste the sunshine in every sip. No pulp, no concentrate, just pure orange goodness."
    },
    {
      id: 6,
      name: "Craft Beer IPA",
      price: 6.00,
      description: "Locally brewed India Pale Ale with a hoppy flavor and citrus notes. This beer is brewed using traditional methods with Cascade, Centennial, and Chinook hops that provide a perfect balance of bitterness and aroma. The malt bill includes pale malt, crystal malt, and a touch of caramel malt for complexity. It's dry-hopped for additional aroma and has an alcohol content of 6.2%. Each batch is carefully monitored by our brewmaster who has over 20 years of experience in craft brewing."
    }
  ],
  desserts: [
    {
      id: 7,
      name: "Chocolate Lava Cake",
      price: 7.99,
      description: "Decadent chocolate cake with a molten chocolate center, served warm with vanilla ice cream. The cake is made with Belgian dark chocolate and real butter, creating a rich and intense chocolate flavor. When you cut into it, the warm chocolate flows out like lava, hence the name. The vanilla ice cream is made in-house using Madagascar vanilla beans and fresh cream. The contrast between the warm cake and cold ice cream creates a perfect balance of temperatures and textures that will make your taste buds dance with joy."
    },
    {
      id: 8,
      name: "Tiramisu Classic",
      price: 6.50,
      description: "Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream. The recipe comes from a small restaurant in Tuscany and has been unchanged for over 50 years. The mascarpone is imported from Italy and is combined with fresh eggs and sugar to create a light and airy cream. The ladyfingers are soaked in espresso coffee and a touch of coffee liqueur. Each layer is carefully assembled and the dessert is dusted with the finest cocoa powder. It's then chilled for at least 4 hours to allow all the flavors to meld together perfectly."
    }
  ]
};

export default function App() {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [detailMenuQuantities, setDetailMenuQuantities] = useState<{[key: number]: number}>({});
  const [expandedDetailItems, setExpandedDetailItems] = useState<Set<number>>(new Set());
  const [currentScreen, setCurrentScreen] = useState<'gridMenu' | 'detailMenu' | 'payment' | 'longPayment' | 'description' | 'congratulations'>('gridMenu');
  const [selectedItemForDescription, setSelectedItemForDescription] = useState<MenuItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [formData, setFormData] = useState({
    address: '',
  });
  const [longFormData, setLongFormData] = useState({
    email: '',
    telephone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardHolderName: '',
    birthday: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    city: '',
    state: '',
    country: ''
  });

  const handleGridItemPress = (itemId: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleDetailItemPress = (itemId: number) => {
    setExpandedDetailItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleDetailItemDescriptionPress = (itemId: number) => {
    const allItems = [...menuData.food, ...menuData.beverages, ...menuData.desserts];
    const item = allItems.find(i => i.id === itemId);
    if (item) {
      setSelectedItemForDescription(item);
      setCurrentScreen('description');
    }
  };

  const handleAddDetailItem = (itemId: number) => {
    setDetailMenuQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleRemoveDetailItem = (itemId: number) => {
    setDetailMenuQuantities(prev => {
      const newQuantities = { ...prev };
      if (newQuantities[itemId] > 1) {
        newQuantities[itemId]--;
      } else {
        delete newQuantities[itemId];
      }
      return newQuantities;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    const allItems = [...menuData.food, ...menuData.beverages, ...menuData.desserts];
    
    // Add grid menu selections (1 each)
    selectedItems.forEach(itemId => {
      const item = allItems.find(i => i.id === itemId);
      if (item) {
        total += item.price;
      }
    });
    
    // Add detail menu quantities
    Object.entries(detailMenuQuantities).forEach(([itemId, quantity]) => {
      const item = allItems.find(i => i.id === parseInt(itemId));
      if (item) {
        total += item.price * quantity;
      }
    });
    
    return total.toFixed(2);
  };

  const renderGridMenuItem = (item: MenuItem) => {
    const isSelected = selectedItems.has(item.id);

    return (
      <TouchableOpacity key={item.id} style={[styles.gridItem, isSelected && styles.gridItemSelected]} onPress={() => handleGridItemPress(item.id)}>
        <Text style={styles.gridItemName}>{item.name}</Text>
        <Text style={styles.gridItemDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderDetailMenuItem = (item: MenuItem) => {
    const quantity = detailMenuQuantities[item.id] || 0;
    const isExpanded = expandedDetailItems.has(item.id);

    return (
      <View key={item.id} style={styles.menuItem}>
        <TouchableOpacity onPress={() => handleDetailItemPress(item.id)} style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
        
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => handleRemoveDetailItem(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleAddDetailItem(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
    );
  };

  const renderGridMenuScreen = () => {
    const allItems = [...menuData.food, ...menuData.beverages, ...menuData.desserts];
    const rows = [];
    
    for (let i = 0; i < allItems.length; i += 3) {
      const rowItems = allItems.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.gridRow}>
          {rowItems.map(renderGridMenuItem)}
          {rowItems.length < 3 && Array(3 - rowItems.length).fill(null).map((_, index) => <View key={`empty-${index}`} style={styles.gridItem} />)}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome to Our Restaurant!</Text>
          <TouchableOpacity style={styles.detailMenuButton} onPress={() => setCurrentScreen('detailMenu')}>
            <Text style={styles.detailMenuButtonText}>DETAILED MENU</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.gridContainer}>
          {rows}
          <View style={styles.spacing} />
        </ScrollView>
        
        <TouchableOpacity style={styles.payButtonGrid} onPress={() => setCurrentScreen('longPayment')}>
          <Text style={styles.payButtonText}>PAY NOW</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDetailMenuScreen = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('gridMenu')}>
          <Text style={styles.backButtonText}>← GO BACK</Text>
        </TouchableOpacity>
        
        <Text style={styles.greeting}>Detailed Menu</Text>
        
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <View style={styles.sectionContainerFood}>
            <Text style={styles.sectionTitle}>FOOD</Text>
            {menuData.food.map(renderDetailMenuItem)}
          </View>

          <View style={styles.sectionContainerBeverages}>
            <Text style={styles.sectionTitle}>BEVERAGES</Text>
            {menuData.beverages.map(renderDetailMenuItem)}
          </View>

          <View style={styles.sectionContainerDesserts}>
            <Text style={styles.sectionTitle}>DESSERTS</Text>
            {menuData.desserts.map(renderDetailMenuItem)}
          </View>

          <View style={styles.spacing} />
        </ScrollView>
        
        <View style={styles.totalBar}>
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          <TouchableOpacity style={styles.payButton} onPress={() => setCurrentScreen('payment')}>
            <Text style={styles.payButtonText}>PAY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDescriptionScreen = () => {
    if (!selectedItemForDescription) return null;
    
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('detailMenu')}>
          <Text style={styles.backButtonText}>← GO BACK</Text>
        </TouchableOpacity>
        
        <Text style={styles.descriptionTitle}>{selectedItemForDescription.name}</Text>
        
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{selectedItemForDescription.description}</Text>
          <View style={styles.spacing} />
        </ScrollView>
      </View>
    );
  };

  const renderPaymentScreen = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('gridMenu')}>
          <Text style={styles.backButtonText}>← GO BACK</Text>
        </TouchableOpacity>
        
        <Text style={styles.paymentTitle}>Payment Information</Text>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        
        <ScrollView style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Address *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({...prev, address: text}))}
            placeholder="Enter your complete address"
          />

          <Text style={styles.fieldLabel}>Payment Method *</Text>
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity 
              style={[styles.paymentMethodOption, paymentMethod === 'cash' && styles.paymentMethodSelected]} 
              onPress={() => setPaymentMethod('cash')}
            >
              <Text style={styles.paymentMethodText}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.paymentMethodOption, paymentMethod === 'card' && styles.paymentMethodSelected]} 
              onPress={() => setPaymentMethod('card')}
            >
              <Text style={styles.paymentMethodText}>Card</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={() => setCurrentScreen('congratulations')}>
            <Text style={styles.submitButtonText}>Pay</Text>
          </TouchableOpacity>
          
          <View style={styles.spacing} />
        </ScrollView>
      </View>
    );
  };

  const renderLongPaymentScreen = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('gridMenu')}>
          <Text style={styles.backButtonText}>← GO BACK</Text>
        </TouchableOpacity>
        
        <Text style={styles.paymentTitle}>Payment Information</Text>
        
        <ScrollView style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Email Address *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.email}
            onChangeText={(text) => setLongFormData(prev => ({...prev, email: text}))}
            placeholder="Enter your email address"
            keyboardType="email-address"
          />

          <Text style={styles.fieldLabel}>First Name *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.firstName}
            onChangeText={(text) => setLongFormData(prev => ({...prev, firstName: text}))}
            placeholder="Enter your first name"
          />

          <Text style={styles.fieldLabel}>Last Name *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.lastName}
            onChangeText={(text) => setLongFormData(prev => ({...prev, lastName: text}))}
            placeholder="Enter your last name"
          />

          <Text style={styles.fieldLabel}>Telephone Number *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.telephone}
            onChangeText={(text) => setLongFormData(prev => ({...prev, telephone: text}))}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.fieldLabel}>Birth Date *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.birthday}
            onChangeText={(text) => setLongFormData(prev => ({...prev, birthday: text}))}
            placeholder="MM/DD/YYYY"
          />

          <Text style={styles.fieldLabel}>Street Address *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.address}
            onChangeText={(text) => setLongFormData(prev => ({...prev, address: text}))}
            placeholder="Enter your street address"
          />

          <Text style={styles.fieldLabel}>City *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.city}
            onChangeText={(text) => setLongFormData(prev => ({...prev, city: text}))}
            placeholder="Enter your city"
          />

          <Text style={styles.fieldLabel}>State/Province *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.state}
            onChangeText={(text) => setLongFormData(prev => ({...prev, state: text}))}
            placeholder="Enter your state or province"
          />

          <Text style={styles.fieldLabel}>ZIP/Postal Code *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.zipCode}
            onChangeText={(text) => setLongFormData(prev => ({...prev, zipCode: text}))}
            placeholder="Enter your ZIP or postal code"
          />

          <Text style={styles.fieldLabel}>Country *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.country}
            onChangeText={(text) => setLongFormData(prev => ({...prev, country: text}))}
            placeholder="Enter your country"
          />

          <Text style={styles.fieldLabel}>Card Holder Name *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.cardHolderName}
            onChangeText={(text) => setLongFormData(prev => ({...prev, cardHolderName: text}))}
            placeholder="Name as it appears on card"
          />

          <Text style={styles.fieldLabel}>Card Number *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.cardNumber}
            onChangeText={(text) => setLongFormData(prev => ({...prev, cardNumber: text}))}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
          />

          <Text style={styles.fieldLabel}>Card Expiry Date *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.cardExpiry}
            onChangeText={(text) => setLongFormData(prev => ({...prev, cardExpiry: text}))}
            placeholder="MM/YY"
            keyboardType="numeric"
          />

          <Text style={styles.fieldLabel}>Card Security Code (CVC) *</Text>
          <TextInput
            style={styles.textInput}
            value={longFormData.cardCVC}
            onChangeText={(text) => setLongFormData(prev => ({...prev, cardCVC: text}))}
            placeholder="123"
            keyboardType="numeric"
            secureTextEntry
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>COMPLETE PAYMENT - ${calculateTotal()}</Text>
          </TouchableOpacity>
          
          <View style={styles.spacing} />
        </ScrollView>
      </View>
    );
  };

  const renderCongratulationsScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.congratulationsContainer}>
          <Text style={styles.congratulationsTitle}>¡Enhorabuena!</Text>
          <Text style={styles.congratulationsSubtitle}>Se realizó tu orden</Text>
          <Text style={styles.congratulationsMessage}>
            Tu pedido ha sido procesado exitosamente.{'\n'}
            Recibirás una confirmación en breve.
          </Text>
          <TouchableOpacity style={styles.congratulationsButton} onPress={() => setCurrentScreen('gridMenu')}>
            <Text style={styles.congratulationsButtonText}>Volver al Menú</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (currentScreen === 'payment') {
    return renderPaymentScreen();
  }

  if (currentScreen === 'congratulations') {
    return renderCongratulationsScreen();
  }

  if (currentScreen === 'longPayment') {
    return renderLongPaymentScreen();
  }

  if (currentScreen === 'description') {
    return renderDescriptionScreen();
  }

  if (currentScreen === 'detailMenu') {
    return renderDetailMenuScreen();
  }

  return renderGridMenuScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  greeting: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuContainer: {
    // content container for ScrollView: include bottom padding so the pay button
    // and bottom navigation won't overlap the content on small screens
    paddingHorizontal: 10,
    paddingBottom: 160,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 5,
    color: '#666666',
  },
  menuItem: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#999999',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 16,
    color: '#333333',
    textAlign: 'left',
  },
  spacing: {
    height: 80,
  },
  sectionContainerFood: {
    backgroundColor: '#fff2e6',
    padding: 10,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
  sectionContainerBeverages: {
    backgroundColor: '#e8f7ff',
    padding: 10,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
  sectionContainerDesserts: {
    backgroundColor: '#BAD9B5',
    padding: 10,
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
  totalBar: {
    backgroundColor: '#dddddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: '#999999',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#666666',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#999999',
    padding: 15,
    margin: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333333',
  },
  textInput: {
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    fontSize: 14,
    minHeight: 40,
  },
  submitButton: {
    backgroundColor: '#666666',
    padding: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 15,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333333',
    textAlign: 'left',
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#cccccc',
    margin: 5,
    padding: 10,
    minHeight: 120,
  },
  gridItemSelected: {
    backgroundColor: '#999999',
  },
  gridItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  gridItemDescription: {
    fontSize: 10,
    lineHeight: 14,
    color: '#333333',
    textAlign: 'left',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  detailMenuButton: {
    backgroundColor: '#666666',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  detailMenuButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  payButtonGrid: {
    backgroundColor: '#666666',
    margin: 15,
    padding: 15,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  paymentMethodOption: {
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 15,
    marginRight: 10,
    flex: 1,
  },
  paymentMethodSelected: {
    backgroundColor: '#cccccc',
    borderColor: '#999999',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  congratulationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f5f5f5',
  },
  congratulationsTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 15,
  },
  congratulationsSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  congratulationsMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  congratulationsButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  congratulationsButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});