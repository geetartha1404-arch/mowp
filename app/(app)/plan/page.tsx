import { LucideInfo } from 'lucide-react'

export default function PlanPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          Weekly Plan
        </h1>
        <p className="text-slate-400 text-sm">
          Plan your current week, allocate time, and update status.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 text-sm flex items-start space-x-3 max-w-3xl">
        <LucideInfo className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-slate-200">Phase 5 Feature Preview</p>
          <p className="text-slate-400 leading-relaxed text-xs">
            Interactive Kanban board layout supporting drag-and-drop column sorting (Inbox, Planned, In Progress, Done) will be built in Phase 5.
          </p>
        </div>
      </div>

      {/* Mock Kanban board visualization */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Inbox', 'Planned', 'In Progress', 'Done'].map((col) => (
          <div key={col} className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 min-h-[300px]">
            <h3 className="font-display font-bold text-sm text-slate-300 mb-4 pb-2 border-b border-slate-800/40">
              {col}
            </h3>
            <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800/40 rounded-lg text-slate-500 text-xs">
              <span>Empty column</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
