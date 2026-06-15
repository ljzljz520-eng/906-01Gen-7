import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, Users, Award, ArrowRight } from 'lucide-react';
import TutorialCard from '@/components/TutorialCard';
import CategoryCard from '@/components/CategoryCard';
import { useAppStore } from '@/store/useAppStore';
import { getArtisans } from '@/data/users';
import { Category, categoryLabels } from '@/types';

export default function Home() {
  const { tutorials, topics } = useAppStore();
  const featuredTutorials = tutorials.slice(0, 4);
  const artisans = getArtisans();
  const featuredTopics = topics.slice(0, 3);

  const heroSlides = [
    {
      title: '传承千年工艺之美',
      subtitle: '竹编 · 漆器 · 剪纸 · 扎染',
      description: '跟着非遗匠人，学习传统手工艺',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
      color: 'bamboo',
    },
    {
      title: '一漆一世界',
      subtitle: '千年漆艺 · 匠心独运',
      description: '探索脱胎漆器的独特魅力',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
      color: 'lacquer',
    },
    {
      title: '纸上生花',
      subtitle: '剪纸艺术 · 巧夺天工',
      description: '一把剪刀，剪出万千世界',
      image: 'https://images.unsplash.com/photo-1611348586804-61bf6c0c0892?w=1200&q=80',
      color: 'papercut',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const categoryIcons: Record<Category, React.ReactNode> = {
    bamboo: <span className="text-2xl">🎋</span>,
    lacquer: <span className="text-2xl">🏺</span>,
    papercut: <span className="text-2xl">✂️</span>,
    tieDye: <span className="text-2xl">🎨</span>,
  };

  const categories = Object.keys(categoryLabels) as Category[];

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lacquer-900/80 via-lacquer-900/50 to-transparent" />
            <div className="container h-full flex items-center relative z-10">
              <div className={`max-w-xl transition-all duration-700 delay-200 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <p className="text-primary-300 font-medium mb-3">{slide.subtitle}</p>
                <h1 className="font-song text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-rice-200 text-lg mb-8">{slide.description}</p>
                <Link
                  to="/tutorials"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-lg"
                >
                  开始学习
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-primary-500' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>四大传统工艺</span>
          </div>
          <h2 className="font-song text-3xl md:text-4xl font-bold text-lacquer-700 mb-3">
            探索手艺之美
          </h2>
          <p className="text-lacquer-400 max-w-xl mx-auto">
            从入门到精通，跟随非遗匠人，学习竹编、漆器、剪纸、扎染四大传统工艺
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat} category={cat} icon={categoryIcons[cat]} />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-song text-3xl font-bold text-lacquer-700 mb-2">
              精选教程
            </h2>
            <p className="text-lacquer-400">发现最受欢迎的手工艺教程</p>
          </div>
          <Link
            to="/tutorials"
            className="hidden md:inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium"
          >
            查看全部
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-1 text-primary-500 font-medium"
          >
            查看全部教程
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="bg-rice-100 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bamboo-50 rounded-full text-bamboo-600 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>非遗匠人</span>
            </div>
            <h2 className="font-song text-3xl md:text-4xl font-bold text-lacquer-700 mb-3">
              遇见手工艺人
            </h2>
            <p className="text-lacquer-400 max-w-xl mx-auto">
              每一位匠人都是活态的文化传承者
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisans.map((artisan) => (
              <div
                key={artisan.id}
                className="bg-white rounded-2xl p-6 text-center shadow-card card-hover"
              >
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-rice-100"
                />
                <h3 className="font-song text-xl font-semibold text-lacquer-700 mb-1">
                  {artisan.name}
                </h3>
                <p className="text-sm text-primary-500 mb-3">非遗传承人</p>
                <p className="text-sm text-lacquer-400 line-clamp-2 mb-4">
                  {artisan.bio}
                </p>
                <div className="flex items-center justify-center gap-1 text-xs text-lacquer-400">
                  <Award className="w-3.5 h-3.5 text-ochre-500" />
                  <span>{artisan.tutorialCount} 个教程</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-song text-3xl font-bold text-lacquer-700 mb-2">
              专题学习路径
            </h2>
            <p className="text-lacquer-400">非遗机构精心整理的系统化学习路径</p>
          </div>
          <Link
            to="/topics"
            className="hidden md:inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium"
          >
            更多专题
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-card card-hover"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={topic.cover}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lacquer-900/90 via-lacquer-900/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={topic.orgAvatar}
                    alt={topic.orgName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-rice-300">{topic.orgName}</span>
                </div>
                <h3 className="font-song text-xl font-bold text-white mb-2">
                  {topic.title}
                </h3>
                <p className="text-sm text-rice-300 line-clamp-2">
                  {topic.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-rice-300">
                  <span className="px-2 py-0.5 bg-white/20 rounded">
                    {topic.tutorialIds.length} 个教程
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="font-song text-3xl md:text-4xl font-bold mb-4">
            分享你的手艺
          </h2>
          <p className="text-primary-100 max-w-xl mx-auto mb-8">
            如果你也是手工艺人，欢迎加入我们，分享你的技艺，让更多人感受传统工艺的魅力
          </p>
          <Link
            to="/publish"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-rice-100 transition-colors shadow-lg"
          >
            发布教程
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
