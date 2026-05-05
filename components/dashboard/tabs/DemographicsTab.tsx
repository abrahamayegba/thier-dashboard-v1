'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
} from 'recharts'
import ChartCard from '../ChartCard'
import InsightCard from '../InsightCard'

const dietByRoleData = [
  { name: 'Engineering', upf: 32, lifeScore: 98 },
  { name: 'Sales', upf: 44, lifeScore: 92 },
  { name: 'HR', upf: 35, lifeScore: 85 },
  { name: 'Operations', upf: 41, lifeScore: 82 },
  { name: 'Production', upf: 39, lifeScore: 80 },
]

const participationData = [
  { name: 'Office-Based', value: 78 },
  { name: 'Management', value: 71 },
  { name: 'Frontline', value: 52 },
]

const tooltipStyle = {
  contentStyle: {
    background: '#FFFFFF',
    border: '1px solid rgba(94,82,64,0.15)',
    borderRadius: 8,
    fontSize: 12,
    color: '#13343B',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  },
  labelStyle: { color: '#626C71' },
}

const axisStyle = { fontSize: 11, fill: '#626C71' }

export default function DemographicsTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Diet Quality by Job Role">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dietByRoleData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#626C71' }} />
                <Bar dataKey="upf" name="Avg. UPF Ratio %" radius={[4, 4, 0, 0]}>
                  {dietByRoleData.map((d, i) => (
                    <Cell key={i} fill={d.upf > 40 ? '#FF5459' : d.upf > 35 ? '#E68161' : '#32B8C6'} />
                  ))}
                </Bar>
                <Bar dataKey="lifeScore" name="Avg. Life Score™" fill="#21808D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Participation Rates Across Demographics">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationData} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[0, 100]}
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={tooltipStyle.contentStyle}
                  labelStyle={tooltipStyle.labelStyle}
                  formatter={(v: number) => [`${v}%`, 'Participation Rate']}
                />
                <Bar dataKey="value" name="Participation %" radius={[6, 6, 0, 0]}>
                  {participationData.map((d, i) => (
                    <Cell key={i} fill={d.value > 70 ? '#32B8C6' : d.value >= 50 ? '#21808D' : '#E68161'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <InsightCard title="Key Findings: Demographic Insights">
        Sales department shows highest UPF consumption (44%) but also high engagement (22% of total participants), making
        them prime intervention targets. Frontline staff engagement is 26% below office-based staff, suggesting
        accessibility or awareness barriers that require targeted outreach strategies.
      </InsightCard>
    </div>
  )
}
