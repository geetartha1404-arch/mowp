'use client'

import { useActionState } from 'react'
import { resetPassword } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LucideShieldAlert,
  LucideLoader2,
  LucideLock,
} from 'lucide-react'

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-slate-100 font-sans px-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full rounded-[7px] bg-[#0b0f19] flex items-center justify-center">
                <span className="font-display font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">M</span>
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">MOWP</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 space-y-6 backdrop-blur-sm">
          {/* Icon + Heading */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center">
                <LucideLock className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">
              Set new password
            </h1>
            <p className="text-slate-400 text-sm">
              Choose a strong password for your account.
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start space-x-2.5 animate-in fade-in duration-200">
                <LucideShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-400" />
                <span>{state.error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                New password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="••••••••"
                className="bg-slate-900/60 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="••••••••"
                className="bg-slate-900/60 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center mt-2"
            >
              {isPending ? (
                <>
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                  Updating password...
                </>
              ) : (
                'Update password'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600">
          © 2026 MOWP. All rights reserved.
        </p>
      </div>
    </div>
  )
}
