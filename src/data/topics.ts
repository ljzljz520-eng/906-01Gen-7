import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 'top-001',
    title: '竹编入门到精通',
    description: '从基础平编到高级六角编，系统化学习竹编技艺',
    cover: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    orgName: '中国非遗保护中心',
    orgAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=feiyi',
    tutorialIds: ['tut-001', 'tut-005'],
    intro: '竹编是中国传统手工艺中的瑰宝，有着数千年的历史。本专题从最基础的材料认识和工具使用开始，循序渐进地带你掌握竹编的核心技法。无论你是零基础的手工艺爱好者，还是想要系统提升的从业者，都能在本专题中找到适合自己的内容。',
    level: 'beginner',
    createdAt: '2024-01-01',
  },
  {
    id: 'top-002',
    title: '剪纸艺术入门',
    description: '零基础学习剪纸，剪出生活中的美好',
    cover: 'https://images.unsplash.com/photo-1611348586804-61bf6c0c0892?w=800&q=80',
    orgName: '江南工艺美术馆',
    orgAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=jiangnan',
    tutorialIds: ['tut-003', 'tut-006'],
    intro: '剪纸是中国最古老的民间艺术之一，一张纸、一把剪刀，就能创造出千变万化的艺术世界。本专题由陕西剪纸非遗传承人王剪花老师主讲，从基础技法到进阶创作，带你领略剪纸的独特魅力。',
    level: 'beginner',
    createdAt: '2024-01-15',
  },
  {
    id: 'top-003',
    title: '传统漆器工艺',
    description: '探索千年漆艺之美，从素髹到螺钿',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    orgName: '中国非遗保护中心',
    orgAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=feiyi',
    tutorialIds: ['tut-002', 'tut-007'],
    intro: '漆器是中国古代在化学工艺及工艺美术方面的重要发明。从新石器时代起，我们的祖先就认识了漆的性能并用以制器。本专题将带你从最基础的素髹工艺入手，逐步领略漆器艺术的独特魅力。',
    level: 'intermediate',
    createdAt: '2024-02-01',
  },
  {
    id: 'top-004',
    title: '草木染入门',
    description: '用大自然的颜色，染出生活的诗意',
    cover: 'https://images.unsplash.com/photo-1606788075863-3a7eea193739?w=800&q=80',
    orgName: '大理白族扎染合作社',
    orgAvatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=coop',
    tutorialIds: ['tut-004', 'tut-008'],
    intro: '草木染，即植物染色，是一种使用天然植物染料进行染色的传统工艺。它不仅环保健康，更有着独特的自然美感。本专题以白族扎染为核心，带你走进草木染的世界，感受自然色彩的魅力。',
    level: 'beginner',
    createdAt: '2024-02-20',
  },
];

export const getTopics = (): Topic[] => topics;

export const getTopicById = (id: string): Topic | undefined => {
  return topics.find(t => t.id === id);
};
