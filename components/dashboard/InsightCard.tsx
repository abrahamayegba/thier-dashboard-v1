import { Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InsightCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function InsightCard({ title, children, className }: InsightCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[rgba(50,184,198,0.2)] bg-[rgba(50,184,198,0.06)] p-4 flex gap-3',
        className
      )}
    >
      <div className="shrink-0 w-7 h-7 rounded-lg bg-[rgba(50,184,198,0.15)] flex items-center justify-center mt-0.5">
        <Lightbulb size={14} className="text-[#32B8C6]" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
