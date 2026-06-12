import { LucideSettings, LucideInfo } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          Settings
        </h1>
        <p className="text-slate-400 text-sm">
          Manage your account, preferences, and daily digest schedules.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 text-sm flex items-start space-x-3 max-w-3xl">
        <LucideInfo className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-slate-200">Phase 9 Feature Preview</p>
          <p className="text-slate-400 leading-relaxed text-xs">
            User timezone configuration, notification triggers, and OpenRouter API preferences settings will be functional in Phase 9.
          </p>
        </div>
      </div>

      <div className="max-w-3xl p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <LucideSettings className="w-4 h-4 text-indigo-400" />
          <span>General Settings</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider block mb-2">Daily Digest Trigger Time</label>
            <input 
              type="text" 
              disabled 
              value="07:00 UTC (Default)" 
              className="bg-slate-950/60 border border-slate-800 text-slate-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" 
            />
          </div>
          <div>
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider block mb-2">Database Encryption</label>
            <input 
              type="text" 
              disabled 
              value="Row Level Security Enabled" 
              className="bg-slate-950/60 border border-slate-800 text-slate-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
