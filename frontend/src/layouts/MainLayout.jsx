import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  HelpCircle,
  Code2,
  Users2,
  FileCheck2,
  BookOpen,
  FileText,
  CalendarDays,
  BarChart3,
  Bookmark,
  Settings,
  Search,
  Flame,
  Menu,
  X,
  Compass,
  Zap,
  Moon,
  Sun,
  ShieldAlert,
  ChevronRight,
  RotateCcw,
  Database
} from 'lucide-react';
import { useLearner } from '../context/LearnerContext';
import CountdownTimer from '../components/CountdownTimer';
import GlobalSearchModal from '../components/GlobalSearchModal';

export default function MainLayout() {
  const { dashboard, theme, toggleTheme, learnerId } = useLearner();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const navSections = [
    {
      group: 'Overview',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Preparation Plan', path: '/plan', icon: CalendarDays },
      ]
    },
    {
      group: 'Assessment Modules',
      items: [
        { name: 'Round 1 — Screening', path: '/round-1', icon: HelpCircle, badge: 'MCQs' },
        { name: 'Round 2 — Coding + SQL', path: '/round-2', icon: Code2, badge: 'JS & SQL' },
        { name: 'Technical Interview', path: '/round-4', icon: Users2, badge: '45m' },
      ]
    },
    {
      group: 'Practice & Library',
      items: [
        { name: 'Mock Tests Hub', path: '/mocks', icon: FileCheck2 },
        { name: 'Study Library', path: '/study', icon: BookOpen },
        { name: 'Cheat Sheets', path: '/cheat-sheets', icon: FileText },
        { name: 'Research Library', path: '/research', icon: Compass },
      ]
    },
    {
      group: 'Personal & Review',
      items: [
        { name: 'Mistake Notebook', path: '/mistakes', icon: RotateCcw, badge: 'Review' },
        { name: 'Progress Analytics', path: '/analytics', icon: BarChart3 },
        { name: 'Saved Bookmarks', path: '/bookmarks', icon: Bookmark },
        { name: 'Settings & Data', path: '/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#090d16] text-slate-100">
      {/* Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-[#0b101d] shrink-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20 text-white font-black text-sm">
              FL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight">FirstLabs</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  FED-2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">FirstHire • ₹8 LPA Base</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                {sec.group}
              </span>
              <div className="mt-1 space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 font-semibold shadow-sm shadow-brand-500/10'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.badge === 'Review' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Learner Info & Theme */}
        <div className="p-3 border-t border-slate-800/80 bg-[#090d16]/80 flex items-center justify-between">
          <Link to="/settings" className="flex items-center gap-2 text-left min-w-0 group" title="Anonymous Learner ID">
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-brand-400 group-hover:border-brand-500/50">
              ID
            </div>
            <div className="truncate">
              <span className="block text-[11px] font-mono text-slate-400 truncate group-hover:text-white">
                {learnerId.slice(0, 8)}...
              </span>
              <span className="block text-[10px] text-emerald-400 font-medium">Anonymous • Local</span>
            </div>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 border-b border-slate-800 bg-[#0b101d]/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Assessment Status Badge */}
            <div className="hidden sm:block">
              <CountdownTimer compact={true} />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium hover:border-slate-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Quick Search...</span>
              <kbd className="hidden md:inline px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold font-mono">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{dashboard?.streak_days || 1}d Streak</span>
            </div>

            {/* Quick Plan Link */}
            <Link
              to="/plan"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-semibold hover:bg-brand-500/25 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Prep Plan</span>
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#090d16]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 max-w-full bg-[#0b101d] border-r border-slate-800 flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white text-xs">FL</div>
                <div>
                  <span className="font-extrabold text-white text-sm block">FirstLabs Prep</span>
                  <span className="text-[10px] text-slate-400 block">FED-2026</span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {navSections.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {sec.group}
                  </span>
                  <div className="mt-1 space-y-1">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                              isActive ? 'bg-brand-500/20 text-brand-400 font-semibold' : 'text-slate-400'
                            }`
                          }
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
