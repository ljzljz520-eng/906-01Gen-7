import { Copyright, Shield } from 'lucide-react';

interface CopyrightNoticeProps {
  copyright: string;
  source?: string;
}

export default function CopyrightNotice({ copyright, source }: CopyrightNoticeProps) {
  return (
    <div className="bg-rice-100 border border-rice-300 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-ochre-500 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-song font-semibold text-lacquer-700 mb-2">版权声明</h4>
          <p className="text-sm text-lacquer-500 leading-relaxed mb-2">{copyright}</p>
          {source && (
            <div className="flex items-center gap-2 text-xs text-lacquer-400">
              <Copyright className="w-3.5 h-3.5" />
              <span>来源：{source}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
