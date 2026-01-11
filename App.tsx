import React, { useEffect, useMemo, useState } from 'react';
import { QUESTIONS, RESULTS } from './constants';
import { Option, ResultType, ScoreBreakdown } from './types';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Layout,
  RotateCcw,
  ShieldAlert,
  TrendingUp,
  X
} from 'lucide-react';

/**
 * 注意：类型定义必须放在 JSX return 之外（文件顶层），
 * 否则会被当成 JSX 文本解析，出现 “Expected } but found :”
 */
type ScoreCardProps = {
  label: string;
  score: number;
  max: number;
  highThreshold: number;
  icon: React.ReactNode;
};

function ScoreCard({ label, score, max, highThreshold, icon }: ScoreCardProps) {
  const isHighRisk = score >= highThreshold;

  return (
    <div
      className={`p-3 rounded-xl border ${
        isHighRisk ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'
      } flex flex-col justify-between`}
    >
      <div
        className={`flex items-center gap-2 text-xs font-medium ${
          isHighRisk ? 'text-rose-600' : 'text-slate-500'
        }`}
      >
        {icon} {label}
      </div>

      <div className="mt-2 flex items-end gap-1">
        <span className={`text-xl font-bold ${isHighRisk ? 'text-rose-700' : 'text-slate-800'}`}>
          {score}
        </span>
        <span className="text-xs text-slate-400 mb-1">/{max}</span>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'analyzing' | 'result'>(
    'welcome'
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option['id']>>({});
  const [licenseKey, setLicenseKey] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleVerifyAndStart = () => {
    if (licenseKey.trim().toUpperCase() !== 'WY08') {
      setKeyError(true);
      return;
    }
    setShowAuthModal(false);
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (optionId: Option['id']) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        window.scrollTo(0, 0);
      }, 200);
    } else {
      setCurrentStep('analyzing');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setCurrentStep('welcome');
    }
  };

  useEffect(() => {
    if (currentStep === 'analyzing') {
      const timer = setTimeout(() => {
        setCurrentStep('result');
        window.scrollTo(0, 0);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const resultData = useMemo(() => {
    if (currentStep !== 'result') return null;

    const scores: ScoreBreakdown = {
      total: 0,
      cash: 0,
      income: 0,
      execution: 0,
      retreat: 0
    };

    const pointsMap: Record<Option['id'], number> = { A: 3, B: 2, C: 1, D: 0 };

    QUESTIONS.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      const points = pointsMap[answer];
      scores.total += points;
      scores[q.sectionId] += points;
    });

    let resultType: ResultType = 'PREPARATION_NEEDED';

    const isHighRisk =
      scores.total >= 38 || scores.cash >= 13 || scores.income >= 13 || scores.retreat >= 7;

    const isStrategic =
      scores.total <= 21 && scores.cash <= 6 && scores.income <= 6 && scores.retreat <= 3;

    if (isHighRisk) resultType = 'HIGH_RISK';
    else if (isStrategic) resultType = 'STRATEGIC_RESIGNATION';

    return { type: resultType, content: RESULTS[resultType], scores };
  }, [answers, currentStep]);

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 relative overflow-hidden">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <BrainCircuit size={32} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-4 text-slate-900">离职后果承受能力测评</h1>

          <p className="text-center text-slate-500 mb-10 leading-relaxed">
           这是离职系列的第二部分。它不替你做决定，只帮助你判断：离职后的风险，是否在你可承受范围内。
            <br />
            <br />
            请按真实情况作答，别选你希望自己是的那种。
          </p>

          <button
            onClick={() => {
              setShowAuthModal(true);
              setKeyError(false);
            }}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            开始测评
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-6 text-xs text-center text-slate-400">测评时间约 3-5 分钟 · 结果仅供参考</div>
        </div>

        {/* Auth Modal (V1) */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X size={18} className="text-slate-500" />
              </button>

              <div className="p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">请输入授权码</h2>
                <p className="text-sm text-slate-500 mb-6">仅限购买用户使用</p>

                <input
                  value={licenseKey}
                  onChange={(e) => {
                    setLicenseKey(e.target.value);
                    setKeyError(false);
                  }}
                //  placeholder="例如：Q3H4"
                  className={`w-full px-4 py-3 rounded-2xl border text-lg font-mono tracking-wider outline-none transition-colors ${
                    keyError ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-slate-400'
                  }`}
                />

                {keyError && (
                  <div className="mt-3 flex items-center gap-2 text-rose-600 text-sm">
                    <AlertTriangle size={16} />
                    授权码错误，请重新输入
                  </div>
                )}

                <button
                  onClick={handleVerifyAndStart}
                  className="mt-6 w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  验证并开始
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const currentQ = QUESTIONS[currentQuestionIndex];

    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center justify-end mb-3">
              <span className="text-xs font-medium text-slate-400">
                {currentQuestionIndex + 1} / {QUESTIONS.length}
              </span>
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center p-6 max-w-md mx-auto w-full">
          <div className="mt-2 mb-6 w-full">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg mb-4">
              {currentQ.section}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 leading-snug">{currentQ.text}</h2>
          </div>

          <div className="w-full space-y-3">
            {currentQ.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 group ${
                  answers[currentQ.id] === opt.id
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 active:scale-[0.98]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${
                      answers[currentQ.id] === opt.id
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="mt-10 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-slate-300 transition-all shadow-sm flex items-center gap-1.5"
          >
            <ChevronLeft size={16} /> 返回上一题
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'analyzing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
        <div className="animate-spin text-slate-900 mb-4">
          <RotateCcw size={48} />
        </div>
        <h2 className="text-xl font-medium">正在生成测评报告...</h2>
        <p className="text-slate-400 text-sm mt-2">综合现金跑道、变现速度、执行系统与回撤边界</p>
      </div>
    );
  }

  if (currentStep === 'result' && resultData) {
    const { content, scores } = resultData;

    let ResultIcon = Clock;
    if (resultData.type === 'HIGH_RISK') ResultIcon = ShieldAlert;
    if (resultData.type === 'STRATEGIC_RESIGNATION') ResultIcon = CheckCircle2;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
        <div className="pt-12 pb-10 px-6">
          <div className="max-w-md mx-auto">
            <div className={`rounded-3xl border ${content.borderColor} ${content.bgColor} p-8 shadow-lg`}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4">
                  <ResultIcon className={`w-10 h-10 ${content.color}`} />
                </div>

                <h1 className={`text-2xl font-bold mb-1 ${content.color}`}>{content.title}</h1>

                <p className="text-slate-400 text-sm font-medium">
                  总风险分: <span className="text-slate-900 font-bold text-lg">{scores.total}</span> / 60
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <ScoreCard label="现金跑道" score={scores.cash} max={18} highThreshold={13} icon={<Home size={16} />} />
                <ScoreCard
                  label="变现速度"
                  score={scores.income}
                  max={18}
                  highThreshold={13}
                  icon={<TrendingUp size={16} />}
                />
                <ScoreCard
                  label="执行系统"
                  score={scores.execution}
                  max={15}
                  highThreshold={11}
                  icon={<Layout size={16} />}
                />
                <ScoreCard
                  label="回撤风险"
                  score={scores.retreat}
                  max={9}
                  highThreshold={7}
                  icon={<ShieldAlert size={16} />}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 -mt-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-slate-900 rounded-full" />
              深度解读
            </h3>

            <div className="space-y-4 text-slate-600 text-sm leading-7 text-justify">
              {content.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setCurrentStep('welcome');
                setCurrentQuestionIndex(0);
                setAnswers({});
                setLicenseKey('');
              }}
              className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> 重新测一次
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <ChevronRight size={18} /> 回到顶部
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
