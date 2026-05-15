export type Filters = {
  office: string
  department: string
  staff: string
  disease: string
  gender: string
  risk: string
  age: string
  daterange: string
}

export const defaultFilters: Filters = {
  office: 'all',
  department: 'all',
  staff: 'all',
  disease: 'all',
  gender: 'all',
  risk: 'all',
  age: 'all',
  daterange: '90',
}

export const baseData = {
  kpis: {
    upf_consumption_ratio: 38,
    avg_daily_sugar: 45,
    avg_daily_fiber: 18,
    program_engagement_rate: 62,
    company_life_score: 72,
  },
  funnel: {
    eligible: 5000,
    registered: 3100,
    first_meal_logged: 2850,
    sustained_engagement: 2100,
  },
  jobRoleDistribution: {
    Engineering: 28,
    Sales: 22,
    Production: 18,
    HR: 12,
    Marketing: 10,
    Operations: 10,
  },
  monthlyTrends: [
    { month: 'Jan', upf: 42, sugar: 48, fiber: 16 },
    { month: 'Feb', upf: 41, sugar: 47, fiber: 16.5 },
    { month: 'Mar', upf: 40, sugar: 46, fiber: 17 },
    { month: 'Apr', upf: 39, sugar: 46, fiber: 17 },
    { month: 'May', upf: 39, sugar: 45, fiber: 17.5 },
    { month: 'Jun', upf: 38, sugar: 45, fiber: 17.5 },
    { month: 'Jul', upf: 37, sugar: 44, fiber: 18 },
    { month: 'Aug', upf: 37, sugar: 44, fiber: 18 },
    { month: 'Sep', upf: 36, sugar: 43, fiber: 18.5 },
    { month: 'Oct', upf: 38, sugar: 45, fiber: 18 },
    { month: 'Nov', upf: 38, sugar: 45, fiber: 18 },
    { month: 'Dec', upf: 45, sugar: 52, fiber: 15 },
  ],
  departmentPerformance: [
    { name: 'Engineering', score: 98, upf: 32 },
    { name: 'Sales', score: 92, upf: 44 },
    { name: 'Marketing', score: 88, upf: 36 },
    { name: 'HR', score: 85, upf: 35 },
    { name: 'Operations', score: 82, upf: 41 },
    { name: 'Production', score: 80, upf: 39 },
  ],
  officePerformance: [
    { name: 'Artemis', upf: 32 },
    { name: 'Hera', upf: 35 },
    { name: 'Athea', upf: 37 },
    { name: 'Demeter', upf: 39 },
    { name: 'Aphrodite', upf: 41 },
  ],
  initiativeImpact: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    upf: [42, 41, 40, 38, 36, 34, 32, 33, 34, 35, 36, 37],
    lifeScore: [65, 66, 68, 70, 73, 76, 78, 77, 75, 74, 73, 72],
  },
  initiatives: [
    {
      title: 'Q3: Eat Well, Sleep Well Challenge',
      participants: '1,850',
      completionRate: '68%',
      duration: '78 days',
      upfImpact: '-12%',
      lifeScoreUplift: '+15 pts',
    },
    {
      title: 'Q2: Fiber Focus Week',
      participants: '2,200',
      completionRate: '82%',
      duration: '7 days',
      upfImpact: '-5%',
      lifeScoreUplift: '+8 pts',
    },
    {
      title: 'Q1: Sugar Awareness Month',
      participants: '1,650',
      completionRate: '71%',
      duration: '28 days',
      upfImpact: '-8%',
      lifeScoreUplift: '+11 pts',
    },
  ],
  cohortData: {
    Jan: [88, 85, 82, 78, 75, 72, 68, 65, 62, 58, 55, 52],
    Feb: [90, 87, 84, 80, 77, 74, 70, 67, 64, 60, 57, 54],
    Mar: [89, 86, 83, 79, 76, 73, 69, 66, 63, 59, 56, 53],
    Apr: [85, 82, 79, 75, 72, 69, 65, 62, 59, 55, 52, 49],
    May: [87, 84, 81, 77, 74, 71, 67, 64, 61, 57, 54, 51],
    Jun: [86, 83, 80, 76, 73, 70, 66, 63, 60, 56, 53, 50],
    Jul: [62, 59, 56, 52, 49, 46, 42, 39, 36, 32, 29, 26],
    Aug: [64, 61, 58, 54, 51, 48, 44, 41, 38, 34, 31, 28],
    Sep: [84, 81, 78, 74, 71, 68, 64, 61, 58, 54, 51, 48],
    Oct: [83, 80, 77, 73, 70, 67, 63, 60, 57, 53, 50, 47],
    Nov: [82, 79, 76, 72, 69, 66, 62, 59, 56, 52, 49, 46],
    Dec: [81, 78, 75, 71, 68, 65, 61, 58, 55, 51, 48, 45],
  } as Record<string, number[]>,
  generationEngagement: {
    'Gen Z': {
      values: [75, 68, 72, 78, 82, 85, 88, 90, 87, 84, 81, 79],
      campaigns: ['Sugar Awareness Month', 'None', 'None', 'Fiber Focus Week', 'None', 'None', 'Eat Well Challenge', 'Eat Well Challenge', 'Eat Well Challenge', 'None', 'None', 'None'],
    },
    Millennials: {
      values: [82, 84, 86, 88, 87, 85, 83, 81, 84, 86, 88, 90],
      campaigns: ['Sugar Awareness Month', 'None', 'None', 'Fiber Focus Week', 'None', 'None', 'Eat Well Challenge', 'Eat Well Challenge', 'Eat Well Challenge', 'None', 'None', 'None'],
    },
    'Gen X': {
      values: [78, 80, 79, 77, 75, 73, 71, 69, 72, 74, 76, 78],
      campaigns: ['Sugar Awareness Month', 'None', 'None', 'Fiber Focus Week', 'None', 'None', 'Eat Well Challenge', 'Eat Well Challenge', 'Eat Well Challenge', 'None', 'None', 'None'],
    },
    'Baby Boomers': {
      values: [65, 67, 69, 71, 73, 75, 77, 79, 76, 74, 72, 70],
      campaigns: ['Sugar Awareness Month', 'None', 'None', 'Fiber Focus Week', 'None', 'None', 'Eat Well Challenge', 'Eat Well Challenge', 'Eat Well Challenge', 'None', 'None', 'None'],
    },
  } as Record<string, { values: number[]; campaigns: string[] }>,
  trendsData: {
    months18: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    lifeScore: [65, 66, 68, 69, 70, 71, 72, 73, 74, 73, 72, 68, 70, 71, 73, 74, 75, 76],
    engagement: [40, 42, 45, 47, 50, 52, 55, 56, 58, 59, 60, 58, 60, 61, 63, 64, 65, 66],
    carbs: Array(12).fill(55).map((v, i) => v + Math.sin(i) * 2),
    fat: Array(12).fill(30).map((v, i) => v + Math.cos(i) * 1.5),
    protein: Array(12).fill(15).map((v, i) => v + Math.sin(i * 0.5) * 1),
    seasonal: { sugar: [42, 40, 39, 52], upf: [36, 35, 34, 45] },
    yoy: [12, 5, 8, 15],
  },
}

