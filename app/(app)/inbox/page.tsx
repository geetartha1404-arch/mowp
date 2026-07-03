'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Inbox,
  FileText,
  Lightbulb,
  MessageSquare,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  Tag,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Database } from '@/types/database'
import { User } from '@supabase/supabase-js'

type WorkItem = Database['public']['Tables']['work_items']['Row']
type WorkItemInsert = Database['public']['Tables']['work_items']['Insert']

const typeOptions = [
  { value: 'task', label: 'Task', icon: FileText, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { value: 'note', label: 'Note', icon: Inbox, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { value: 'idea', label: 'Idea', icon: Lightbulb, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { value: 'request', label: 'Request', icon: MessageSquare, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' }
] as const

const priorityOptions = [
  { value: 'critical', label: 'Critical', color: 'text-red-400 border-red-500/30 bg-red-500/5' },
  { value: 'high', label: 'High', color: 'text-orange-400 border-orange-500/30 bg-orange-500/5' },
  { value: 'medium', label: 'Medium', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5' },
  { value: 'low', label: 'Low', color: 'text-slate-400 border-slate-700 bg-slate-800/10' },
  { value: 'someday', label: 'Someday', color: 'text-violet-400 border-violet-500/30 bg-violet-500/5' }
] as const

const effortOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
] as const

export default function InboxPage() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  
  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'task' | 'note' | 'idea' | 'request'>('task')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<string>('medium')
  const [effortEstimate, setEffortEstimate] = useState<string>('')
  const [tagInput, setTagInput] = useState('')
  
  // Page UI state
  const [workItems, setWorkItems] = useState<WorkItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [formError, setFormError] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchItems = useCallback(async (userId: string) => {
    setIsLoadingItems(true)
    try {
      const { data, error } = await supabase
        .from('work_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setWorkItems(data || [])
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching work items:', errMsg)
    } finally {
      setIsLoadingItems(false)
    }
  }, [supabase])

  // Fetch current user and items
  useEffect(() => {
    async function init() {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)
      if (currentUser) {
        await fetchItems(currentUser.id)
      }
    }
    init()
  }, [supabase, fetchItems])

  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('inbox-realtime-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'work_items',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new as WorkItem
            setWorkItems((prev) => [newItem, ...prev.filter(item => item.id !== newItem.id)])
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = payload.new as WorkItem
            setWorkItems((prev) =>
              prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
            )
          } else if (payload.eventType === 'DELETE') {
            const deletedItem = payload.old as { id: string }
            setWorkItems((prev) => prev.filter((item) => item.id !== deletedItem.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setNotification(null)

    if (!title.trim()) {
      setFormError('Title is required')
      return
    }

    if (!user) {
      setFormError('You must be logged in to capture items')
      return
    }

    setIsSubmitting(true)

    // Process tags
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const insertData: WorkItemInsert = {
      user_id: user.id,
      title: title.trim(),
      description: description.trim() || null,
      type,
      due_date: dueDate || null,
      priority,
      effort_estimate: (effortEstimate as 'low' | 'medium' | 'high') || null,
      tags,
      status: 'inbox',
      source: 'web_capture'
    }

    try {
      const { error } = await supabase.from('work_items').insert(insertData)
      if (error) throw error

      // Reset form
      setTitle('')
      setDescription('')
      setType('task')
      setDueDate('')
      setPriority('medium')
      setEffortEstimate('')
      setTagInput('')
      
      setNotification({ type: 'success', message: 'Item captured successfully!' })
      setTimeout(() => setNotification(null), 3000)
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error saving item:', errMsg)
      setFormError(errMsg || 'Failed to capture item')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(itemId: string) {
    try {
      const { error } = await supabase.from('work_items').delete().eq('id', itemId)
      if (error) throw error
      
      setNotification({ type: 'success', message: 'Item deleted.' })
      setTimeout(() => setNotification(null), 2500)
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error deleting item:', errMsg)
      setNotification({ type: 'error', message: 'Failed to delete item.' })
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col space-y-2 border-b border-slate-800/80 pb-6">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
          Inbox Capture
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Quickly capture thoughts, tasks, feature requests, or notes. Gemini will automatically classify, assign priority, and suggest action plans.
        </p>
      </div>

      {notification && (
        <div className={`p-4 rounded-xl border text-sm transition-all duration-300 flex items-center justify-between shadow-lg ${
          notification.type === 'success'
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
        }`}>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="hover:opacity-80 text-xs font-semibold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative group rounded-2xl p-6 bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-slate-700/60 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 -z-10 pointer-events-none" />

            <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Capture Something
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {typeOptions.map((opt) => {
                    const Icon = opt.icon
                    const isSelected = type === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setType(opt.value)}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-medium transition-all duration-200 ${
                          isSelected
                            ? `${opt.color} ring-1 ring-offset-1 ring-offset-slate-950 ring-indigo-500/40 scale-[1.02]`
                            : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:text-slate-200 hover:border-slate-700/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Title <span className="text-rose-500">*</span>
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g. Refactor Next.js authentication flow"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-950/40 border-slate-800/80 text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 h-10 px-3"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Provide context, links, or notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-sm rounded-lg bg-slate-950/40 border border-slate-800/80 text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none p-3 resize-none transition-colors"
                />
              </div>

              {/* Collapsible/Advanced Section */}
              <div className="border-t border-slate-800/60 pt-4 space-y-4">
                {/* Due Date & Effort */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="dueDate" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Due Date
                    </label>
                    <input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full text-xs h-9 rounded-lg bg-slate-950/40 border border-slate-800/80 text-slate-300 focus:border-indigo-500 focus:outline-none px-2.5 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="effort" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Effort
                    </label>
                    <select
                      id="effort"
                      value={effortEstimate}
                      onChange={(e) => setEffortEstimate(e.target.value)}
                      className="w-full text-xs h-9 rounded-lg bg-slate-950/40 border border-slate-800/80 text-slate-300 focus:border-indigo-500 focus:outline-none px-2 transition-colors"
                    >
                      <option value="" className="bg-slate-900">Unspecified</option>
                      {effortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Priority & Tags */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full text-xs h-9 rounded-lg bg-slate-950/40 border border-slate-800/80 text-slate-300 focus:border-indigo-500 focus:outline-none px-2 transition-colors"
                    >
                      {priorityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      Tags
                    </label>
                    <Input
                      id="tags"
                      type="text"
                      placeholder="dev, frontend, bug"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="bg-slate-950/40 border-slate-800/80 text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 h-9 text-xs px-2.5"
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-rose-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-md shadow-indigo-500/10 h-10 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Capture Item
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Captured Items (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <h2 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-indigo-400" />
              Captured Items ({workItems.length})
            </h2>
            <div className="text-xs text-slate-500">
              Synced in real-time
            </div>
          </div>

          {isLoadingItems ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-sm font-medium">Loading items...</p>
            </div>
          ) : workItems.length === 0 ? (
            <div className="p-8 rounded-xl bg-slate-900/10 border border-slate-800/80 border-dashed text-center py-16">
              <div className="h-12 w-12 rounded-full bg-slate-800/40 flex items-center justify-center mb-4 mx-auto border border-slate-700/30">
                <Inbox className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="font-display font-semibold text-slate-300 mb-1">No captured items</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                Your captured tasks, notes, ideas, and requests will appear here. Try adding one on the left!
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
              {workItems.map((item) => {
                // Find matching type styling
                const typeStyle = typeOptions.find((t) => t.value === item.type) || typeOptions[0]
                const TypeIcon = typeStyle.icon

                // Find matching priority styling
                const priorityStyle = priorityOptions.find((p) => p.value === item.priority) || priorityOptions[2]

                // Determine if item is "processing" (AI classification has not run yet)
                const isProcessing = !item.ai_category

                return (
                  <div
                    key={item.id}
                    className={`relative p-5 rounded-xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-slate-700/60 ${
                      isProcessing
                        ? 'bg-slate-900/35 border-slate-800/50'
                        : 'bg-slate-900/25 border-slate-800/80'
                    }`}
                  >
                    {/* Shimmer overlay for processing */}
                    {isProcessing && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-shimmer rounded-t-xl" />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Content */}
                      <div className="space-y-3 flex-1 min-w-0">
                        {/* Title & Badges */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Type Pill */}
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${typeStyle.color}`}>
                              <TypeIcon className="w-3 h-3" />
                              {typeStyle.label}
                            </span>

                            {/* Priority Pill */}
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${priorityStyle.color}`}>
                              {priorityStyle.label}
                            </span>

                            {/* Effort (if specified) */}
                            {item.effort_estimate && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-800 bg-slate-950/30 text-slate-400">
                                Effort: {item.effort_estimate}
                              </span>
                            )}

                            {/* Status badge */}
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-800 bg-slate-950/20 text-indigo-400">
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-display font-semibold text-base text-slate-100 leading-snug break-words">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Bottom Row metadata */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] text-slate-500 border-t border-slate-900/60 pt-3">
                          {item.due_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-600" />
                              Due {new Date(item.due_date).toLocaleDateString()}
                            </span>
                          )}

                          {item.tags && item.tags.length > 0 && (
                            <span className="flex items-center gap-1 max-w-xs truncate">
                              <Tag className="w-3.5 h-3.5 text-slate-600" />
                              {item.tags.join(', ')}
                            </span>
                          )}

                          <span className="flex items-center gap-1 ml-auto">
                            Captured {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        {/* AI Enriched Section */}
                        <div className={`mt-3 rounded-lg border p-3.5 ${
                          isProcessing 
                            ? 'bg-indigo-950/5 border-indigo-950/30 text-indigo-400' 
                            : 'bg-indigo-950/10 border-indigo-950/25 text-indigo-300'
                        }`}>
                          {isProcessing ? (
                            <div className="flex items-center gap-2.5">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                              <span className="text-xs font-semibold animate-pulse tracking-wide uppercase text-indigo-400 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                AI Classification in progress...
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between border-b border-indigo-500/10 pb-1.5">
                                <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-400 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-indigo-400" />
                                  AI Classified Category:
                                </span>
                                <span className="font-bold text-white bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px]">
                                  {item.ai_category}
                                </span>
                              </div>
                              {item.ai_summary && (
                                <p className="text-slate-300 leading-relaxed text-[11px]">
                                  <strong className="text-indigo-300">Summary: </strong>{item.ai_summary}
                                </p>
                              )}
                              {item.ai_next_action && (
                                <p className="text-slate-300 leading-relaxed text-[11px] flex items-start gap-1">
                                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="text-indigo-300">Next Action: </strong>{item.ai_next_action}
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg border border-transparent bg-slate-950/10 text-slate-500 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all self-start"
                        title="Delete Capture"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
