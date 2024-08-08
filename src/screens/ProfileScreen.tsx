import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageSourcePropType } from 'react-native';
import { mockUsers } from '../data/mockData';

const ProfileScreen: React.FC = () => {
    //mock user 1
  const user = mockUsers[0];

const getImageSource = (source: string | number): ImageSourcePropType => {
    return typeof source === 'string' ? { uri: source } : source;
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Image source={getImageSource(user.avatar)} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>User Information</Text>
        <Text style={styles.infoText}>ID: {user.id}</Text>
        <Text style={styles.infoText}>Name: {user.name}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  'rgba(255, 255, 255, 1)',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 1)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfileScreen;