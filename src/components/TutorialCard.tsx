import { Link } from 'react-router-dom';
import { Heart, Clock, User } from 'lucide-react';
import { Tutorial, categoryLabels, difficultyLabels, categoryColors, categoryBgColors, categoryTextColors } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { useState } from 'react';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  const { currentUser, isCollected, toggleCollection } = useAppStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const collected = currentUser ? isCollected(tutorial.id, currentUser.id) : false;

  const handleCollect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return;
    setIsAnimating(true);
    toggleCollection(tutorial.id, currentUser.id);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}分钟`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
  };

  const author = useAppStore((state) => state.getUserById(tutorial.authorId));

  return (
    <Link
      to={`/tutorials/${tutorial.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tutorial.cover}
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${categoryColors[tutorial.category]}`}>
            {categoryLabels[tutorial.category]}
          </span>
        </div>
        <button
          onClick={handleCollect}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            collected
              ? 'bg-primary-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-lacquer-400 hover:text-primary-500'
          } ${isAnimating ? 'animate-bounce-soft' : ''}`}
        >
          <Heart className={`w-4 h-4 ${collected ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-1 text-white text-xs">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryBgColors[tutorial.category]} ${categoryTextColors[tutorial.category]}`}>
              {difficultyLabels[tutorial.difficulty]}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-song text-lg font-semibold text-lacquer-700 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
          {tutorial.title}
        </h3>
        <p className="text-sm text-lacquer-400 line-clamp-2 mb-4">
          {tutorial.description}
        </p>

        <div className="flex items-center justify-between text-xs text-lacquer-400">
          <div className="flex items-center gap-2">
            {author ? (
              <div className="flex items-center gap-1.5">
                <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full" />
                <span>{author.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>佚名匠人</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(tutorial.duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{tutorial.collectCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
