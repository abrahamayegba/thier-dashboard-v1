'use client'

import { RotateCcw } from 'lucide-react'
import { Filters, defaultFilters } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const filterDefs: Array<{ key: keyof Filters; label: string; options: { value: string; label: string }[] }> = [
  {
    key: 'office',
    label: 'Office',
    options: [
      { value: 'all', label: 'All Offices' },
      { value: 'Athea', label: 'Athea' },
      { value: 'Artemis', label: 'Artemis' },
      { value: 'Demeter', label: 'Demeter' },
      { value: 'Hera', label: 'Hera' },
      { value: 'Aphrodite', label: 'Aphrodite' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    options: [
      { value: 'all', label: 'All Departments' },
      { value: 'HR', label: 'HR' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Sales', label: 'Sales' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Production', label: 'Production' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Engineering', label: 'Engineering' },
    ],
  },
  {
    key: 'staff',
    label: 'Staff Type',
    options: [
      { value: 'all', label: 'All Staff' },
      { value: 'Frontline Staff', label: 'Frontline' },
      { value: 'Office-Based Staff', label: 'Office-Based' },
      { value: 'Management and Executive', label: 'Management' },
    ],
  },
  {
    key: 'disease',
    label: 'Disease',
    options: [
      { value: 'all', label: 'All' },
      { value: 'Obesity', label: 'Obesity' },
      { value: 'Type II Diabetes', label: 'Type II Diabetes' },
      { value: 'Heart Disease', label: 'Heart Disease' },
    ],
  },
  {
    key: 'gender',
    label: 'Gender',
    options: [
      { value: 'all', label: 'All' },
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Non Binary', label: 'Non Binary' },
    ],
  },
  {
    key: 'risk',
    label: 'Risk',
    options: [
      { value: 'all', label: 'All' },
      { value: 'High', label: 'High' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Low', label: 'Low' },
    ],
  },
  {
    key: 'age',
    label: 'Age',
    options: [
      { value: 'all', label: 'All Ages' },
      { value: '20-29', label: '20–29' },
      { value: '30-39', label: '30–39' },
      { value: '40-49', label: '40–49' },
      { value: '50-59', label: '50–59' },
    ],
  },
  {
    key: 'daterange',
    label: 'Date Range',
    options: [
      { value: '90', label: '90 days' },
      { value: '30', label: '30 days' },
      { value: '60', label: '60 days' },
    ],
  },
]

const isFilterActive = (key: keyof Filters, value: string) =>
  key === 'daterange' ? value !== '90' : value !== 'all'

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const activeCount = Object.entries(filters).filter(([k, v]) =>
    isFilterActive(k as keyof Filters, v)
  ).length

  function handleChange(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value })
  }

  function reset() {
    onChange({ ...defaultFilters })
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      {filterDefs.map(({ key, label, options }) => {
        const active = isFilterActive(key, filters[key])
        return (
          <div key={key} className="flex flex-col gap-1 min-w-0">
            <label className="text-[11px] font-medium text-white/50 uppercase tracking-wide leading-none">
              {label}
            </label>
            <Select
              value={filters[key]}
              onValueChange={(val) => handleChange(key, val)}
            >
              <SelectTrigger
                size="sm"
                className={cn(
                  'text-xs font-medium transition-colors min-w-0',
                  'bg-white/8 border-white/15 text-white/80 hover:bg-white/12 hover:border-white/25',
                  'focus-visible:ring-[#32B8C6]/40 focus-visible:border-[#32B8C6]',
                  active && 'border-[#32B8C6] text-[#32B8C6] bg-[rgba(50,184,198,0.12)]'
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2E3030] border-white/15 text-white/90">
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs text-white/80 focus:bg-[rgba(50,184,198,0.15)] focus:text-[#32B8C6]"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      })}

      <button
        onClick={reset}
        disabled={activeCount === 0}
        className={cn(
          'h-8 flex items-center gap-1.5 px-3 rounded-md text-xs font-medium border transition-all self-end',
          activeCount > 0
            ? 'border-[#32B8C6] text-[#32B8C6] bg-[rgba(50,184,198,0.1)] hover:bg-[rgba(50,184,198,0.18)]'
            : 'border-white/15 text-white/30 opacity-50 cursor-not-allowed'
        )}
      >
        <RotateCcw size={12} />
        Reset
        {activeCount > 0 && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#32B8C6] text-[#1F2121] text-[10px] font-bold leading-none">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  )
}
