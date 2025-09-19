import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { submitOrder } from '../services/restaurantService';
import { theme } from '../theme/theme';

export default function OrdersScreen() {
  const { state, clearCart, addOrder } = useApp();

  const total = useMemo(
    () => Object.values(state.cart).reduce((sum, c) => sum + c.quantity * c.item.price, 0),
    [state.cart]
  );

  const canPlaceOrder = Object.keys(state.cart).length > 0;

  async function placeOrder() {
    const items = Object.values(state.cart).map(ci => ({ id: ci.item.id, quantity: ci.quantity }));
    const res = await submitOrder(items);
    addOrder({ id: res.orderId, items: Object.values(state.cart), total, status: 'confirmed' });
    clearCart();
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Orders" subtitle="Track your recent orders" />
      <View style={styles.content}>
        <Card style={{ marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>Current Cart</Text>
          {canPlaceOrder ? (
            <>
              <Text style={styles.cartLine}>{Object.values(state.cart).length} items</Text>
              <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
              <Button label="Place Order" onPress={placeOrder} />
            </>
          ) : (
            <Text style={styles.empty}>Your cart is empty.</Text>
          )}
        </Card>

        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Recent Orders</Text>
        <FlatList
          data={state.orders}
          keyExtractor={(o) => o.id}
          ListEmptyComponent={<Text style={styles.empty}>No orders yet.</Text>}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 12 }}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.orderMeta}>Items: {item.items.reduce((s, it) => s + it.quantity, 0)}</Text>
              <Text style={styles.orderMeta}>Total: ${item.total.toFixed(2)}</Text>
              <Text style={[styles.status, item.status === 'confirmed' ? styles.statusConfirmed : undefined]}>
                {item.status.toUpperCase()}
              </Text>
            </Card>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 6 },
  cartLine: { color: theme.colors.muted, marginBottom: 8 },
  total: { fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  empty: { color: theme.colors.muted },
  orderId: { fontWeight: '700', color: theme.colors.text },
  orderMeta: { color: theme.colors.muted, marginTop: 2 },
  status: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.muted
  },
  statusConfirmed: {
    color: theme.colors.secondary
  }
});
