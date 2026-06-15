import { Work } from '@/types';

export const works: Work[] = [
  {
    id: 'w1',
    userId: 'learner-1',
    tutorialId: 'tut-001',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    description: '第一次做竹编，虽然不太规整，但很有成就感！',
    createdAt: '2024-03-10',
    userName: '手作爱好者',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=learner1',
  },
  {
    id: 'w2',
    userId: 'learner-2',
    tutorialId: 'tut-001',
    image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&q=80',
    description: '跟着陈老师的教程做的，步骤很详细，成品还不错~',
    createdAt: '2024-03-08',
    userName: '竹韵',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhuyun',
  },
  {
    id: 'w3',
    userId: 'learner-3',
    tutorialId: 'tut-003',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c0c0892?w=400&q=80',
    description: '过年剪的窗花，贴在窗户上超有年味！',
    createdAt: '2024-02-15',
    userName: '红红火火',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=honghong',
  },
  {
    id: 'w4',
    userId: 'learner-4',
    tutorialId: 'tut-004',
    image: 'https://images.unsplash.com/photo-1606788075863-3a7eea193739?w=400&q=80',
    description: '第一次尝试扎染，颜色出来好惊喜，每条纹路都独一无二！',
    createdAt: '2024-03-12',
    userName: '蓝染时光',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lanran',
  },
  {
    id: 'w5',
    userId: 'learner-5',
    tutorialId: 'tut-004',
    image: 'https://images.unsplash.com/photo-1606788075863-3a7eea193739?w=400&q=80',
    description: '用板蓝根染的，真的很神奇，从绿色变成蓝色的过程好治愈',
    createdAt: '2024-03-05',
    userName: '自然手作',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ziran',
  },
  {
    id: 'w6',
    userId: 'learner-6',
    tutorialId: 'tut-002',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    description: '漆艺真的需要耐心，前前后后做了一个月，但是成品太值了！',
    createdAt: '2024-03-18',
    userName: '漆彩人生',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=qicai',
  },
];

export const getWorks = (): Work[] => works;

export const getWorksByTutorialId = (tutorialId: string): Work[] => {
  return works.filter(w => w.tutorialId === tutorialId);
};

export const getWorksByUserId = (userId: string): Work[] => {
  return works.filter(w => w.userId === userId);
};
