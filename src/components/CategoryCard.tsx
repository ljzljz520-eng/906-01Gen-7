import { Link } from 'react-router-dom';
import { Category, categoryLabels, categoryColors, categoryBgColors } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface CategoryCardProps {
  category: Category;
  icon: React.ReactNode;
}

export default function CategoryCard({ category, icon }: CategoryCardProps) {
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const setSearchKeyword = useAppStore((state) => state.setSearchKeyword);

  const handleClick = () => {
    setSelectedCategory(category);
    setSearchKeyword('');
  };

  return (
    <Link
      to="/tutorials"
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-2xl p-6 ${categoryBgColors[category]} card-hover`}
    >
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl ${categoryColors[category]} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="font-song text-xl font-semibold text-lacquer-700 mb-1">
          {categoryLabels[category]}
        </h3>
        <p className="text-sm text-lacquer-400">探索传统工艺之美</p>
      </div>
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${categoryColors[category]} opacity-10 group-hover:scale-150 transition-transform duration-500`} />
    </Link>
  );
}
