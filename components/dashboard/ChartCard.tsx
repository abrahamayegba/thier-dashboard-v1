import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <div className={cn('bg-card rounded-xl border border-border p-5 flex flex-col gap-4', className)}>
      <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  )
}
