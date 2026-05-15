'use client'

import { useState } from 'react'
import {
  Home,
  Bell,
  MessageCircle,
  Users,
  Phone,
  Mail,
  Video,
  CreditCard,
  TrendingUp,
  FileText,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'initiative' | 'cohort' | 'demographics' | 'trends'

interface SidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, tab: 'overview' as Tab },
  { id: 'notification', label: 'Notification', icon: Bell, badge: 'dot' },
  { id: 'healthiq', label: 'HealthIQ', icon: Sparkles, badge: 'new' },
  { id: 'team-chat', label: 'Team Chat', icon: Users },
  { id: 'call', label: 'Call', icon: Phone },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'video-call', label: 'Video Call', icon: Video },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp, tab: 'initiative' as Tab },
  { id: 'reports', label: 'Reports', icon: FileText, tab: 'demographics' as Tab },
  { id: 'community', label: 'Community', icon: Globe },
]

const tabToMenu: Record<Tab, string> = {
  overview: 'home',
  initiative: 'analytics',
  demographics: 'reports',
  cohort: '',
  trends: '',
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [comingSoon, setComingSoon] = useState<string | null>(null)

  const activeMenuId = tabToMenu[activeTab]

  function handleMenuClick(item: typeof menuItems[0]) {
    if (item.tab) {
      onTabChange(item.tab)
    } else if (item.id === 'logout') {
      setShowLogout(true)
    } else {
      setComingSoon(item.label)
    }
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out shrink-0',
          'bg-[#1F2121] border-r border-white/8 text-[rgba(245,245,245,0.9)]',
          collapsed ? 'w-[64px]' : 'w-[220px]'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo + toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/8">
          {!collapsed && (
            <span className="text-lg font-bold tracking-widest text-white uppercase select-none">
              THIER
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'rounded-lg p-1.5 hover:bg-white/10 transition-colors text-white/60 hover:text-white',
              collapsed && 'mx-auto'
            )}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 flex flex-col gap-0.5 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeMenuId
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                title={collapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150 w-full text-left relative group',
                  isActive
                    ? 'bg-[rgba(158,44,106,0.15)] text-[#9E2C6A]'
                    : 'text-white/60 hover:text-white hover:bg-white/8',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon
                  size={18}
                  className={cn('shrink-0', isActive ? 'text-[#9E2C6A]' : 'text-white/50 group-hover:text-white')}
                />
                {!collapsed && (
                  <span className="truncate leading-none">{item.label}</span>
                )}
                {!collapsed && item.badge === 'dot' && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#C0152F] shrink-0" aria-label="New notification" />
                )}
                {!collapsed && item.badge === 'new' && (
                  <span className="ml-auto text-[10px] font-semibold bg-[#9E2C6A] text-white px-1.5 py-0.5 rounded-full leading-none">
                    NEW
                  </span>
                )}
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#9E2C6A] rounded-r-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/8 p-2 flex flex-col gap-0.5">
          <button
            onClick={() => setShowLogout(true)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-white/50 hover:text-[#FF5459] hover:bg-[rgba(192,21,47,0.1)] transition-all duration-150 w-full',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? 'Login / Out' : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Login / Out</span>}
          </button>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setComingSoon('Profile Settings')}
            onKeyDown={(e) => e.key === 'Enter' && setComingSoon('Profile Settings')}
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-white/8 cursor-pointer transition-colors mt-1',
              collapsed && 'justify-center px-2'
            )}
            aria-label="Profile settings"
          >
            <img
              src="https://i.pravatar.cc/40?img=5"
              alt="Amanda King"
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-[#9E2C6A]/40"
            />
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white/90 truncate leading-tight">Amanda King</p>
                <p className="text-[11px] text-white/40 truncate leading-tight">amanda@thier.io</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Coming soon modal */}
      {comingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setComingSoon(null)} />
          <div className="relative bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold text-foreground mb-1">{comingSoon}</h3>
            <p className="text-sm text-muted-foreground mb-4">This feature is under development and will be available soon.</p>
            <button
              onClick={() => setComingSoon(null)}
              className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Logout modal */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogout(false)} />
          <div className="relative bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold text-foreground mb-1">Confirm Logout</h3>
            <p className="text-sm text-muted-foreground mb-4">Are you sure you want to log out?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
