import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import AppHeader from '../components/AppHeader';
import MenuItemCard, { MenuItem } from '../components/MenuItemCard';
import { useApp } from '../context/AppContext';
import { fetchMenu } from '../services/restaurantService';
import { theme } from '../theme/theme';
import Button from '../components/Button';

export default function MenuScreen() {
  const { state, addToCart, incrementQty, decrementQty } = useApp();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const cartCount = useMemo(
    () => Object.values(state.cart).reduce((sum, c) => sum + c.quantity, 0),
    [state.cart]
  );
  const cartTotal = useMemo(
    () => Object.values(state.cart).reduce((sum, c) => sum + c.quantity * c.item.price, 0),
    [state.cart]
  );

  async function load() {
    setRefreshing(true);
    try {
      const data = await fetchMenu();
      setMenu(data);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Menu" subtitle="Explore our latest dishes" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={menu}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            quantity={state.cart[item.id]?.quantity ?? 0}
            onAdd={addToCart}
            onIncrement={() => incrementQty(item.id)}
            onDecrement={() => decrementQty(item.id)}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
      />
      {cartCount > 0 && (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartTitle}>{cartCount} item{cartCount > 1 ? 's' : ''} in cart</Text>
            <Text style={styles.cartSub}>Total ${cartTotal.toFixed(2)}</Text>
          </View>
          <Button label="Checkout" onPress={() => { /* Placeholder */ }} variant="secondary" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  listContent: {
    padding: 16,
    paddingBottom: 100
  },
  cartBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.card
  },
  cartTitle: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '700'
  },
  cartSub: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 2
  }
});
