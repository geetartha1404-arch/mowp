'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPassword } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LucideShieldAlert,
  LucideLoader2,
  LucideSparkles,
  LucideLayers,
  LucideCompass,
  LucideCheckCircle2,
  LucideArrowLeft,
  LucideMailCheck,
} from 'lucide-react'

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null)

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#0b0f19] text-slate-100 font-sans overflow-hidden">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:col-span-7 relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800/60 bg-gradient-to-b from-[#0e1626] to-[#0b0f19]">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full rounded-[7px] bg-[#0b0f19] flex items-center justify-center">
              <span className="font-display font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">M</span>
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">MOWP</span>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 my-auto max-w-xl space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <LucideSparkles className="w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse" />
              Intelligence-Driven Workflow
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              An AI-assisted work OS that turns{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                scattered tasks
              </span>{' '}
              into a clear plan.
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Automate the capture, classification, planning, and review cycle for your solo projects. Powered by Gemini 2.0 Flash and Supabase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/60 transition-all">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
                <LucideLayers className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-display font-semibold text-sm text-slate-200">Unified Capture</h3>
              <p className="text-xs text-slate-400 mt-1">One single inbox for ideas, tasks, reminders, and requests.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/60 transition-all">
              <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3">
                <LucideSparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-display font-semibold text-sm text-slate-200">Auto Classification</h3>
              <p className="text-xs text-slate-400 mt-1">AI instant categorization, effort, priority, and next actions.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/60 transition-all">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
                <LucideCompass className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-display font-semibold text-sm text-slate-200">Weekly Planning</h3>
              <p className="text-xs text-slate-400 mt-1">Interactive Kanban board with smart pre-populated columns.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/60 transition-all">
              <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3">
                <LucideCheckCircle2 className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-display font-semibold text-sm text-slate-200">Daily Briefing</h3>
              <p className="text-xs text-slate-400 mt-1">Every morning starts with a generated focus summary &amp; top tasks.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500 flex justify-between items-center">
          <span>© 2026 MOWP. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Supabase Secure Isolation Active
          </span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:col-span-5 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-20 relative bg-[#0b0f19]">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none lg:hidden" />

        <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
          {/* Back link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <LucideArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>

          {state?.success ? (
            /* Success state */
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center">
                  <LucideMailCheck className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                  Check your inbox
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We&apos;ve sent a password reset link to your email. The link expires in 1 hour.
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Didn&apos;t receive it?{' '}
                <button
                  onClick={() => window.location.reload()}
                  className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="font-display text-3xl font-bold tracking-tight text-white">
                  Forgot password?
                </h2>
                <p className="text-slate-400 text-sm">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form action={formAction} className="space-y-6">
                {state?.error && (
                  <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start space-x-2.5 animate-in fade-in duration-200">
                    <LucideShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-400" />
                    <span>{state.error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    className="bg-slate-900/60 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center"
                >
                  {isPending ? (
                    <>
                      <LucideLoader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                      Sending link...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-slate-400">
                Remembered it?{' '}
                <Link
                  href="/login"
                  className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
