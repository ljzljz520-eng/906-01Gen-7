import { useState } from 'react';
import { Heart, Image, Settings, BookOpen } from 'lucide-react';
import TutorialCard from '@/components/TutorialCard';
import { useAppStore } from '@/store/useAppStore';

export default function Profile() {
  const { currentUser, getCollectedTutorials, getWorksByUser, tutorials } = useAppStore();
  const [activeTab, setActiveTab] = useState<'collections' | 'works'>('collections');

  const collectedTutorials = currentUser ? getCollectedTutorials(currentUser.id) : [];
  const myWorks = currentUser ? getWorksByUser(currentUser.id) : [];

  const publishedTutorials = currentUser
    ? tutorials.filter((t) => t.authorId === currentUser.id)
    : [];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lacquer-400 mb-4">请先登录</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'collections', name: '我的收藏', icon: Heart },
    { id: 'works', name: '我的作品', icon: Image },
  ] as const;

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full border-4 border-rice-100 shadow-md"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                <h1 className="font-song text-2xl font-bold text-lacquer-700">
                  {currentUser.name}
                </h1>
                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                  {currentUser.role === 'artisan'
                    ? '匠人'
                    : currentUser.role === 'institution'
                    ? '非遗机构'
                    : '学习者'}
                </span>
              </div>
              <p className="text-lacquer-400 text-sm mb-4 max-w-md">
                {currentUser.bio}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-lacquer-700 text-lg">
                    {collectedTutorials.length}
                  </p>
                  <p className="text-lacquer-400">收藏</p>
                </div>
                <div className="w-px h-8 bg-rice-200" />
                <div className="text-center">
                  <p className="font-semibold text-lacquer-700 text-lg">
                    {myWorks.length}
                  </p>
                  <p className="text-lacquer-400">作品</p>
                </div>
                {currentUser.role === 'artisan' && (
                  <>
                    <div className="w-px h-8 bg-rice-200" />
                    <div className="text-center">
                      <p className="font-semibold text-lacquer-700 text-lg">
                        {publishedTutorials.length}
                      </p>
                      <p className="text-lacquer-400">教程</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <button className="p-3 rounded-xl bg-rice-100 text-lacquer-500 hover:bg-rice-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="flex border-b border-rice-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary-500'
                    : 'text-lacquer-400 hover:text-lacquer-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'collections' && (
              <div className="animate-fade-in">
                {collectedTutorials.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collectedTutorials.map((tutorial) => (
                      <TutorialCard key={tutorial.id} tutorial={tutorial} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rice-100 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-lacquer-300" />
                    </div>
                    <h3 className="font-song text-xl font-semibold text-lacquer-600 mb-2">
                      还没有收藏
                    </h3>
                    <p className="text-lacquer-400 mb-6">去发现喜欢的教程吧</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'works' && (
              <div className="animate-fade-in">
                {myWorks.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {myWorks.map((work) => (
                      <div
                        key={work.id}
                        className="group relative rounded-xl overflow-hidden aspect-square"
                      >
                        <img
                          src={work.image}
                          alt={work.description}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-white text-sm line-clamp-2">{work.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rice-100 flex items-center justify-center">
                      <Image className="w-8 h-8 text-lacquer-300" />
                    </div>
                    <h3 className="font-song text-xl font-semibold text-lacquer-600 mb-2">
                      还没有上传作品
                    </h3>
                    <p className="text-lacquer-400 mb-6">学习教程后上传你的练习作品吧</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {currentUser.role === 'artisan' && publishedTutorials.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-bamboo-500" />
              <h2 className="font-song text-xl font-semibold text-lacquer-700">
                我发布的教程
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {publishedTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
