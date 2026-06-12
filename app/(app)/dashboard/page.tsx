import { LucideSparkles, LucideTrendingUp, LucideInfo } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title & Welcome */}
      <div className="flex flex-col space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm">
          Welcome to your work management workspace. Your morning briefing will appear here.
        </p>
      </div>

      {/* Warning/Info alert about empty database / Phase 0 status */}
      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 text-sm flex items-start space-x-3 max-w-3xl">
        <LucideInfo className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-slate-200">Phase 0 Integration Complete</p>
          <p className="text-slate-400 leading-relaxed text-xs">
            Supabase client & server context, cookie session persistence, route middleware, and authentication loops are fully functional. Database migrations (tables, RLS policies) will be deployed in Phase 2.
          </p>
        </div>
      </div>

      {/* Grid Layout Mockups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Today's Focus */}
        <div className="md:col-span-2 p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <LucideSparkles className="w-4 h-4 text-cyan-400" />
              <span>Today&apos;s Focus Briefing</span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-100">
              Your day is being prepared
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Once you add work items in your inbox and database tables are created, the daily digest cron job will generate a tailored focus briefing right here.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500">
            <span>Last Updated: --</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Waiting for Phase 2</span>
          </div>
        </div>

        {/* Card 2: Quick Stats */}
        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-6">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <LucideTrendingUp className="w-4 h-4" />
            <span>Workspace Metrics</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
              <span className="text-slate-400 text-sm">Inbox Capture</span>
              <span className="font-mono text-sm font-semibold text-slate-200">0 items</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
              <span className="text-slate-400 text-sm">Planned Tasks</span>
              <span className="font-mono text-sm font-semibold text-slate-200">0 items</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
              <span className="text-slate-400 text-sm">Active In Progress</span>
              <span className="font-mono text-sm font-semibold text-slate-200">0 items</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400 text-sm">Completion Rate</span>
              <span className="font-mono text-sm font-semibold text-emerald-400">0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
