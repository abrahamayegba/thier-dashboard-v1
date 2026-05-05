'use client'

import { useState, useMemo } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import FilterBar from '@/components/dashboard/FilterBar'
import KpiCards from '@/components/dashboard/KpiCards'
import OverviewTab from '@/components/dashboard/tabs/OverviewTab'
import InitiativeTab from '@/components/dashboard/tabs/InitiativeTab'
import CohortTab from '@/components/dashboard/tabs/CohortTab'
import DemographicsTab from '@/components/dashboard/tabs/DemographicsTab'
import TrendsTab from '@/components/dashboard/tabs/TrendsTab'
import { defaultFilters, applyFilters, type Filters } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'initiative' | 'cohort' | 'demographics' | 'trends'

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'initiative', label: 'Initiative Impact' },
  { id: 'cohort', label: 'Cohort Retention' },
  { id: 'demographics', label: 'Demographics' },
  { id: 'trends', label: 'Trends' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const filteredData = useMemo(() => applyFilters(filters), [filters])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main area */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Header */}
        <header className="bg-[#262828] border-b border-white/10 px-6 pt-7 pb-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">DataHubPro Dashboard</h1>
              <p className="text-xs text-white/40 mt-0.5">Tracking Whole Foods vs. Ultra-Processed Foods</p>
            </div>
            <span className="text-[11px] font-medium text-white/30 border border-white/10 rounded-full px-2.5 py-1">
              Last updated: today
            </span>
          </div>
          <FilterBar filters={filters} onChange={setFilters} />
        </header>

        {/* Tab navigation */}
        <nav
          className="sticky top-0 z-10 bg-[#1F2121] border-b border-white/10 flex gap-0 px-6 overflow-x-auto"
          aria-label="Dashboard sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={cn(
                'px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px',
                activeTab === tab.id
                  ? 'border-[#32B8C6] text-[#32B8C6]'
                  : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main id="main-content" className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              <KpiCards data={filteredData.kpis} />
              <OverviewTab funnel={filteredData.funnel} />
            </div>
          )}
          {activeTab === 'initiative' && <InitiativeTab />}
          {activeTab === 'cohort' && <CohortTab />}
          {activeTab === 'demographics' && <DemographicsTab />}
          {activeTab === 'trends' && <TrendsTab />}
        </main>
      </div>
    </div>
  )
}
