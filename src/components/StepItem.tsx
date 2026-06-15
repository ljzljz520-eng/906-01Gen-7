import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Step } from '@/types';

interface StepItemProps {
  step: Step;
  index: number;
}

export default function StepItem({ step, index }: StepItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative pl-12 pb-8 last:pb-0">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-rice-300" />
      
      <div className="absolute left-0 top-0 w-10 h-10 -translate-x-1/2 rounded-full bg-primary-500 text-white flex items-center justify-center font-song font-bold shadow-md z-10">
        {index + 1}
      </div>

      <div
        className="bg-white rounded-xl shadow-sm border border-rice-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-5 flex items-center justify-between">
          <h4 className="font-song text-lg font-semibold text-lacquer-700">
            {step.title}
          </h4>
          <button className="w-8 h-8 rounded-full bg-rice-100 flex items-center justify-center text-lacquer-400">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isExpanded && (
          <div className="px-5 pb-5 animate-fade-in">
            {step.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src={step.image} alt={step.title} className="w-full h-48 object-cover" />
              </div>
            )}
            <p className="text-lacquer-500 leading-relaxed">{step.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
