import { Material } from '@/types';

interface MaterialItemProps {
  material: Material;
}

export default function MaterialItem({ material }: MaterialItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-rice-200 hover:border-primary-200 hover:shadow-sm transition-all">
      <div className="w-14 h-14 rounded-lg bg-rice-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {material.image ? (
          <img src={material.image} alt={material.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-2xl">📦</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-lacquer-700 truncate">{material.name}</h5>
        <p className="text-sm text-lacquer-400">{material.quantity}</p>
      </div>
    </div>
  );
}
