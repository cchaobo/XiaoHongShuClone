import React, { useState }  from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress }) => {
  const [isLiked, setIsLiked] = useState(notification.isLiked || false);

  const getNotificationText = () => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'reply':
        return 'replied under your post';
      default:
        return 'interacted with your post';
    }
  };

  const getImageSource = (source: string | number): ImageSourcePropType => {
    return typeof source === 'string' ? { uri: source } : source;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={getImageSource(notification.users ? notification.users[0].avatar : notification.user.avatar)} 
        style={styles.avatar} 
      />
      <View style={styles.content}>
        <Text style={styles.text}>
        <Text style={styles.username}>
          {notification.users 
            ? notification.users.slice(0, 3).map(user => user.name).join(', ') + 
              (notification.users.length > 3 ? ` and ${notification.users.length - 3} others` : '')
            : notification.user?.name || 'Unknown User'}
        </Text>
          {' '}{getNotificationText()}
        </Text>
        {notification.commentContent && (
          <Text style={styles.commentPreview} numberOfLines={2}>
            {truncateContent(notification.commentContent, 40)}
          </Text>
        )}
        <Text style={styles.time}>{new Date(notification.createdAt).toLocaleString()}</Text>
        {(notification.type === 'comment' || notification.type === 'reply') && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Icon name={isLiked ? "heart" : "heart-outline"} color={isLiked ? 'tomato' : 'gray'} size={20} />
              <Text style={[styles.actionText, isLiked && styles.likedText]}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="chatbubble-outline" color="gray" size={20} />
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {notification.article && notification.article.images && notification.article.images.length > 0 && (
        <Image 
          source={getImageSource(notification.article.images[0])} 
          style={styles.articleImage} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(238, 238, 238, 1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  commentPreview: {
    fontSize: 14,
    color: 'rgba(102, 102, 102, 1)',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: 'rgba(136, 136, 136, 1)',
    marginBottom: 5,
  },
  articleImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
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
  },
  likedText: {
    color: 'tomato',
  },
});

export default NotificationItem;