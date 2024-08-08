import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface TagFilterProps {
  onSelectTag: (tag: string) => void;
}

const tags = ['All', 'Travel', 'Food', 'Fashion', 'Technology', 'Sports'];

const TagFilter: React.FC<TagFilterProps> = ({ onSelectTag }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {tags.map((tag) => (
          <TouchableOpacity key={tag} onPress={() => onSelectTag(tag)} style={styles.tagButton}>
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50, 
    backgroundColor: 'rgba(240, 240, 240, 1)',
  },
  scrollContent: {
    alignItems: 'center', 
    paddingHorizontal: 10,
  },
  tagButton: {
    backgroundColor: 'rgba(224, 224, 224, 1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tagText: {
    fontSize: 14,
  },
});

export default TagFilter;