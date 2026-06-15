import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, ChevronRight, Check, Play } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { difficultyLabels } from '@/types';

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const { getTopicById, getTutorialById } = useAppStore();

  const topic = id ? getTopicById(id) : undefined;

  const tutorials = topic
    ? topic.tutorialIds
        .map((tid) => getTutorialById(tid))
        .filter(Boolean)
    : [];

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lacquer-400 mb-4">专题不存在</p>
          <Link to="/topics" className="text-primary-500 hover:underline">
            返回专题列表
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} 分钟`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} 小时 ${mins} 分钟` : `${hours} 小时`;
  };

  const totalDuration = tutorials.reduce((sum, t) => sum + (t?.duration || 0), 0);

  return (
    <div className="min-h-screen">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={topic.cover}
          alt={topic.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lacquer-900/90 via-lacquer-900/50 to-transparent" />

        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回专题</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={topic.orgAvatar}
                  alt={topic.orgName}
                  className="w-10 h-10 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="text-white/80 text-sm">{topic.orgName}</p>
                  <p className="text-white/60 text-xs">非遗机构</p>
                </div>
              </div>
              <h1 className="font-song text-2xl md:text-4xl font-bold text-white mb-3">
                {topic.title}
              </h1>
              <p className="text-white/80 line-clamp-2">{topic.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h2 className="font-song text-xl font-semibold text-lacquer-700 mb-4">
                专题介绍
              </h2>
              <p className="text-lacquer-500 leading-relaxed">{topic.intro}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h2 className="font-song text-xl font-semibold text-lacquer-700 mb-6">
                学习路径
              </h2>

              <div className="space-y-4">
                {tutorials.map((tutorial, index) => (
                  tutorial && (
                    <Link
                      key={tutorial.id}
                      to={`/tutorials/${tutorial.id}`}
                      className="group relative pl-16 pb-8 last:pb-0 block"
                    >
                      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-rice-200 last:hidden" />

                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-bamboo-500 text-white flex items-center justify-center font-song font-bold z-10 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>

                      <div className="bg-rice-50 rounded-xl p-5 group-hover:bg-bamboo-50 transition-colors border border-rice-200 group-hover:border-bamboo-200">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={tutorial.cover}
                              alt={tutorial.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 bg-bamboo-100 text-bamboo-700 rounded-full">
                                {difficultyLabels[tutorial.difficulty]}
                              </span>
                              <span className="text-xs text-lacquer-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDuration(tutorial.duration)}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lacquer-700 mb-1 line-clamp-1 group-hover:text-bamboo-600 transition-colors">
                              {tutorial.title}
                            </h3>
                            <p className="text-sm text-lacquer-400 line-clamp-2">
                              {tutorial.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lacquer-300 group-hover:bg-bamboo-500 group-hover:text-white transition-all">
                              <Play className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-bamboo-500" />
                <h3 className="font-song font-semibold text-lacquer-700">专题信息</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-rice-100">
                  <span className="text-lacquer-400">难度级别</span>
                  <span className="font-medium text-lacquer-600">
                    {difficultyLabels[topic.level]}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-rice-100">
                  <span className="text-lacquer-400">教程数量</span>
                  <span className="font-medium text-lacquer-600">
                    {tutorials.length} 个
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-rice-100">
                  <span className="text-lacquer-400">总时长</span>
                  <span className="font-medium text-lacquer-600">
                    {formatDuration(totalDuration)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lacquer-400">出品机构</span>
                  <span className="font-medium text-lacquer-600">{topic.orgName}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-bamboo-500 text-white rounded-xl font-semibold hover:bg-bamboo-600 transition-colors shadow-md">
                开始学习
              </button>

              <p className="text-center text-xs text-lacquer-300 mt-4">
                收藏专题，随时学习
              </p>
            </div>

            <div className="bg-rice-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={topic.orgAvatar}
                  alt={topic.orgName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-lacquer-700">{topic.orgName}</h4>
                  <p className="text-xs text-lacquer-400">非遗机构认证</p>
                </div>
              </div>
              <p className="text-sm text-lacquer-500 line-clamp-3">
                致力于传统工艺的保护、研究与推广，让非遗技艺走进现代生活。
              </p>
              <button className="w-full mt-4 py-2 border border-lacquer-200 text-lacquer-600 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                查看更多专题
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
