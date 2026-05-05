'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { baseData } from '@/lib/dashboard-data'
import ChartCard from '../ChartCard'
import { cn } from '@/lib/utils'

const chartData = baseData.initiativeImpact.labels.map((month, i) => ({
  month,
  upf: baseData.initiativeImpact.upf[i],
  lifeScore: baseData.initiativeImpact.lifeScore[i],
}))

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

export default function InitiativeTab() {
  return (
    <div className="flex flex-col gap-4">
      <ChartCard title="Initiative Impact Analysis: 12-Month Trend">
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(119,124,124,0.15)" />
              <ReferenceLine
                yAxisId="left"
                x="Jul"
                stroke="rgba(50,184,198,0.3)"
                strokeDasharray="4 2"
                label={{ value: 'Q3 Challenge', position: 'top', fontSize: 10, fill: '#32B8C6' }}
              />
              <ReferenceLine yAxisId="left" x="Sep" stroke="rgba(50,184,198,0.3)" strokeDasharray="4 2" />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                domain={[0, 50]}
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                width={32}
                label={{ value: 'UPF %', angle: -90, position: 'insideLeft', offset: 8, fontSize: 10, fill: '#626C71' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 150]}
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                width={40}
                label={{ value: 'Life Score™', angle: 90, position: 'insideRight', offset: 8, fontSize: 10, fill: '#626C71' }}
              />
              <Tooltip
                contentStyle={tooltipStyle.contentStyle}
                labelStyle={tooltipStyle.labelStyle}
                formatter={(v: number, name: string) => [
                  name === 'UPF %' ? `${v}%` : `${v}/150`,
                  name,
                ]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#626C71' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="upf"
                name="UPF %"
                stroke="#FF5459"
                strokeWidth={2}
                dot={{ r: 3, fill: '#FF5459' }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="lifeScore"
                name="Life Score™"
                stroke="#32B8C6"
                strokeWidth={2}
                dot={{ r: 3, fill: '#32B8C6' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Initiative cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {baseData.initiatives.map((initiative) => (
          <div key={initiative.title} className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 w-2 h-2 rounded-full bg-[#32B8C6] shrink-0" />
              <h4 className="text-sm font-semibold text-foreground leading-snug text-balance">
                {initiative.title}
              </h4>
            </div>
            <div className="flex flex-col gap-2 border-t border-border pt-3">
              {[
                { label: 'Participants', value: initiative.participants },
                { label: 'Completion Rate', value: initiative.completionRate },
                { label: 'Duration', value: initiative.duration },
                { label: 'UPF Reduction', value: initiative.upfImpact, positive: true },
                { label: 'Life Score™ Uplift', value: initiative.lifeScoreUplift, positive: true },
              ].map(({ label, value, positive }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className={cn('text-xs font-semibold', positive ? 'text-[#32B8C6]' : 'text-foreground')}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
