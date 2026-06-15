import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Heart, BookOpen, Home } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { categoryLabels, Category } from '@/types';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { currentUser, setSearchKeyword, setSelectedCategory } = useAppStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(searchInput);
    setSelectedCategory('all');
    navigate('/tutorials');
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (cat: Category | 'all') => {
    setSelectedCategory(cat);
    setSearchKeyword('');
    navigate('/tutorials');
    setMobileMenuOpen(false);
  };

  const categories = Object.entries(categoryLabels) as [Category, string][];

  return (
    <header className="sticky top-0 z-50 bg-rice-50/95 backdrop-blur-sm border-b border-rice-300">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-song text-xl font-bold text-lacquer-700">手艺馆</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-lacquer-600 hover:text-primary-500 transition-colors font-medium">
              首页
            </Link>
            <div className="relative group">
              <button className="text-lacquer-600 hover:text-primary-500 transition-colors font-medium">
                工艺分类
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-card py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="w-full text-left px-4 py-2 text-lacquer-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  全部工艺
                </button>
                {categories.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryClick(key)}
                    className="w-full text-left px-4 py-2 text-lacquer-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <Link to="/topics" className="text-lacquer-600 hover:text-primary-500 transition-colors font-medium">
              专题路径
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="搜索教程..."
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full bg-white border border-rice-300 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lacquer-400" />
              </div>
            </form>

            <Link to="/profile" className="hidden md:flex items-center gap-2 text-lacquer-600 hover:text-primary-500 transition-colors">
              {currentUser ? (
                <>
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                </>
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>

            {currentUser && currentUser.role !== 'learner' && (
              <Link to="/publish" className="hidden md:block">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg">
                  发布教程
                </button>
              </Link>
            )}

            <button
              className="md:hidden p-2 text-lacquer-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-rice-200">
          <div className="container py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="搜索教程..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-rice-50 border border-rice-300 text-sm focus:outline-none focus:border-primary-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lacquer-400" />
              </div>
            </form>

            <nav className="space-y-2">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 text-lacquer-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>首页</span>
              </Link>
              <div className="px-4 py-2">
                <p className="text-sm text-lacquer-400 mb-2">工艺分类</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => handleCategoryClick(key)}
                      className="py-2 px-3 text-sm rounded-lg bg-rice-50 text-lacquer-600 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                to="/topics"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 text-lacquer-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span>专题路径</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 text-lacquer-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>我的收藏</span>
              </Link>
            </nav>

            {currentUser && currentUser.role !== 'learner' && (
              <Link to="/publish" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 bg-primary-500 text-white rounded-lg font-medium">
                  发布教程
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
