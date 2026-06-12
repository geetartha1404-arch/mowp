import { LucideFileText, LucideInfo } from 'lucide-react'

export default function ReviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          Weekly Review
        </h1>
        <p className="text-slate-400 text-sm">
          Auto-generated weekly review briefs and completion statistics.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 text-sm flex items-start space-x-3 max-w-3xl">
        <LucideInfo className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-slate-200">Phase 7 Feature Preview</p>
          <p className="text-slate-400 leading-relaxed text-xs">
            Weekly reviews generated automatically every Sunday by Gemini will be displayed here, complete with improvement suggestions and completion metrics.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 max-w-3xl space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <LucideFileText className="w-4 h-4 text-cyan-400" />
          <span>Last Weekly Review: None</span>
        </div>
        <h3 className="font-display text-xl font-bold text-slate-200">Weekly Reviews are generated every Sunday at 18:00</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          The cron scheduler will compile your weekly achievements, identify slips, and suggest improvements once you have active tasks.
        </p>
      </div>
    </div>
  )
}
