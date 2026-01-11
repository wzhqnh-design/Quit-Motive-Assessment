import { Question, ResultContent, ResultType } from './types';

export const QUESTIONS: Question[] = [
  // --- Section 1: Emotion & State (Q1-Q5) ---
  {
    id: 1,
    section: "一、情绪与决策状态",
    sectionId: 'emotion',
    text: "在最近 30 天，你的身心状态整体更接近哪一种？",
    options: [
      { id: 'A', text: "精力基本稳定，偶尔疲惫但能恢复" },
      { id: 'B', text: "明显疲惫，靠休息或周末勉强缓解" },
      { id: 'C', text: "长期疲惫，恢复速度明显变慢" },
      { id: 'D', text: "明显透支，已经影响判断和生活质量" }
    ]
  },
  {
    id: 2,
    section: "一、情绪与决策状态",
    sectionId: 'emotion',
    text: "你最近产生强烈离职想法，主要原因是：",
    options: [
      { id: 'A', text: "长期结构性问题，与具体事件关系不大" },
      { id: 'B', text: "多个问题叠加，其中有导火索" },
      { id: 'C', text: "某一个人或某一次事件占主导" },
      { id: 'D', text: "几乎完全由一次冲突或刺激触发" }
    ]
  },
  {
    id: 3,
    section: "一、情绪与决策状态",
    sectionId: 'emotion',
    text: "如果你现在能获得两周完全不被打扰的休息时间：",
    options: [
      { id: 'A', text: "离职想法几乎不会改变" },
      { id: 'B', text: "可能会缓解一些，但仍倾向离职" },
      { id: 'C', text: "离职冲动会明显下降" },
      { id: 'D', text: "很可能暂时不想离职了" }
    ]
  },
  {
    id: 4,
    section: "一、情绪与决策状态",
    sectionId: 'emotion',
    text: "关于未来，你目前更清楚的是：",
    options: [
      { id: 'A', text: "下一步要做什么，以及大致路径" },
      { id: 'B', text: "有方向感，但细节尚不清楚" },
      { id: 'C', text: "主要清楚“不想再这样下去”" },
      { id: 'D', text: "几乎只有逃离当前状态的感觉" }
    ]
  },
  {
    id: 5,
    section: "一、情绪与决策状态",
    sectionId: 'emotion',
    text: "当你想到离职这个决定时，你的判断更多来自：",
    options: [
      { id: 'A', text: "我自己的长期观察和权衡" },
      { id: 'B', text: "自身感受为主，但会参考外界经验" },
      { id: 'C', text: "很多想法是在接触他人经历后被放大的" },
      { id: 'D', text: "明显被外界故事或舆论推着做判断" }
    ]
  },

  // --- Section 2: Family & Constraints (Q6-Q9) ---
  {
    id: 6,
    section: "二、家庭托底与现实约束",
    sectionId: 'family',
    text: "如果你在离职后 6–12 个月内未取得实质进展，你需要为家庭承担的现实后果更接近：",
    options: [
      { id: 'A', text: "几乎没有额外责任或压力" },
      { id: 'B', text: "会有担忧，但不影响家庭运转" },
      { id: 'C', text: "需要承担明显的经济或关系压力" },
      { id: 'D', text: "会直接影响家庭稳定或核心责任" }
    ]
  },
  {
    id: 7,
    section: "二、家庭托底与现实约束",
    sectionId: 'family',
    text: "在现实层面，你的家庭是否能为你提供缓冲？（如短期生活支持、居住支持、应急资金）",
    options: [
      { id: 'A', text: "可以提供明确、持续的支持" },
      { id: 'B', text: "能提供有限支持" },
      { id: 'C', text: "基本无法提供支持" },
      { id: 'D', text: "反而需要我承担家庭支出" }
    ]
  },
  {
    id: 8,
    section: "二、家庭托底与现实约束",
    sectionId: 'family',
    text: "如果你已经离职，但后续发展不如预期，你需要为家庭承担的实际后果更接近哪一种？",
    options: [
      { id: 'A', text: "几乎不需要家庭承担额外成本或压力" },
      { id: 'B', text: "会有影响，但家庭仍能自行消化" },
      { id: 'C', text: "需要家庭在经济或关系上做出明显让步" },
      { id: 'D', text: "会直接影响家庭稳定或核心责任" }
    ]
  },
  {
    id: 9,
    section: "二、家庭托底与现实约束",
    sectionId: 'family',
    text: "你目前在家庭中的角色更接近：",
    options: [
      { id: 'A', text: "家庭主要责任已完成，我相对自由" },
      { id: 'B', text: "家庭责任较轻" },
      { id: 'C', text: "家庭责任正在加重" },
      { id: 'D', text: "我是家庭的重要经济或情绪支撑" }
    ]
  },

  // --- Section 3: Risk & Foundation (Q10-Q13) [REVERSE SCORING] ---
  {
    id: 10,
    section: "三、风险承受与个人底盘",
    sectionId: 'risk',
    text: "如果未来 6 个月没有稳定收入，你的状态会是：",
    options: [
      { id: 'A', text: "几乎无法接受" },
      { id: 'B', text: "能撑一段时间，但压力很大" },
      { id: 'C', text: "可以接受，有心理准备" },
      { id: 'D', text: "已为这种情况做好完整预期" }
    ]
  },
  {
    id: 11,
    section: "三、风险承受与个人底盘",
    sectionId: 'risk',
    text: "关于非工资收入，你的真实经验是：",
    options: [
      { id: 'A', text: "从未有过，也未真正尝试" },
      { id: 'B', text: "有想法，但只停留在计划" },
      { id: 'C', text: "有过尝试，但尚未形成结果" },
      { id: 'D', text: "已真实赚到过钱（不论多少）" }
    ]
  },
  {
    id: 12,
    section: "三、风险承受与个人底盘",
    sectionId: 'risk',
    text: "如果离职后 3 个月没有明显进展：",
    options: [
      { id: 'A', text: "我很可能会慌乱、自我怀疑" },
      { id: 'B', text: "会动摇，但还能坚持一阵" },
      { id: 'C', text: "能按原计划继续执行" },
      { id: 'D', text: "已对这种情况做过心理预演" }
    ]
  },
  {
    id: 13,
    section: "三、风险承受与个人底盘",
    sectionId: 'risk',
    text: "如果这次离职被证明是失败：",
    options: [
      { id: 'A', text: "我很难接受，会严重否定自己" },
      { id: 'B', text: "心理上会受到很大打击" },
      { id: 'C', text: "可以接受，但会难受" },
      { id: 'D', text: "能将其视为一次必要试错" }
    ]
  },

  // --- Section 4: Value (Q14-Q17) ---
  {
    id: 14,
    section: "四、当前工作的真实价值",
    sectionId: 'value',
    text: "结合家庭现实，你的这份工作对你而言是：",
    options: [
      { id: 'A', text: "稳定器，对家庭和个人都重要" },
      { id: 'B', text: "对家庭重要，但个人成长有限" },
      { id: 'C', text: "对家庭影响有限，个人成长在下降" },
      { id: 'D', text: "同时限制家庭弹性和个人发展" }
    ]
  },
  {
    id: 15,
    section: "四、当前工作的真实价值",
    sectionId: 'value',
    text: "如果你在当前岗位再工作 2 年：",
    options: [
      { id: 'A', text: "家庭和个人都会更稳" },
      { id: 'B', text: "稳定但缺乏改善" },
      { id: 'C', text: "表面稳定，机会成本上升" },
      { id: 'D', text: "稳定感是表面的，长期风险更大" }
    ]
  },
  {
    id: 16,
    section: "四、当前工作的真实价值",
    sectionId: 'value',
    text: "你目前工作的成果，对外部世界而言：",
    options: [
      { id: 'A', text: "清晰、可量化、可迁移" },
      { id: 'B', text: "部分可迁移" },
      { id: 'C', text: "大多难以复用" },
      { id: 'D', text: "几乎只在当前环境有效" }
    ]
  },
  {
    id: 17,
    section: "四、当前工作的真实价值",
    sectionId: 'value',
    text: "你继续留下来的主要原因更接近：",
    options: [
      { id: 'A', text: "这是当前条件下的最优解" },
      { id: 'B', text: "短期内最稳妥" },
      { id: 'C', text: "不想给家庭增加不确定性" },
      { id: 'D', text: "只是因为害怕改变" }
    ]
  },

  // --- Section 5: Structure (Q18-Q20) ---
  {
    id: 18,
    section: "五、离职后的结构与可执行性",
    sectionId: 'structure',
    text: "关于离职后的尝试，你更接近哪一种情况？",
    options: [
      { id: 'A', text: "我给自己设了明确的尝试期限和判断标准，如果没有进展就会停下来或调整" },
      { id: 'B', text: "我有一个大致的尝试期限，但什么时候该停还不够明确" },
      { id: 'C', text: "我只是觉得“先试试”，具体多久、怎么判断并不清楚" },
      { id: 'D', text: "我还没有认真想过这件事，更多是走一步看一步" }
    ]
  },
  {
    id: 19,
    section: "五、离职后的结构与可执行性",
    sectionId: 'structure',
    text: "你的离职后计划，对家庭成员来说是：",
    options: [
      { id: 'A', text: "清楚、可解释、可理解" },
      { id: 'B', text: "大致能说明" },
      { id: 'C', text: "难以解释清楚" },
      { id: 'D', text: "连自己都说不清" }
    ]
  },
  {
    id: 20,
    section: "五、离职后的结构与可执行性",
    sectionId: 'structure',
    text: "当你把 情绪、风险、家庭、现实 全部纳入考虑后，你对离职的判断是：",
    options: [
      { id: 'A', text: "这是经过权衡的路径调整" },
      { id: 'B', text: "有风险，但在可控范围内" },
      { id: 'C', text: "风险明显，但想赌一把" },
      { id: 'D', text: "更多是想逃离现状" }
    ]
  }
];

