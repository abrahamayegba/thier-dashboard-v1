'use client'

import { useState } from 'react'
import { baseData, getRetentionColor } from '@/lib/dashboard-data'
import ChartCard from '../ChartCard'
import InsightCard from '../InsightCard'
import { cn } from '@/lib/utils'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const cohortMonths = Array.from({ length: 12 }, (_, i) => `M${i + 1}`)

const legend = [
  { label: '85–100% Good', color: '#353A3E' },
  { label: '70–84%', color: '#9E2C6A' },
  { label: '55–69% Warning', color: '#BFBFBF' },
  { label: '40–54%', color: '#757575' },
  { label: 'Below 40% Danger', color: '#1A1A1A' },
]

export default function CohortTab() {
  const [subTab, setSubTab] = useState<'cohort-tracking' | 'engagement-calendar'>('cohort-tracking')

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-tab navigation */}
      <div className="flex gap-1 p-1 bg-[#262828] border border-white/10 rounded-lg w-fit">
        {[
          { id: 'cohort-tracking', label: '12-Month Cohort Tracking' },
          { id: 'engagement-calendar', label: 'Engagement Calendar by Generation' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id as typeof subTab)}
            className={cn(
              'px-4 py-1.5 rounded-md text-xs font-medium transition-all',
              subTab === tab.id
                ? 'bg-[#9E2C6A] text-white shadow-sm font-semibold'
                : 'text-white/40 hover:text-white/70'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === 'cohort-tracking' && (
        <>
          <ChartCard title="12-Month Cohort Retention Heatmap">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-separate border-spacing-0.5">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-muted-foreground font-medium w-12">Cohort</th>
                    {cohortMonths.map((m) => (
                      <th key={m} className="text-center p-1 text-muted-foreground font-medium w-14">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(baseData.cohortData).map(([cohort, values]) => (
                    <tr key={cohort}>
                      <td className="p-2 font-semibold text-foreground whitespace-nowrap">{cohort}</td>
                      {values.map((v, i) => (
                        <td key={i} className="p-0">
                          <div
                            title={`${cohort} — M${i + 1}: ${v}%`}
                            className="rounded-md flex items-center justify-center h-9 text-white text-[11px] font-semibold cursor-default transition-transform hover:scale-105"
                            style={{ backgroundColor: getRetentionColor(v) }}
                          >
                            {v}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 pt-3 border-t border-border mt-2">
              {legend.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                  {label}
                </div>
              ))}
            </div>
          </ChartCard>

          <InsightCard title="Key Insight: Retention Analysis">
            Jan–Mar cohorts show highest retention at 88%, while Jul–Aug cohorts drop to 62% after 6 months.
            Summer onboarding may require additional support mechanisms to maintain engagement through autumn transition periods.
          </InsightCard>
        </>
      )}

      {subTab === 'engagement-calendar' && (
        <>
          <ChartCard title="Monthly Engagement Calendar Heatmap">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-separate border-spacing-0.5">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-muted-foreground font-medium w-24">Generation</th>
                    {months.map((m) => (
                      <th key={m} className="text-center p-1 text-muted-foreground font-medium">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(baseData.generationEngagement).map(([gen, data]) => (
                    <tr key={gen}>
                      <td className="p-2 font-semibold text-foreground whitespace-nowrap">{gen}</td>
                      {data.values.map((v, i) => (
                        <td key={i} className="p-0">
                          <div
                            title={`${gen} — ${months[i]}: ${v}% (${data.campaigns[i]})`}
                            className="rounded-md flex items-center justify-center h-9 text-white text-[11px] font-semibold cursor-default transition-transform hover:scale-105"
                            style={{ backgroundColor: getRetentionColor(v) }}
                          >
                            {v}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 pt-3 border-t border-border mt-2">
              {legend.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                  {label}
                </div>
              ))}
            </div>
          </ChartCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightCard title="Participation Trends">
              Gen Z shows 45% higher engagement on weekends, while Gen X engagement peaks mid-week.
              Baby Boomers maintain consistent patterns throughout the week with slight Monday peaks.
            </InsightCard>
            <InsightCard title="Key Insights">
              Launch Sunday challenges to capture Gen Z interest, projecting +30% engagement increase.
              Consider mid-week touchpoints for Gen X cohort to maximise program impact.
            </InsightCard>
          </div>
        </>
      )}
    </div>
  )
}
