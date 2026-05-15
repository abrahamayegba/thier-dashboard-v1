'use client'

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { baseData } from '@/lib/dashboard-data'
import ChartCard from '../ChartCard'

interface OverviewTabProps {
  funnel: { eligible: number; registered: number; first_meal_logged: number; sustained_engagement: number }
}

// THIER colour scheme
const FUNNEL_PALETTE = ['#301934', '#9E2C6A', '#800080', '#353A3E', '#757575', '#BFBFBF']
const PIE_COLORS = ['#301934', '#9E2C6A', '#800080', '#1A1A1A', '#353A3E', '#757575']

const funnelSteps = (funnel: OverviewTabProps['funnel']) => [
  { label: 'Eligible', value: funnel.eligible },
  { label: 'Registered', value: funnel.registered },
  { label: 'First Meal', value: funnel.first_meal_logged },
  { label: 'Sustained', value: funnel.sustained_engagement },
]

const jobRoleData = Object.entries(baseData.jobRoleDistribution).map(([name, value]) => ({ name, value }))

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
  cursor: { fill: 'rgba(33,128,141,0.05)' },
}

const axisStyle = { fontSize: 11, fill: '#626C71' }

export default function OverviewTab({ funnel }: OverviewTabProps) {
  const funnelData = funnelSteps(funnel)

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: funnel + job role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Participant Engagement Funnel">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ ...axisStyle, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(v: number) => [v.toLocaleString() + ' employees', '']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {funnelData.map((_, i) => (
                    <Cell key={i} fill={FUNNEL_PALETTE[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Participation by Job Role">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jobRoleData}
                  cx="45%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {jobRoleData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle.contentStyle}
                  labelStyle={tooltipStyle.labelStyle}
                  formatter={(v: number, name: string) => [`${v}%`, name]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: '#626C71' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Row 2: 12-month trends */}
      <ChartCard title="Diet Quality Trends (12-Month)">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={baseData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#626C71' }} />
              <Line type="monotone" dataKey="upf" name="UPF %" stroke="#301934" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="sugar" name="Added Sugar (g)" stroke="#800080" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="fiber" name="Fiber (g)" stroke="#9E2C6A" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Row 3: dept + office */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Top Performing Departments (Life Score™)">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={baseData.departmentPerformance.slice(0, 5)} layout="vertical" barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 150]}
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ ...axisStyle, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(v: number) => [`${v}/150`, 'Life Score™']}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {baseData.departmentPerformance.slice(0, 5).map((d, i) => (
                    <Cell key={i} fill={d.score > 90 ? '#301934' : d.score > 80 ? '#9E2C6A' : '#800080'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top Offices by Lowest UPF %">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={baseData.officePerformance} layout="vertical" barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 50]}
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ ...axisStyle, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(v: number) => [`${v}%`, 'UPF Ratio']}
                />
                <Bar dataKey="upf" radius={[0, 6, 6, 0]}>
                  {baseData.officePerformance.map((d, i) => (
                    <Cell key={i} fill={d.upf < 34 ? '#353A3E' : d.upf < 38 ? '#757575' : '#BFBFBF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
