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

/* =====================
   ScoreCard Component
===================== */

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

/* =====================
        App
===================== */

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

  /* ---------- Access Code Check ---------- */
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

  /* ---------- Scoring ---------- */
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

  /* =====================
        Render
===================== */

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <BrainCircuit size={32} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-4 text-slate-900">
            离职后生存与回撤测评
          </h1>

          <p className="text-center text-slate-500 mb-10 leading-relaxed">
            只讨论走之后你能不能扛得住——现金跑道、变现速度、执行系统、回撤边界。
          </p>

          <button
            onClick={() => {
              setShowAuthModal(true);
              setKeyError(false);
            }}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            开始测评 <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* ---------- Access Modal ---------- */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-lg bg-white rounded-[28px] shadow-2xl relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>

              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  进入测试前的一步确认
                </h2>

                <div className="mt-6">
                  <input
                    value={licenseKey}
                    onChange={(e) => {
                      setLicenseKey(e.target.value);
                      setKeyError(false);
                    }}
                    placeholder="访问码"
                    className={`w-full h-14 px-5 rounded-2xl border text-base outline-none transition-colors ${
                      keyError
                        ? 'border-rose-400 bg-rose-50'
                        : 'border-slate-200 focus:border-slate-400 bg-white'
                    }`}
                  />

                  {keyError && (
                    <div className="mt-3 flex items-center gap-2 text-rose-600 text-sm">
                      <AlertTriangle size={16} />
                      访问码错误，请重新输入
                    </div>
                  )}
                </div>

                <button
                  onClick={handleVerifyAndStart}
                  className="mt-7 w-full h-14 rounded-2xl bg-slate-900 text-white text-base font-bold hover:bg-slate-800 transition-all"
                >
                  进入测试
                </button>

                <div className="mt-4 text-center text-sm text-slate-400">
                  没有访问码？获取体验入口
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const q = QUESTIONS[currentQuestionIndex];

    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b">
          <div className="max-w-md mx-auto">
            <div className="flex justify-end text-xs text-slate-400">
              {currentQuestionIndex + 1} / {QUESTIONS.length}
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-slate-900" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 max-w-md mx-auto">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg mb-4">
            {q.section}
          </span>
          <h2 className="text-2xl font-bold mb-6">{q.text}</h2>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                className="w-full text-left p-5 rounded-2xl border bg-white hover:border-slate-400"
              >
                <strong className="mr-2">{opt.id}.</strong> {opt.text}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="mt-10 px-6 py-2.5 bg-white border rounded-xl text-slate-600"
          >
            <ChevronLeft size={16} /> 返回上一题
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'analyzing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <RotateCcw className="animate-spin mb-4" size={48} />
        正在生成测评结果…
      </div>
    );
  }

  if (currentStep === 'result' && resultData) {
    const { content, scores } = resultData;
    let Icon = Clock;
    if (resultData.type === 'HIGH_RISK') Icon = ShieldAlert;
    if (resultData.type === 'STRATEGIC_RESIGNATION') Icon = CheckCircle2;

    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow">
          <Icon className={`mx-auto mb-4 ${content.color}`} size={48} />
          <h1 className={`text-2xl font-bold text-center mb-2 ${content.color}`}>
            {content.title}
          </h1>
          <p className="text-center text-slate-500 mb-6">
            总分 {scores.total} / 60
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <ScoreCard label="现金跑道" score={scores.cash} max={18} highThreshold={13} icon={<Home size={16} />} />
            <ScoreCard label="变现速度" score={scores.income} max={18} highThreshold={13} icon={<TrendingUp size={16} />} />
            <ScoreCard label="执行系统" score={scores.execution} max={15} highThreshold={11} icon={<Layout size={16} />} />
            <ScoreCard label="回撤风险" score={scores.retreat} max={9} highThreshold={7} icon={<ShieldAlert size={16} />} />
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            {content.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <button
            onClick={() => setCurrentStep('welcome')}
            className="mt-8 w-full h-12 rounded-xl bg-slate-900 text-white font-bold"
          >
            重新测一次
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
