import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Animated, Dimensions , LayoutChangeEvent, ImageSourcePropType } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageSlider from '../components/ImageSlider';
import CommentItem from '../components/CommentItem';
import { Article, Comment, RootStackParamList } from '../types';

type ArticleDetailScreenRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;
type ArticleDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleDetail'>;

type Props = {
  route: ArticleDetailScreenRouteProp;
  navigation: ArticleDetailScreenNavigationProp;
};

const ArticleDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { article, scrollToCommentId } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [highlightedCommentId, setHighlightedCommentId] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [headerHeight, setHeaderHeight] = useState(0);
  const [commentHeight, setCommentHeight] = useState(0);

  useEffect(() => {
    if (article && article.comments) {
      setComments(article.comments);
    }
  }, [article]);

  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const onCommentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCommentHeight(height);
  }, []);

  useEffect(() => {
    if (scrollToCommentId && comments.length > 0 && headerHeight > 0 && commentHeight > 0) {
      // console.log('scroll to comment:', scrollToCommentId);
      setTimeout(() => {
        scrollToComment(scrollToCommentId);
      }, 500);
    }
  }, [scrollToCommentId, comments, headerHeight, commentHeight]);

  const findCommentIndex = (commentsArray: Comment[], id: number, currentIndex = 0): number => {
    for (let i = 0; i < commentsArray.length; i++) {
      if (commentsArray[i].id === id) {
        return currentIndex + i;
      }
      if (commentsArray[i].replies && commentsArray[i].replies.length > 0) {
        const nestedIndex = findCommentIndex(commentsArray[i].replies, id, currentIndex + i + 1);
        if (nestedIndex !== -1) {
          return nestedIndex;
        }
      }
    }
    return -1;
  };

  const scrollToComment = (commentId: number) => {
    // console.log('try scroll to comment:', commentId);
    const commentIndex = findCommentIndex(comments, commentId);
    // console.log('comment index:', commentIndex);
    if (commentIndex !== -1) {
      const screenHeight = Dimensions.get('window').height;
      const yOffset = Math.max(0, (commentIndex * commentHeight) + headerHeight - (screenHeight / 2) + (commentHeight / 2));
      // console.log('scrolling to y offset:', yOffset);
      scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
      highlightComment(commentId);
    }
  };

  const highlightComment = (commentId: number) => {
    setHighlightedCommentId(commentId);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => setHighlightedCommentId(null));
  };

  const handleLike = (commentId: number) => {
    // console.log('Liked comment:', commentId);
  };

  const handleReply = (commentId: number) => {
    // console.log('Reply to comment:', commentId);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Animated.View
      key={comment.id}
      style={[
        styles.commentContainer,
        isReply && styles.replyContainer,
        highlightedCommentId === comment.id && {
          backgroundColor: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#ffffd0'],
          }),
        },
      ]}
    >
      <CommentItem 
        comment={comment} 
        onLike={() => handleLike(comment.id)} 
        onReply={() => handleReply(comment.id)}
      />
      {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
    </Animated.View>
  );

  if (!article) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading article...</Text>
      </View>
    );
  }

  const getImageSource = (source: string | number): ImageSourcePropType => {
    return typeof source === 'string' ? { uri: source } : source;
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View onLayout={onHeaderLayout}>
        <ImageSlider images={article.images} />
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.authorContainer}>
            <Image source={getImageSource(article.author.avatar)} style={styles.avatar} />
            <Text style={styles.author}>{article.author.name}</Text>
          </View>
          <Text style={styles.publishedDate}>{formatDate(article.publishedDate)}</Text>
          <Text style={styles.text}>{article.content}</Text>
          <Text style={styles.likes}>{article.likes} likes</Text>
        </View>
      </View>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comments</Text>
        {comments.map((comment, index) => (
          <View key={comment.id} onLayout={index === 0 ? onCommentLayout : undefined}>
            {renderComment(comment)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  author: {
    fontSize: 16,
    color: 'rgba(102, 102, 102, 1)',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  likes: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentsSection: {
    padding: 15,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 15,
  },
  replyContainer: {
    marginLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(204, 204, 204, 1)',
    paddingLeft: 10,
  },
  publishedDate: {
    fontSize: 14,
    color: 'rgba(136, 136, 136, 1)',
    marginBottom: 10,
  },
});

export default ArticleDetailScreen;