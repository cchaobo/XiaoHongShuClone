import { User, Article, Comment, Notification } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: 'A C1', avatar: require('../../assets/images/avatar1.jpg') },
  { id: 2, name: 'B C2', avatar: require('../../assets/images/avatar2.jpg') },
  { id: 3, name: 'C C3', avatar: require('../../assets/images/avatar3.jpg') },
  { id: 4, name: 'D C4', avatar: require('../../assets/images/avatar4.jpg') },
];

export const mockComments: Comment[] = [
  {
    id: 1,
    user: mockUsers[1],
    content: 'Great article! Very informative. I like your article. Tells a lot of useful things.',
    likes: 5,
    createdAt: '2024-08-01T10:00:00Z',
    isLiked: true,
    replies: [
      {
        id: 2,
        user: mockUsers[2],
        content: 'I agree! Thanks for sharing.',
        likes: 2,
        createdAt: '2024-08-01T11:00:00Z',
        isLiked: false,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    user: mockUsers[0],
    content: 'Interesting place. Very fun.',
    likes: 3,
    createdAt: '2024-08-01T12:00:00Z',
    isLiked: false,
    replies: [],
  },
];

export const mockComments2: Comment[] = [
  {
  id: 4,
  user: mockUsers[3],
  content: 'This is a fascinating topic. I\'d love to see more articles like this!',
  likes: 7,
  createdAt: '2024-08-02T09:00:00Z',
  isLiked: false,
  replies: [],
  },
];

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'My travel experience at Place X',
    content: 'traveling...My travel experience at Place X. traveling...My travel experience at Place X. traveling...My travel experience at Place Xtraveling...\n\n My travel experience at Place X',
    images: [
      require('../../assets/images/image1.jpg'),
      require('../../assets/images/image2.jpg')
    ],
    author: mockUsers[0],
    likes: 150,
    tags: ['Travel'],
    comments: mockComments,
    publishedDate: '2024-08-01T09:00:00Z',
  },
  {
    id: 2,
    title: 'Food review',
    content: 'I like this shop! Great food!',
    images: [
      require('../../assets/images/image3.jpg'),
      require('../../assets/images/image4.jpg')
    ],
    author: mockUsers[0],
    likes: 98,
    tags: ['Food'],
    comments: mockComments2,
    publishedDate: '2024-08-01T09:00:00Z',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'like',
    user: mockUsers[1],
    article: mockArticles[0],
    createdAt: '2024-08-01T13:00:00Z',
  },
  {
    id: 2,
    type: 'comment',
    user: mockUsers[1],
    article: mockArticles[0],
    createdAt: '2024-08-01T14:00:00Z',
    commentId: 1,
    commentContent: 'Great article! Very informative. I like your article. Tells a lot of useful things.',
    isLiked: true,
  },
  {
    id: 3,
    type: 'reply',
    user: mockUsers[2],
    article: mockArticles[0],
    createdAt: '2024-08-01T15:00:00Z',
    commentId: 2,
    commentContent: 'I agree! Thanks for sharing.',
    isLiked: false,
  },
  {
    id: 4,
    type: 'comment',
    user: mockUsers[3],
    article: mockArticles[1],
    createdAt: '2024-08-02T09:00:00Z',
    commentId: 4,
    commentContent: 'This is a fascinating topic. I\'d love to see more articles like this!',
    isLiked: false,
  },
  {
    id: 5,
    type: 'like',
    user: mockUsers[2],
    article: mockArticles[0],
    createdAt: '2024-08-01T13:00:00Z',
  },
  {
    id: 6,
    type: 'like',
    user: mockUsers[3],
    article: mockArticles[0],
    createdAt: '2024-08-01T13:00:00Z',
  },
];