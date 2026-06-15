import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { difficultyLabels } from '@/types';

export default function Topics() {
  const { getTopics } = useAppStore();
  const topics = getTopics();

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bamboo-50 rounded-full text-bamboo-600 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>非遗机构出品</span>
          </div>
          <h1 className="font-song text-3xl md:text-4xl font-bold text-lacquer-700 mb-3">
            专题学习路径
          </h1>
          <p className="text-lacquer-400 max-w-2xl">
            由非遗机构精心策划的系统化学习路径，从入门到精通，循序渐进掌握传统手工艺
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={topic.cover}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lacquer-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={topic.orgAvatar}
                      alt={topic.orgName}
                      className="w-6 h-6 rounded-full border border-white/30"
                    />
                    <span className="text-white/80 text-sm">{topic.orgName}</span>
                  </div>
                  <h3 className="font-song text-xl font-bold text-white line-clamp-1">
                    {topic.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-lacquer-500 line-clamp-2 mb-4">{topic.description}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-lacquer-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{topic.tutorialIds.length} 个教程</span>
                  </div>
                  <div className="flex items-center gap-1 text-lacquer-400">
                    <Clock className="w-4 h-4" />
                    <span>{difficultyLabels[topic.level]}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-primary-500 font-medium text-sm">
                    开始学习
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-bamboo-50 rounded-2xl p-8 md:p-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-song text-2xl font-bold text-lacquer-700 mb-3">
              你是非遗机构吗？
            </h3>
            <p className="text-lacquer-500 mb-6">
              加入我们，共同整理和推广传统手工艺学习路径，让更多人感受非遗之美
            </p>
            <button className="px-6 py-3 bg-bamboo-500 text-white rounded-full font-medium hover:bg-bamboo-600 transition-colors shadow-md">
              申请机构认证
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
