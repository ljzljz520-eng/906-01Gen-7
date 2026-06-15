import { AlertTriangle } from 'lucide-react';

interface SafetyAlertProps {
  note: string;
}

export default function SafetyAlert({ note }: SafetyAlertProps) {
  return (
    <div className="bg-primary-50 border-l-4 border-primary-500 p-5 rounded-r-xl">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="font-song font-semibold text-primary-700 mb-1">安全提醒</h4>
          <p className="text-sm text-primary-600 leading-relaxed">{note}</p>
        </div>
      </div>
    </div>
  );
}