export const RESULTS: Record<ResultType, ResultContent> = {
  HIGH_RISK: {
    title: "暂不适合离职（高风险）",
    scoreRange: "总分 ≥38 或 关键指标高风险",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    description: [
      "现在离职，对你来说不是一个合适的选择。",
      "你的回答里，至少有一部分现实条件已经在发出警告：情绪还在影响判断，或者家庭与后果你暂时承受不起，又或者下一步并没有形成真正可执行的结构。在这种状态下，离职并不会让问题消失，只是把它们从一个相对稳定的环境，推向一个更暴露的位置。",
      "这并不是否定你想改变的念头，而是承认一个事实：时间点不站在你这边。如果现在走，你很可能会在短期内获得解脱感，但随后面对的是更集中的不确定性、更少的缓冲空间，以及更难回头的处境。",
      "结论很明确：此刻离职，风险明显高于它可能带来的收益。"
    ]
  },
  PREPARATION_NEEDED: {
    title: "需要准备期（条件未成熟）",
    scoreRange: "总分 22-37",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: [
      "你的判断方向并没有错，只是还没到执行的时刻。",
      "你已经清楚地意识到，继续原地不动正在消耗你，但与此同时，你也看得见，如果现在立刻离职，很多变量会失去控制。你的问题不在于犹豫，而在于你正处在一个“必须降低不确定性”的阶段。",
      "准备期的意义，并不是拖延，而是把模糊的想法变成可以被检验的现实：哪些路径真的站得住，哪些只是情绪出口；哪些风险可以被提前吸收，哪些必须被明确避开。没有这个过程，离职很容易从一次选择，变成被动应对。",
      "结论是：现在不该马上离职，但这个阶段不应被浪费。"
    ]
  },
  STRATEGIC_RESIGNATION: {
    title: "可考虑战略性离职",
    scoreRange: "总分 ≤21",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description: [
      "在你当前的条件下，离职是一项你有能力承担后果的决定。",
      "你的回答显示，你对现实约束有清醒认知，对最坏情况也有心理预期。这意味着，你不是在用离职逃避问题，而是在尝试切换路径。即使结果不完全符合设想，你也有调整空间，而不是被一次选择彻底锁死。",
      "需要提醒的是，真正的风险并不在“离职那一刻”，而在离职之后的执行阶段：是否能按原有节奏推进，是否会在短期波动中推翻理性判断，是否会因为压力而偏离既定边界。",
      "这个结论并不是鼓励，而是确认：这一步不是孤注一掷，而是一场有准备的转向。"
    ]
  }
};