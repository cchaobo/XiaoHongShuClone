import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import { Article, RootStackParamList } from '../types';
import { mockArticles } from '../data/mockData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    setArticles(mockArticles);
    // console.log('articles:', mockArticles);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    //some search logic
    const filteredArticles = mockArticles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    //some tag logic
    if (tag === 'All' || tag === '') {
      setArticles(mockArticles);
    } else {
      const filteredArticles = mockArticles.filter(article => 
        article.tags.includes(tag)
      );
      setArticles(filteredArticles);
    }
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <TagFilter onSelectTag={handleTagFilter} />
      {articles.length > 0 ? (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <ArticleCard article={item} onPress={() => handleArticlePress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noArticlesText}>No articles found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  'rgba(255, 255, 255, 1)',
  },
  noArticlesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;