import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Clock, User, Share2, ArrowLeft, Plus, Image as ImageIcon } from 'lucide-react';
import StepItem from '@/components/StepItem';
import MaterialItem from '@/components/MaterialItem';
import SafetyAlert from '@/components/SafetyAlert';
import CopyrightNotice from '@/components/CopyrightNotice';
import { useAppStore } from '@/store/useAppStore';
import { categoryLabels, difficultyLabels, categoryColors, categoryBgColors } from '@/types';

export default function TutorialDetail() {
  const { id } = useParams<{ id: string }>();
  const { getTutorialById, getUserById, getWorksByTutorial, currentUser, isCollected, toggleCollection, addWork } = useAppStore();

  const tutorial = id ? getTutorialById(id) : undefined;
  const author = tutorial ? getUserById(tutorial.authorId) : undefined;
  const works = tutorial ? getWorksByTutorial(tutorial.id) : [];

  const [isAnimating, setIsAnimating] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [workImage, setWorkImage] = useState('');
  const [workDescription, setWorkDescription] = useState('');

  const collected = currentUser && tutorial ? isCollected(tutorial.id, currentUser.id) : false;

  const handleCollect = () => {
    if (!currentUser || !tutorial) return;
    setIsAnimating(true);
    toggleCollection(tutorial.id, currentUser.id);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWorkImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitWork = () => {
    if (!currentUser || !tutorial || !workImage) return;
    addWork({
      userId: currentUser.id,
      tutorialId: tutorial.id,
      image: workImage,
      description: workDescription,
    });
    setShowUploadModal(false);
    setWorkImage('');
    setWorkDescription('');
  };

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lacquer-400 mb-4">教程不存在</p>
          <Link to="/tutorials" className="text-primary-500 hover:underline">
            返回教程列表
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

  return (
    <div className="min-h-screen">
      <div className="relative h-64 md:h-96 lg:h-[500px]">
        <img
          src={tutorial.cover}
          alt={tutorial.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lacquer-900/90 via-lacquer-900/40 to-transparent" />
        
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回列表</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${categoryColors[tutorial.category]}`}>
                  {categoryLabels[tutorial.category]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryBgColors[tutorial.category]} ${categoryColors[tutorial.category]} bg-opacity-20`}>
                  {difficultyLabels[tutorial.difficulty]}
                </span>
              </div>
              <h1 className="font-song text-2xl md:text-4xl font-bold text-white mb-4">
                {tutorial.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-sm">
                {author && (
                  <div className="flex items-center gap-2">
                    <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full border border-white/30" />
                    <span>{author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(tutorial.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{tutorial.collectCount} 人收藏</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h2 className="font-song text-xl font-semibold text-lacquer-700 mb-4">
                教程简介
              </h2>
              <p className="text-lacquer-500 leading-relaxed">{tutorial.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h2 className="font-song text-xl font-semibold text-lacquer-700 mb-6">
                材料清单
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tutorial.materials.map((material) => (
                  <MaterialItem key={material.id} material={material} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <h2 className="font-song text-xl font-semibold text-lacquer-700 mb-6">
                制作步骤
              </h2>
              <div>
                {tutorial.steps
                  .sort((a, b) => a.order - b.order)
                  .map((step, index) => (
                    <StepItem key={step.id} step={step} index={index} />
                  ))}
              </div>
            </div>

            <SafetyAlert note={tutorial.safetyNote} />

            <CopyrightNotice copyright={tutorial.copyright} source={tutorial.source} />

            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-song text-xl font-semibold text-lacquer-700">
                  学员作品 ({works.length})
                </h2>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  上传作品
                </button>
              </div>

              {works.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {works.map((work) => (
                    <div key={work.id} className="group relative rounded-xl overflow-hidden">
                      <img
                        src={work.image}
                        alt={work.description}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <img src={work.userAvatar} alt="" className="w-5 h-5 rounded-full" />
                            <span className="text-white text-xs">{work.userName}</span>
                          </div>
                          <p className="text-white/80 text-xs line-clamp-2">{work.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rice-100 flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-lacquer-300" />
                  </div>
                  <p className="text-lacquer-400 mb-2">还没有学员作品</p>
                  <p className="text-sm text-lacquer-300">成为第一个上传作品的人吧</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              <button
                onClick={handleCollect}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  collected
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                } ${isAnimating ? 'animate-bounce-soft' : ''}`}
              >
                <Heart className={`w-5 h-5 ${collected ? 'fill-current' : ''}`} />
                {collected ? '已收藏' : '收藏教程'}
              </button>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2.5 rounded-xl bg-rice-50 text-lacquer-500 text-sm font-medium hover:bg-rice-100 transition-colors flex items-center justify-center gap-1">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>

              {author && (
                <div className="mt-6 pt-6 border-t border-rice-200">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-14 h-14 rounded-full border-2 border-rice-100"
                    />
                    <div>
                      <h4 className="font-semibold text-lacquer-700">{author.name}</h4>
                      <p className="text-xs text-primary-500">非遗传承人</p>
                    </div>
                  </div>
                  <p className="text-sm text-lacquer-400 line-clamp-3">{author.bio}</p>
                  <Link
                    to="/tutorials"
                    className="mt-4 block text-center py-2 text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    查看更多作品 →
                  </Link>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-rice-200 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-lacquer-400">难度等级</span>
                  <span className="font-medium text-lacquer-600">{difficultyLabels[tutorial.difficulty]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lacquer-400">所需时间</span>
                  <span className="font-medium text-lacquer-600">{formatDuration(tutorial.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lacquer-400">材料数量</span>
                  <span className="font-medium text-lacquer-600">{tutorial.materials.length} 种</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lacquer-400">步骤数量</span>
                  <span className="font-medium text-lacquer-600">{tutorial.steps.length} 步</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-lacquer-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-rice-200">
              <h3 className="font-song text-xl font-semibold text-lacquer-700">
                上传练习作品
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  作品图片
                </label>
                {workImage ? (
                  <div className="relative">
                    <img
                      src={workImage}
                      alt="预览"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setWorkImage('')}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <div className="w-full h-48 border-2 border-dashed border-rice-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-colors">
                      <ImageIcon className="w-10 h-10 text-lacquer-300 mb-2" />
                      <p className="text-sm text-lacquer-400">点击上传图片</p>
                      <p className="text-xs text-lacquer-300 mt-1">支持 JPG、PNG 格式</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  作品描述
                </label>
                <textarea
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                  placeholder="分享你的制作心得..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-rice-200 flex gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setWorkImage('');
                  setWorkDescription('');
                }}
                className="flex-1 py-3 rounded-xl bg-rice-100 text-lacquer-500 font-medium hover:bg-rice-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitWork}
                disabled={!workImage}
                className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交作品
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
