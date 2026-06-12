import { LucideInbox, LucideInfo } from 'lucide-react'

export default function InboxPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          Inbox Capture
        </h1>
        <p className="text-slate-400 text-sm">
          Unified capture area for all tasks, notes, ideas, and requests.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 text-sm flex items-start space-x-3 max-w-3xl">
        <LucideInfo className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-slate-200">Phase 3 Feature Preview</p>
          <p className="text-slate-400 leading-relaxed text-xs">
            Inbox capture form, validation logic, lists, and realtime subscription updates will be implemented in Phase 3. Database dependencies will be prepared in Phase 2.
          </p>
        </div>
      </div>

      {/* Mock Placeholder UI for form */}
      <div className="max-w-3xl p-6 rounded-xl bg-slate-900/20 border border-slate-800/60 border-dashed flex flex-col items-center justify-center py-16 text-center">
        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <LucideInbox className="h-5 w-5 text-slate-500" />
        </div>
        <h3 className="font-display font-semibold text-slate-300 mb-1">No Inbox Items Yet</h3>
        <p className="text-slate-500 text-xs max-w-sm">
          Once database is set up and inbox form is built, you will be able to capture items instantaneously.
        </p>
      </div>
    </div>
  )
}
