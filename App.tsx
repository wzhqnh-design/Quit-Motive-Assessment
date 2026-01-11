import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS, RESULTS } from './constants';
import { ScoreBreakdown, ResultType, Option } from './types';
import { 
  ArrowRight, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  ShieldAlert,
  Home,
  BrainCircuit,
  Layout,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'analyzing' | 'result'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option['id']>>({});
  const [licenseKey, setLicenseKey] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Calculate Progress
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleVerifyAndStart = () => {
    if (licenseKey.trim().toUpperCase() !== 'Q3H4') {
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
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Small delay for UX feeling
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo(0, 0);
      }, 250);
    } else {
      setCurrentStep('analyzing');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentStep('welcome');
    }
  };

  // Fake analysis effect
  useEffect(() => {
    if (currentStep === 'analyzing') {
      const timer = setTimeout(() => {
        setCurrentStep('result');
        window.scrollTo(0, 0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Scoring Logic
  const resultData = useMemo(() => {
    if (currentStep !== 'result') return null;

    let totalScore = 0;
    const scores: ScoreBreakdown = {
      total: 0,
      emotion: 0,
      family: 0,
      risk: 0,
      value: 0,
      structure: 0
    };

    QUESTIONS.forEach(q => {
      const answer = answers[q.id];
      if (!answer) return;

      let points = 0;
      
      // SECTION 3 (Risk - Q10-Q13) uses REVERSE scoring
      if (q.sectionId === 'risk') {
        // A=3, B=2, C=1, D=0
        if (answer === 'A') points = 3;
        if (answer === 'B') points = 2;
        if (answer === 'C') points = 1;
        if (answer === 'D') points = 0;
      } else {
        // Standard Scoring: A=0, B=1, C=2, D=3
        if (answer === 'A') points = 0;
        if (answer === 'B') points = 1;
        if (answer === 'C') points = 2;
        if (answer === 'D') points = 3;
      }

      totalScore += points;
      scores.total = totalScore;
      
      // Accumulate category scores
      scores[q.sectionId] += points;
    });

    // Determine Result Category
    let resultType: ResultType = 'PREPARATION_NEEDED'; // Default (Yellow)

    // Red: High Risk
    if (
      totalScore >= 38 ||
      scores.emotion >= 11 ||
      scores.family >= 9 ||
      scores.structure >= 7
    ) {
      resultType = 'HIGH_RISK';
    } 
    // Green: Strategic Resignation
    else if (
      totalScore <= 21 &&
      scores.emotion <= 5 &&
      scores.family <= 4 &&
      scores.structure <= 3
    ) {
      resultType = 'STRATEGIC_RESIGNATION';
    }
    // Yellow is default (22-37 or safe total but high specific risk handled by first condition)

    return { type: resultType, content: RESULTS[resultType], scores };
  }, [answers, currentStep]);


  // --- Render Helpers ---

  const renderContent = () => {
    if (currentStep === 'welcome') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 relative overflow-hidden">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <BrainCircuit size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-4 text-slate-900">
              你到底应不应该离职？
            </h1>
            <p className="text-center text-slate-500 mb-10 leading-relaxed">
              这是一个基于20个现实维度的理性决策模型。我们不谈勇气，只谈风险、底盘与可行性。
              <br/><br/>
              请诚实面对内心，选择最接近真实情况的选项。
            </p>
            
            <button 
              onClick={() => {
                setKeyError(false);
                setShowAuthModal(true);
              }}
              className="w-full bg-slate-900 text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              开始理性测评 <ArrowRight size={20} />
            </button>
            
            <div className="mt-6 text-xs text-center text-slate-400">
              测评时间约 3-5 分钟 · 结果仅供参考
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 'quiz') {
      const currentQ = QUESTIONS[currentQuestionIndex];

      return (
        <div className="min-h-screen flex flex-col bg-slate-50">
          {/* Header / Progress */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100">
            <div className="max-w-md mx-auto w-full">
              <div className="flex items-center justify-end mb-3">
                <span className="text-xs font-medium text-slate-400">
                  {currentQuestionIndex + 1} / {QUESTIONS.length}
                </span>
              </div>
              
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-900 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="flex-1 flex flex-col items-center p-6 max-w-md mx-auto w-full">
            <div className="mt-2 mb-6 w-full">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg mb-4">
                {currentQ.section}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                {currentQ.text}
              </h2>
            </div>

            <div className="w-full space-y-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 group
                    ${answers[currentQ.id] === opt.id 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 active:scale-[0.98]'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className={`
                      flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border
                      ${answers[currentQ.id] === opt.id 
                        ? 'border-white bg-white text-slate-900' 
                        : 'border-slate-300 text-slate-400 group-hover:border-slate-400'
                      }
                    `}>
                      {opt.id}
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={handlePrevious}
              className="mt-10 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center gap-1.5"
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
          <h2 className="text-xl font-medium">正在生成决策报告...</h2>
          <p className="text-slate-400 text-sm mt-2">综合情绪、家庭、风险与结构维度</p>
        </div>
      );
    }

    if (currentStep === 'result' && resultData) {
      const { content, scores } = resultData;
      
      // Icon selection based on result
      let ResultIcon = Clock;
      if (resultData.type === 'HIGH_RISK') ResultIcon = ShieldAlert;
      if (resultData.type === 'STRATEGIC_RESIGNATION') ResultIcon = CheckCircle2;
      if (resultData.type === 'PREPARATION_NEEDED') ResultIcon = AlertTriangle;

      return (
        <div className="min-h-screen bg-slate-50 pb-10">
          {/* Result Header Card */}
          <div className="bg-white p-6 pb-10 shadow-sm rounded-b-[2.5rem] relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${content.bgColor.replace('bg-', 'bg-opacity-50 bg-')}`}></div>
            
            <div className="max-w-md mx-auto">
               <div className="text-center mt-4">
                  <div className={`mx-auto w-20 h-20 rounded-full ${content.bgColor} flex items-center justify-center mb-4`}>
                    <ResultIcon className={`w-10 h-10 ${content.color}`} />
                  </div>
                  <h1 className={`text-2xl font-bold mb-1 ${content.color}`}>
                    {content.title}
                  </h1>
                  <p className="text-slate-400 text-sm font-medium">
                    风险指数评分: <span className="text-slate-900 font-bold text-lg">{scores.total}</span> / 60
                  </p>
               </div>

               {/* Score Dashboard */}
               <div className="grid grid-cols-2 gap-3 mt-8">
                 <ScoreCard label="情绪干扰" score={scores.emotion} max={15} highThreshold={11} icon={<TrendingUp size={16}/>} />
                 <ScoreCard label="家庭约束" score={scores.family} max={12} highThreshold={9} icon={<Home size={16}/>} />
                 <ScoreCard label="底盘风险" score={scores.risk} max={12} highThreshold={9} icon={<ShieldAlert size={16}/>} />
                 <ScoreCard label="后续结构" score={scores.structure} max={9} highThreshold={7} icon={<Layout size={16}/>} />
               </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="max-w-md mx-auto px-6 -mt-4 relative z-10">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-slate-900 rounded-full"></span>
                深度解读
              </h3>
              <div className="space-y-4 text-slate-600 text-sm leading-7 text-justify">
                {content.description.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-3">
               <button 
                  onClick={() => {
                    setKeyError(false);
                    setLicenseKey('');
                    // Only show modal, don't change step yet to avoid flash
                    setShowAuthModal(true);
                  }}
                  className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} /> 重新测评
                </button>
                <p className="text-center text-xs text-slate-300 mt-4">
                  建议截屏保存结果，作为决策参考
                </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderContent()}

      {/* Global License Key Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setShowAuthModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-[340px] bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 pt-10 transform transition-all animate-in fade-in zoom-in duration-300 border border-slate-100">
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Minimalist Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center mb-6 bg-slate-50">
                 <div className="w-2 h-2 bg-slate-300 rounded-full" />
              </div>
              
              <h3 className="text-lg font-medium text-slate-800 tracking-tight">进入测试前的一步确认</h3>
            </div>

            {/* Input Area */}
            <div className="relative mb-6 space-y-3">
              <input
                type="text"
                autoFocus
                value={licenseKey}
                onChange={(e) => {
                  setLicenseKey(e.target.value.toUpperCase());
                  if (keyError) setKeyError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerifyAndStart();
                }}
                maxLength={8}
                placeholder="访问码"
                className={`w-full py-3 bg-slate-50 rounded-lg text-center font-mono text-base tracking-widest outline-none transition-all placeholder:font-sans placeholder:text-slate-300 placeholder:text-sm placeholder:tracking-normal
                  ${keyError 
                    ? 'bg-rose-50 text-rose-500 placeholder:text-rose-300' 
                    : 'text-slate-800 focus:bg-slate-100 focus:ring-2 focus:ring-slate-100'
                  }
                `}
              />
              
              {/* Subtle error message */}
              {keyError && (
                <div className="absolute w-full text-center top-full mt-1">
                   <p className="text-[10px] text-rose-400 font-medium animate-pulse">
                    无效的访问码
                  </p>
                </div>
              )}
            </div>

            {/* Main Action */}
            <button 
              onClick={handleVerifyAndStart}
              className="w-full bg-slate-900 text-white h-12 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
            >
              进入测试
            </button>

            {/* Minimalist Footer Link */}
            <div className="mt-8 text-center">
               <a 
                 href="https://xhslink.com/m/qEOVGRClzt" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-block text-[11px] text-slate-400 hover:text-slate-600 transition-colors border-b border-transparent hover:border-slate-200 pb-0.5"
               >
                 没有访问码？获取体验入口
               </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper Component for the mini score dashboard
const ScoreCard: React.FC<{
  label: string;
  score: number;
  max: number;
  highThreshold: number;
  icon: React.ReactNode;
}> = ({ label, score, max, highThreshold, icon }) => {
  const isHighRisk = score >= highThreshold;
  
  return (
    <div className={`p-3 rounded-xl border ${isHighRisk ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'} flex flex-col justify-between`}>
      <div className={`flex items-center gap-2 text-xs font-medium ${isHighRisk ? 'text-rose-600' : 'text-slate-500'}`}>
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
};

export default App;