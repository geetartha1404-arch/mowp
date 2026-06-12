'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signout } from '@/app/(auth)/actions'
import {
  LucideLayoutDashboard,
  LucideInbox,
  LucideCalendarDays,
  LucideFileText,
  LucideSettings,
  LucideLogOut,
  LucideUser
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  userEmail: string | undefined
}

export function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LucideLayoutDashboard,
    },
    {
      name: 'Inbox',
      href: '/inbox',
      icon: LucideInbox,
    },
    {
      name: 'Weekly Plan',
      href: '/plan',
      icon: LucideCalendarDays,
    },
    {
      name: 'Weekly Review',
      href: '/review',
      icon: LucideFileText,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: LucideSettings,
    },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-800/60 bg-[#0e1626] text-slate-200">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800/60">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full rounded-[7px] bg-[#0b0f19] flex items-center justify-center">
              <span className="font-display font-extrabold text-xs text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">M</span>
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">MOWP</span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner"
                  : "text-slate-400 hover:bg-slate-900/40 hover:text-slate-200 border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
                  isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-300"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User info / signout */}
      <div className="border-t border-slate-800/60 p-4 space-y-4">
        {userEmail && (
          <div className="flex items-center px-2 py-1.5 space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 ring-1 ring-slate-700">
              <LucideUser className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-300 truncate">Workspace</p>
              <p className="text-xs text-slate-500 truncate" title={userEmail}>
                {userEmail}
              </p>
            </div>
          </div>
        )}
        <form action={async () => { await signout() }}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-rose-950/10 hover:border-rose-900/20 border border-transparent h-10 px-3"
          >
            <LucideLogOut className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-300" />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  )
}
