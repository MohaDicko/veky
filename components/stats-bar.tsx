"use client"

import { useInView } from "@/hooks/use-in-view"
import { useCountUp } from "@/hooks/use-count-up"
import { useLanguage } from "@/lib/i18n/context"

const statValues = [250, 12, 98, 5]
const statSuffixes = ["+", "", "%", "+"]

function StatItem({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, 2000, inView)
  return (
    <div className="flex flex-col items-center text-center group">
      <span className="text-5xl sm:text-6xl font-bold text-foreground tabular-nums group-hover:text-primary transition-colors duration-300">
        {count}{suffix}
      </span>
      <span className="mt-2 text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground">{label}</span>
    </div>
  )
}

export function StatsBar() {
  const { ref, inView } = useInView(0.3)
  const { t } = useLanguage()
  const labels = [t.stats.s1, t.stats.s2, t.stats.s3, t.stats.s4]

  return (
    <section aria-label="Statistiques clés" ref={ref as React.RefObject<HTMLElement>} className="py-16 border-y border-border/40 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {labels.map((label, i) => (
            <StatItem key={i} value={statValues[i]} suffix={statSuffixes[i]} label={label} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
