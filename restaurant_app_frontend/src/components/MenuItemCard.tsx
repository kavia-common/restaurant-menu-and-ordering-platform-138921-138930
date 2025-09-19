import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import Button from './Button';
import { theme } from '../theme/theme';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  spicy?: boolean;
  vegetarian?: boolean;
};

type Props = {
  item: MenuItem;
  quantity?: number;
  onAdd: (item: MenuItem) => void;
  onIncrement: (item: MenuItem) => void;
  onDecrement: (item: MenuItem) => void;
};

export default function MenuItemCard({ item, quantity = 0, onAdd, onIncrement, onDecrement }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
          <View style={styles.tagsRow}>
            {item.spicy && <Text style={[styles.tag, styles.spicy]}>Spicy</Text>}
            {item.vegetarian && <Text style={[styles.tag, styles.veg]}>Veg</Text>}
          </View>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {quantity === 0 ? (
            <Button label="Add" onPress={() => onAdd(item)} />
          ) : (
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => onDecrement(item)} style={styles.qtyBtn}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => onIncrement(item)} style={styles.qtyBtn}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: item.imageUrl || 'https://picsum.photos/seed/menu/160/120' }}
            style={styles.image}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    gap: 12
  },
  info: {
    flex: 1
  },
  imageWrap: {
    width: 120,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text
  },
  desc: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.muted
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6
  },
  tag: {
    fontSize: 11,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    overflow: 'hidden',
    color: '#0b1b31',
    backgroundColor: '#DBEAFE'
  },
  spicy: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B'
  },
  veg: {
    backgroundColor: '#DCFCE7',
    color: '#065F46'
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary
  },
  qtyRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyBtnText: {
    fontSize: 22,
    color: theme.colors.text
  },
  qtyText: {
    minWidth: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: theme.colors.text
  }
});
