'use client'

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area,
} from 'recharts'
import { baseData } from '@/lib/dashboard-data'
import ChartCard from '../ChartCard'
import InsightCard from '../InsightCard'

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

const qualityData = baseData.trendsData.months18.map((month, i) => ({
  month,
  lifeScore: baseData.trendsData.lifeScore[i],
  engagement: baseData.trendsData.engagement[i],
}))

const macroData = baseData.monthlyTrends.map((d, i) => ({
  month: d.month,
  carbs: Math.round(baseData.trendsData.carbs[i] * 10) / 10,
  fat: Math.round(baseData.trendsData.fat[i] * 10) / 10,
  protein: Math.round(baseData.trendsData.protein[i] * 10) / 10,
}))

const seasonalData = [
  { quarter: 'Q1', sugar: baseData.trendsData.seasonal.sugar[0], upf: baseData.trendsData.seasonal.upf[0] },
  { quarter: 'Q2', sugar: baseData.trendsData.seasonal.sugar[1], upf: baseData.trendsData.seasonal.upf[1] },
  { quarter: 'Q3', sugar: baseData.trendsData.seasonal.sugar[2], upf: baseData.trendsData.seasonal.upf[2] },
  { quarter: 'Q4', sugar: baseData.trendsData.seasonal.sugar[3], upf: baseData.trendsData.seasonal.upf[3] },
]

const yoyData = [
  { metric: 'Fiber Intake', growth: 12 },
  { metric: 'UPF Decrease', growth: 5 },
  { metric: 'Life Score™', growth: 8 },
  { metric: 'Engagement', growth: 15 },
]

export default function TrendsTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Diet Quality vs. Engagement (18-Month)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" />
                <XAxis
                  dataKey="month"
                  tick={{ ...axisStyle, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <YAxis
                  yAxisId="left"
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  label={{ value: 'Life Score', angle: -90, position: 'insideLeft', offset: 8, fontSize: 10, fill: '#626C71' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                  tickFormatter={(v) => `${v}%`}
                  label={{ value: 'Engagement', angle: 90, position: 'insideRight', offset: 8, fontSize: 10, fill: '#626C71' }}
                />
                <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#626C71' }} />
                <Line yAxisId="left" type="monotone" dataKey="lifeScore" name="Life Score™" stroke="#32B8C6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="engagement" name="Engagement %" stroke="#21808D" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Macronutrient Distribution Trend">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={macroData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} formatter={(v: number) => [`${v}%`]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#626C71' }} />
                <Area type="monotone" dataKey="carbs" name="Carbohydrates %" stroke="#32B8C6" fill="rgba(50,184,198,0.12)" strokeWidth={2} />
                <Area type="monotone" dataKey="fat" name="Fat %" stroke="#E68161" fill="rgba(230,129,97,0.12)" strokeWidth={2} />
                <Area type="monotone" dataKey="protein" name="Protein %" stroke="#21808D" fill="rgba(33,128,141,0.12)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Seasonal Impact on Nutrition">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonalData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" vertical={false} />
                <XAxis dataKey="quarter" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#626C71' }} />
                <Bar dataKey="sugar" name="Avg. Added Sugar (g)" radius={[4, 4, 0, 0]}>
                  {seasonalData.map((d, i) => (
                    <Cell key={i} fill={d.sugar > 50 ? '#FF5459' : d.sugar > 42 ? '#E68161' : '#32B8C6'} />
                  ))}
                </Bar>
                <Bar dataKey="upf" name="UPF Ratio %" radius={[4, 4, 0, 0]}>
                  {seasonalData.map((d, i) => (
                    <Cell key={i} fill={d.upf > 40 ? '#E68161' : d.upf > 36 ? '#21808D' : '#32B8C6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Year-over-Year Growth Comparison">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yoyData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" vertical={false} />
                <XAxis dataKey="metric" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  tickFormatter={(v) => `${v}%`}
                  label={{ value: 'Growth %', angle: -90, position: 'insideLeft', offset: 8, fontSize: 10, fill: '#626C71' }}
                />
                <Tooltip
                  contentStyle={tooltipStyle.contentStyle}
                  labelStyle={tooltipStyle.labelStyle}
                  formatter={(v: number) => [`+${v}%`, 'YoY Growth']}
                />
                <Bar dataKey="growth" name="YoY Growth %" radius={[6, 6, 0, 0]}>
                  {yoyData.map((_, i) => (
                    <Cell key={i} fill={['#32B8C6', '#21808D', '#1D7480', '#777C7C'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <InsightCard title="Key Findings: Trends Analysis">
        UPF consumption is down 5% YoY but consistently spikes 15% in Q4, suggesting a need for a pre-holiday
        wellness initiative. Engagement drives a 0.89 correlation with Life Score™ improvement. Recommend launching
        a &ldquo;Mindful Holiday Eating&rdquo; program in early November to mitigate seasonal regression.
      </InsightCard>
    </div>
  )
}
