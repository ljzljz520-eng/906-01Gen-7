import { useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import TutorialCard from '@/components/TutorialCard';
import { useAppStore } from '@/store/useAppStore';
import { Category, Difficulty, categoryLabels, difficultyLabels } from '@/types';

export default function TutorialList() {
  const {
    tutorials,
    searchKeyword,
    selectedCategory,
    selectedDifficulty,
    setSearchKeyword,
    setSelectedCategory,
    setSelectedDifficulty,
  } = useAppStore();

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((t) => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && t.difficulty !== selectedDifficulty) return false;
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        if (
          !t.title.toLowerCase().includes(keyword) &&
          !t.description.toLowerCase().includes(keyword)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [tutorials, searchKeyword, selectedCategory, selectedDifficulty]);

  const categories: (Category | 'all')[] = ['all', 'bamboo', 'lacquer', 'papercut', 'tieDye'];
  const difficulties: (Difficulty | 'all')[] = ['all', 'beginner', 'intermediate', 'advanced'];

  const getCategoryLabel = (cat: Category | 'all') => {
    return cat === 'all' ? '全部' : categoryLabels[cat];
  };

  const getDifficultyLabel = (diff: Difficulty | 'all') => {
    return diff === 'all' ? '全部难度' : difficultyLabels[diff];
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-song text-3xl md:text-4xl font-bold text-lacquer-700 mb-2">
            教程中心
          </h1>
          <p className="text-lacquer-400">发现并学习传统手工艺</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lacquer-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="搜索教程..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-lacquer-500">
                <Filter className="w-4 h-4" />
                <span>分类：</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-rice-50 text-lacquer-500 hover:bg-rice-100'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-lacquer-500">
                <SlidersHorizontal className="w-4 h-4" />
                <span>难度：</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedDifficulty === diff
                        ? 'bg-bamboo-500 text-white shadow-md'
                        : 'bg-rice-50 text-lacquer-500 hover:bg-rice-100'
                    }`}
                  >
                    {getDifficultyLabel(diff)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-lacquer-400">
            共找到 <span className="font-semibold text-lacquer-600">{filteredTutorials.length}</span> 个教程
          </p>
        </div>

        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rice-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-lacquer-300" />
            </div>
            <h3 className="font-song text-xl font-semibold text-lacquer-600 mb-2">
              没有找到相关教程
            </h3>
            <p className="text-lacquer-400">试试其他关键词或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
