import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getImageSource = (source: string | number): ImageSourcePropType => {
    return typeof source === 'string' ? { uri: source } : source;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={getImageSource(article.images[0])} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <View style={styles.authorContainer}>
          <Image source={getImageSource(article.author.avatar)} style={styles.avatar} />
          <Text style={styles.authorName}>{article.author.name}</Text>
        </View>
        <Text style={styles.publishedDate}>{formatDate(article.publishedDate)}</Text>
        <Text style={styles.likes}>{article.likes} likes</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(238, 238, 238, 1)',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  authorName: {
    fontSize: 14,
  },
  likes: {
    fontSize: 14,
    color:  'rgba(136, 136, 136, 1)',
    marginTop: 5,
  },
  publishedDate: {
    fontSize: 12,
    color: 'rgba(136, 136, 136, 1)',
    marginTop: 5,
  },
});

export default ArticleCard;