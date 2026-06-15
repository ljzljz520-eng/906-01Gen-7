import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  List,
  ClipboardList,
  Shield,
  ChevronRight,
  Plus,
  Trash2,
  Image as ImageIcon,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Category, Difficulty, categoryLabels, difficultyLabels } from '@/types';
import type { Material, Step } from '@/types';

const steps = [
  { id: 1, name: '基本信息', icon: FileText },
  { id: 2, name: '材料清单', icon: List },
  { id: 3, name: '步骤详情', icon: ClipboardList },
  { id: 4, name: '安全与版权', icon: Shield },
];

export default function Publish() {
  const navigate = useNavigate();
  const { addTutorial, currentUser } = useAppStore();

  const [currentStep, setCurrentStep] = useState(1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('bamboo');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [duration, setDuration] = useState(60);
  const [coverImage, setCoverImage] = useState('');

  const [materials, setMaterials] = useState<Material[]>([
    { id: 'mat-1', name: '', quantity: '' },
  ]);

  const [tutorialSteps, setTutorialSteps] = useState<Step[]>([
    { id: 'step-1', order: 1, title: '', description: '' },
  ]);

  const [safetyNote, setSafetyNote] = useState('');
  const [copyright, setCopyright] = useState('');
  const [source, setSource] = useState('');

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addMaterial = () => {
    setMaterials([
      ...materials,
      { id: `mat-${Date.now()}`, name: '', quantity: '' },
    ]);
  };

  const removeMaterial = (id: string) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  const updateMaterial = (id: string, field: 'name' | 'quantity', value: string) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addStep = () => {
    setTutorialSteps([
      ...tutorialSteps,
      {
        id: `step-${Date.now()}`,
        order: tutorialSteps.length + 1,
        title: '',
        description: '',
      },
    ]);
  };

  const removeStep = (id: string) => {
    if (tutorialSteps.length > 1) {
      const newSteps = tutorialSteps
        .filter((s) => s.id !== id)
        .map((s, index) => ({ ...s, order: index + 1 }));
      setTutorialSteps(newSteps);
    }
  };

  const updateStep = (
    id: string,
    field: 'title' | 'description' | 'image',
    value: string
  ) => {
    setTutorialSteps(
      tutorialSteps.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleStepImageUpload = (stepId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateStep(stepId, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return title.trim() && description.trim() && coverImage;
      case 2:
        return materials.some((m) => m.name.trim() && m.quantity.trim());
      case 3:
        return tutorialSteps.length >= 3 && tutorialSteps.every((s) => s.title.trim() && s.description.trim());
      case 4:
        return safetyNote.trim() && copyright.trim();
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!canProceed() || !currentUser) return;

    addTutorial({
      title,
      cover: coverImage,
      category,
      difficulty,
      authorId: currentUser.id,
      duration,
      safetyNote,
      copyright,
      source: source || undefined,
      description,
      materials: materials.filter((m) => m.name.trim() && m.quantity.trim()),
      steps: tutorialSteps.filter((s) => s.title.trim() && s.description.trim()),
    });

    navigate('/tutorials');
  };

  const categories = Object.entries(categoryLabels) as [Category, string][];
  const difficulties = Object.entries(difficultyLabels) as [Difficulty, string][];

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-3xl">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-lacquer-400 hover:text-primary-500 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <h1 className="font-song text-3xl font-bold text-lacquer-700 mb-2">
            发布教程
          </h1>
          <p className="text-lacquer-400">分享你的手工艺技艺</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center ${
                    step.id < currentStep ? 'text-bamboo-500' : step.id === currentStep ? 'text-primary-500' : 'text-lacquer-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.id < currentStep
                        ? 'bg-bamboo-500 text-white'
                        : step.id === currentStep
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                        : 'bg-rice-100 text-lacquer-300'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-2 ${
                      step.id < currentStep ? 'bg-bamboo-500' : 'bg-rice-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-song text-xl font-semibold text-lacquer-700">
                基本信息
              </h2>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  教程封面
                </label>
                {coverImage ? (
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt="封面预览"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setCoverImage('')}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center text-sm hover:bg-black/70"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <div className="w-full h-48 border-2 border-dashed border-rice-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-colors">
                      <ImageIcon className="w-10 h-10 text-lacquer-300 mb-2" />
                      <p className="text-sm text-lacquer-400">点击上传封面图</p>
                      <p className="text-xs text-lacquer-300 mt-1">建议尺寸 800x600</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  教程标题 <span className="text-primary-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入教程标题"
                  className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  教程简介 <span className="text-primary-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="简要介绍你的教程内容..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-lacquer-600 mb-2">
                    工艺分类
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all appearance-none cursor-pointer"
                  >
                    {categories.map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-lacquer-600 mb-2">
                    难度等级
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all appearance-none cursor-pointer"
                  >
                    {difficulties.map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  预计时长（分钟）
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-song text-xl font-semibold text-lacquer-700">
                  材料清单
                </h2>
                <button
                  onClick={addMaterial}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  添加材料
                </button>
              </div>

              <div className="space-y-4">
                {materials.map((material, index) => (
                  <div
                    key={material.id}
                    className="flex items-start gap-3 p-4 bg-rice-50 rounded-xl"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-lacquer-400 mb-1">
                          材料名称
                        </label>
                        <input
                          type="text"
                          value={material.name}
                          onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                          placeholder="如：毛竹篾片"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-rice-300 text-sm text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-lacquer-400 mb-1">
                          用量
                        </label>
                        <input
                          type="text"
                          value={material.quantity}
                          onChange={(e) => updateMaterial(material.id, 'quantity', e.target.value)}
                          placeholder="如：20根"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-rice-300 text-sm text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeMaterial(material.id)}
                      className="p-2 text-lacquer-300 hover:text-primary-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-song text-xl font-semibold text-lacquer-700">
                  步骤详情
                </h2>
                <button
                  onClick={addStep}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-bamboo-50 text-bamboo-600 rounded-full text-sm font-medium hover:bg-bamboo-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  添加步骤
                </button>
              </div>

              <p className="text-sm text-lacquer-400">
                至少需要 3 个步骤，当前：{tutorialSteps.length} 个
              </p>

              <div className="space-y-6">
                {tutorialSteps.map((step) => (
                  <div
                    key={step.id}
                    className="relative pl-12 pb-6 border-b border-rice-200 last:border-0 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-bamboo-500 text-white font-song font-bold flex items-center justify-center">
                      {step.order}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                          placeholder="步骤标题"
                          className="flex-1 px-4 py-2 rounded-lg bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 font-medium"
                        />
                        <button
                          onClick={() => removeStep(step.id)}
                          className="p-2 text-lacquer-300 hover:text-primary-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        value={step.description}
                        onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                        placeholder="详细描述这一步的操作..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-rice-50 border border-rice-300 text-sm text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 resize-none"
                      />

                      <div>
                        {step.image ? (
                          <div className="relative inline-block">
                            <img
                              src={step.image}
                              alt="步骤图"
                              className="w-full max-w-xs h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => updateStep(step.id, 'image', '')}
                              className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="inline-flex items-center gap-2 px-4 py-2 bg-rice-100 text-lacquer-500 rounded-lg text-sm cursor-pointer hover:bg-rice-200 transition-colors">
                            <ImageIcon className="w-4 h-4" />
                            添加步骤图
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStepImageUpload(step.id, e)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-song text-xl font-semibold text-lacquer-700">
                安全提醒与版权
              </h2>

              <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
                <p className="text-sm text-primary-600 mb-4">
                  请务必填写安全提醒，保护学习者的安全。这是教程发布的必填项。
                </p>
                <textarea
                  value={safetyNote}
                  onChange={(e) => setSafetyNote(e.target.value)}
                  placeholder="例如：使用剪刀时请注意安全；儿童需在成人监护下操作；漆液可能引起过敏，请戴手套..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-primary-200 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  版权声明 <span className="text-primary-500">*</span>
                </label>
                <textarea
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  placeholder="例如：本教程版权归作者所有，仅供学习交流，未经授权不得转载..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lacquer-600 mb-2">
                  来源 / 工作室名称
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="例如：某某手工艺工作室"
                  className="w-full px-4 py-3 rounded-xl bg-rice-50 border border-rice-300 text-lacquer-700 placeholder-lacquer-300 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              <div className="bg-rice-50 rounded-xl p-5">
                <h4 className="font-medium text-lacquer-700 mb-2">💡 转载授权提示</h4>
                <p className="text-sm text-lacquer-500">
                  发布的教程默认保留来源信息。其他用户转载时必须保留作者署名和原始来源链接。
                  如需设置更详细的授权方式（如 CC 协议），可在版权声明中说明。
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-6 border-t border-rice-200">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-xl bg-rice-100 text-lacquer-500 font-medium hover:bg-rice-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                下一步
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="px-8 py-3 rounded-xl bg-bamboo-500 text-white font-medium hover:bg-bamboo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                发布教程
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
