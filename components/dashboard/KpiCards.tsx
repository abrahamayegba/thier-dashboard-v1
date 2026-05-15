import { TrendingUp, TrendingDown } from 'lucide-react'
import { getKpiThreshold } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

interface KpiData {
  upf_consumption_ratio: number
  avg_daily_sugar: number
  avg_daily_fiber: number
  program_engagement_rate: number
  company_life_score: number
}

const kpiDefs = [
  {
    key: 'upf_consumption_ratio' as keyof KpiData,
    type: 'upf',
    label: 'UPF Consumption Ratio',
    unit: '%',
    trend: { label: '2.3% from last period', direction: 'down' as const },
    description: 'Ultra-processed food intake',
  },
  {
    key: 'avg_daily_sugar' as keyof KpiData,
    type: 'sugar',
    label: 'Avg. Daily Added Sugar',
    unit: 'g',
    trend: { label: '3.1g from last period', direction: 'down' as const },
    description: 'Added sugar per day',
  },
  {
    key: 'avg_daily_fiber' as keyof KpiData,
    type: 'fiber',
    label: 'Avg. Daily Fiber',
    unit: 'g',
    trend: { label: '2.5g from last period', direction: 'up' as const },
    description: 'Dietary fiber per day',
  },
  {
    key: 'program_engagement_rate' as keyof KpiData,
    type: 'engagement',
    label: 'Program Engagement',
    unit: '%',
    trend: { label: '5.2% from last period', direction: 'up' as const },
    description: 'Active participant rate',
  },
  {
    key: 'company_life_score' as keyof KpiData,
    type: 'lifescore',
    label: 'Company Life Score™',
    unit: '/150',
    trend: { label: '8 pts from last period', direction: 'up' as const },
    description: 'Holistic wellness index',
  },
]

const thresholdStyles = {
  good: {
    badge: 'bg-[rgba(53,58,62,0.15)] text-[#353A3E]',
    dot: 'bg-[#353A3E]',
  },
  warning: {
    badge: 'bg-[rgba(191,191,191,0.2)] text-[#757575]',
    dot: 'bg-[#BFBFBF]',
  },
  danger: {
    badge: 'bg-[rgba(117,117,117,0.15)] text-[#757575]',
    dot: 'bg-[#757575]',
  },
}

interface KpiCardsProps {
  data: KpiData
}

export default function KpiCards({ data }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {kpiDefs.map((kpi) => {
        const value = data[kpi.key]
        const threshold = getKpiThreshold(value, kpi.type)
        const styles = thresholdStyles[threshold]
        const isPositiveTrend =
          (kpi.trend.direction === 'down' && (kpi.type === 'upf' || kpi.type === 'sugar')) ||
          (kpi.trend.direction === 'up' && (kpi.type === 'fiber' || kpi.type === 'engagement' || kpi.type === 'lifescore'))

        return (
          <div
            key={kpi.key}
            className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3 hover:border-[rgba(158,44,106,0.4)] transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground leading-tight text-balance">
                {kpi.label}
              </p>
              <span className={cn('shrink-0 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full', styles.badge)}>
                <span className={cn('w-1.5 h-1.5 rounded-full', styles.dot)} />
                {threshold}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
                  {value}
                </span>
                <span className="text-sm font-medium text-muted-foreground ml-0.5">{kpi.unit}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.description}</p>
            </div>

            <div
              className={cn(
                'flex items-center gap-1 text-[11px] font-medium',
                isPositiveTrend ? 'text-[#301934]' : 'text-[#757575]'
              )}
            >
              {kpi.trend.direction === 'up' ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              <span>
                {kpi.trend.direction === 'up' ? '+' : '-'}{kpi.trend.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
