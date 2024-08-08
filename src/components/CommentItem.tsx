import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Comment } from '../types';

interface CommentItemProps {
  comment: Comment;
  onLike: () => void;
  onReply?: (commentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(comment.id);
    }
  };
  
  const getImageSource = (source: string | number): ImageSourcePropType => {
    return typeof source === 'string' ? { uri: source } : source;
  };

  return (
    <View style={styles.container}>
      <Image source={getImageSource(comment.user.avatar)} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.username}>{comment.user.name}</Text>
        <Text style={styles.commentText}>{comment.content}</Text>
        <View style={styles.metadata}>
          <Text style={styles.time}>{new Date(comment.createdAt).toLocaleString()}</Text>
          <Text style={styles.likes}>{comment.likes} likes</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Icon name={isLiked ? "heart" : "heart-outline"} color={isLiked ? 'tomato' : 'gray'} size={20} />
            <Text style={[styles.actionText, isLiked && styles.likedText]}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleReply}>
            <Icon name="chatbubble-outline" color="gray" size={20} />
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 5,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: 'rgba(136, 136, 136, 1)',
  },
  likes: {
    fontSize: 12,
    color: 'rgba(136, 136, 136, 1)',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 14,
  },
  likedText: {
    color: 'tomato',
  },
});
export default CommentItem;