export interface User {
    id: number;
    name: string;
    avatar: string | number;
  }
  
  export interface Article {
    id: number;
    title: string;
    content: string;
    images: string[];
    author: User;
    likes: number;
    tags: string[];
    comments: Comment[];
    publishedDate: string;
  }
  
  export interface Comment {
    id: number;
    user: User;
    content: string;
    likes: number;
    createdAt: string;
    replies: Comment[];
    isLiked?: boolean;
  }
  
  export interface Notification {
    id: number| string;
    type: 'like' | 'comment' | 'reply';
    user: User;
    article: Article;
    createdAt: string;
    commentId?: number;
    commentContent?: string;
    isLiked?: boolean;
    users?: User[];//new field for grouped like
  }

  export type RootStackParamList = {
    HomeScreen: undefined;
    NotificationsScreen: undefined;
    ArticleDetail: { article: Article; scrollToCommentId?: number };
    Publish: undefined;
    Profile: undefined;
  };