// Stable per-filter-key offsets so values are deterministic (no Math.random at render time)
const FILTER_OFFSETS: Record<string, number> = {
  office: 0.03, department: -0.04, staff: 0.02, disease: -0.05,
  gender: 0.01, risk: -0.03, age: 0.04, daterange: 0,
}

export function applyFilters(filters: Filters) {
  const filterCount = Object.values(filters).filter((v) => v !== 'all' && v !== '90').length
  const factor = 1 - filterCount * 0.07

  // Deterministic offset based on active filter keys — no Math.random()
  const offset = Object.entries(filters)
    .filter(([, v]) => v !== 'all' && v !== '90')
    .reduce((acc, [k]) => acc + (FILTER_OFFSETS[k] ?? 0), 0)

  return {
    ...baseData,
    kpis: {
      upf_consumption_ratio: Math.max(20, Math.round(baseData.kpis.upf_consumption_ratio * (1 + offset * 0.5))),
      avg_daily_sugar: Math.max(20, Math.round(baseData.kpis.avg_daily_sugar * (1 + offset * 0.4))),
      avg_daily_fiber: Math.max(10, Math.round(baseData.kpis.avg_daily_fiber * (1 - offset * 0.3))),
      program_engagement_rate: Math.max(30, Math.round(baseData.kpis.program_engagement_rate * factor)),
      company_life_score: Math.max(40, Math.round(baseData.kpis.company_life_score * (1 - offset * 0.2))),
    },
    funnel: {
      eligible: Math.round(baseData.funnel.eligible * factor),
      registered: Math.round(baseData.funnel.registered * factor),
      first_meal_logged: Math.round(baseData.funnel.first_meal_logged * factor),
      sustained_engagement: Math.round(baseData.funnel.sustained_engagement * factor),
    },
  }
}

export function getKpiThreshold(value: number, type: string): 'good' | 'warning' | 'danger' {
  if (type === 'upf') return value < 30 ? 'good' : value > 40 ? 'danger' : 'warning'
  if (type === 'sugar') return value < 25 ? 'good' : value > 50 ? 'danger' : 'warning'
  if (type === 'fiber') return value > 25 ? 'good' : value < 15 ? 'danger' : 'warning'
  if (type === 'engagement') return value > 70 ? 'good' : value < 50 ? 'danger' : 'warning'
  if (type === 'lifescore') return value > 80 ? 'good' : value < 60 ? 'danger' : 'warning'
  return 'warning'
}

export function getRetentionColor(value: number): string {
  if (value >= 85) return '#353A3E'   // Good
  if (value >= 70) return '#9E2C6A'   // Highlight
  if (value >= 55) return '#BFBFBF'   // Warning
  if (value >= 40) return '#757575'   // Danger
  return '#1A1A1A'                    // Critical
}
