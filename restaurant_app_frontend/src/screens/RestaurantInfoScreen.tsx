import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { fetchRestaurantInfo, RestaurantInfo } from '../services/restaurantService';
import { theme } from '../theme/theme';

export default function RestaurantInfoScreen() {
  const { state, setRestaurantInfo } = useApp();
  const [info, setInfo] = useState<RestaurantInfo | null>(state.restaurantInfo);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const data = await fetchRestaurantInfo();
      if (!mounted) return;
      setInfo(data);
      setRestaurantInfo(data);
    }
    if (!state.restaurantInfo) load();
    return () => { mounted = false; };
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Restaurant" subtitle="Discover who we are" />
      <ScrollView contentContainerStyle={styles.content}>
        {info?.bannerImage && (
          <Image source={{ uri: info.bannerImage }} style={styles.banner} />
        )}
        <Card style={{ marginTop: 16 }}>
          <Text style={styles.name}>{info?.name ?? '—'}</Text>
          <Text style={styles.desc}>{info?.description ?? ''}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{info?.address ?? ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{info?.phone ?? ''}</Text>
          </View>
        </Card>

        {!!info?.hours && (
          <Card style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>Hours</Text>
            {Object.entries(info.hours).map(([day, hours]) => (
              <View style={styles.hoursRow} key={day}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.hours}>{hours}</Text>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 40 },
  banner: { width: '100%', height: 180, borderRadius: 14 },
  name: { fontSize: 18, fontWeight: '800', color: theme.colors.text, marginBottom: 8 },
  desc: { color: theme.colors.muted, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  label: { color: theme.colors.muted },
  value: { color: theme.colors.text, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.border },
  day: { color: theme.colors.text },
  hours: { color: theme.colors.muted }
});
