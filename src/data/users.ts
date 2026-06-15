import { User } from '@/types';

export const users: User[] = [
  {
    id: 'artisan-1',
    name: '陈竹翁',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenzhu',
    role: 'artisan',
    bio: '浙江东阳竹编非遗传承人，从艺四十余年，作品多次获国家级奖项。',
    tutorialCount: 12,
  },
  {
    id: 'artisan-2',
    name: '李漆匠',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liqi',
    role: 'artisan',
    bio: '福州脱胎漆器技艺传承人，专注漆器创作三十年，擅长晕金技艺。',
    tutorialCount: 8,
  },
  {
    id: 'artisan-3',
    name: '王剪花',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangjian',
    role: 'artisan',
    bio: '陕西剪纸艺人，家族五代传承剪纸技艺，作品风格粗犷豪放。',
    tutorialCount: 15,
  },
  {
    id: 'artisan-4',
    name: '张染娘',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangran',
    role: 'artisan',
    bio: '云南大理白族扎染技艺传承人，坚持纯天然植物染料染色。',
    tutorialCount: 10,
  },
  {
    id: 'institution-1',
    name: '中国非遗保护中心',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=feiyi',
    role: 'institution',
    bio: '国家级非物质文化遗产保护机构，致力于传统工艺的传承与推广。',
  },
  {
    id: 'institution-2',
    name: '江南工艺美术馆',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=jiangnan',
    role: 'institution',
    bio: '专注江南地区传统工艺的研究、展示与教育的专业机构。',
  },
  {
    id: 'learner-1',
    name: '手作爱好者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=learner1',
    role: 'learner',
    bio: '热爱传统手工艺，业余时间喜欢动手制作各种手工艺品。',
  },
];

export const getArtisans = (): User[] => {
  return users.filter(u => u.role === 'artisan');
};

export const getInstitutions = (): User[] => {
  return users.filter(u => u.role === 'institution');
};

export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};
