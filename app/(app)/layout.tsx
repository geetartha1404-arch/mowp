import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/sidebar'

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans">
      {/* Sidebar for desktop */}
      <Sidebar userEmail={user.email} />

      {/* Main Content Area */}
      <div className="pl-64 min-h-screen flex flex-col">
        {/* Top Header bar if needed */}
        <header className="h-16 border-b border-slate-800/60 flex items-center px-8 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-10 justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-mono">Workspace ID:</span>
            <span className="text-xs text-indigo-400 font-mono font-medium truncate max-w-[180px]">{user.id}</span>
          </div>
          <div className="flex items-center space-x-3 text-xs bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>RLS Active</span>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-8 md:p-10 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
