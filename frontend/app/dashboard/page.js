"use client";
import React from 'react';
import { useSnishop } from '../../context/SnishopContext';
import { Wallet, Coins, CreditCard, TrendingUp, TrendingDown, Activity, MoreHorizontal, ArrowUpRight, ArrowDownRight, Zap, Users, ShoppingBag, BarChart2, RefreshCw } from 'lucide-react';
import { DashboardCharts } from '../../components/dashboard/overview/DashboardCharts';

export default function DashboardOverview() {
    const { balance, bdagBalance, platformSaldo, transactions } = useSnishop();

    const StatCard = ({ icon: Icon, label, value, unit, trend, trendType, color, bgColor }) => (
        <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 cursor-default">
            <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgColor || 'bg-slate-100'}`}>
                    <Icon size={20} className={color || 'text-indigo-600'} />
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
                    <MoreHorizontal size={16} className="text-slate-400" />
                </button>
            </div>
            <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{label}</p>
                <div className="flex items-end gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 leading-none">{value}</h3>
                    {unit && <span className="text-sm text-slate-500 mb-0.5">{unit}</span>}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${
                        trendType === 'positive' ? 'text-emerald-600' :
                        trendType === 'negative' ? 'text-red-500' : 'text-slate-500'
                    }`}>
                        {trendType === 'positive' ? <TrendingUp size={13} /> : trendType === 'negative' ? <TrendingDown size={13} /> : <Zap size={13} />}
                        <span>{trend}</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                            <p className="text-sm text-slate-500 mt-1">Monitor your portfolio performance and insights</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <RefreshCw size={14} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={Wallet}
                        label="SNISHOP Balance"
                        value={balance ? parseFloat(balance).toFixed(4) : '0.0000'}
                        unit="SNDT"
                        trend="+2.4% from last week"
                        trendType="positive"
                        color="text-indigo-600"
                        bgColor="bg-indigo-50"
                    />
                    <StatCard
                        icon={Coins}
                        label="BDAG Balance"
                        value={bdagBalance ? parseFloat(bdagBalance).toFixed(4) : '0.0000'}
                        unit="BDAG"
                        trend="+0.8% from last week"
                        trendType="positive"
                        color="text-violet-600"
                        bgColor="bg-violet-50"
                    />
                    <StatCard
                        icon={CreditCard}
                        label="Platform Credits"
                        value={platformSaldo ? `Rp${parseInt(platformSaldo).toLocaleString('id-ID')}` : 'Rp0'}
                        trend="-1.2% from last week"
                        trendType="negative"
                        color="text-emerald-600"
                        bgColor="bg-emerald-50"
                    />
                    <StatCard
                        icon={Activity}
                        label="Total Transactions"
                        value={transactions?.length || 0}
                        unit="txns"
                        trend="+5 this week"
                        trendType="positive"
                        color="text-amber-600"
                        bgColor="bg-amber-50"
                    />
                </div>

                {/* Charts & Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">Portfolio Performance</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Balance trends over time</p>
                            </div>
                            <div className="flex items-center gap-1">
                                {['1W','1M','3M','1Y'].map(p => (
                                    <button key={p} className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-md transition-colors">{p}</button>
                                ))}
                            </div>
                        </div>
                        <div className="p-6">
                            <DashboardCharts transactions={transactions} balance={balance} />
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
                            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View all</button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {transactions && transactions.length > 0 ? (
                                transactions.slice(0, 6).map((tx, i) => (
                                    <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            tx.type === 'receive' ? 'bg-emerald-50' : 'bg-red-50'
                                        }`}>
                                            {tx.type === 'receive'
                                                ? <ArrowUpRight size={14} className="text-emerald-600" />
                                                : <ArrowDownRight size={14} className="text-red-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-slate-900 truncate">{tx.description || 'Transaction'}</p>
                                            <p className="text-xs text-slate-400">{tx.date || 'Recent'}</p>
                                        </div>
                                        <span className={`text-xs font-semibold ${
                                            tx.type === 'receive' ? 'text-emerald-600' : 'text-red-500'
                                        }`}>
                                            {tx.type === 'receive' ? '+' : '-'}{tx.amount}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                                        <Activity size={18} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-600">No transactions yet</p>
                                    <p className="text-xs text-slate-400 mt-1">Your activity will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-slate-200 rounded-lg">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-900">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
                        {[
                            { icon: Coins, label: 'Buy Token', desc: 'Purchase SNDT tokens', href: '/dashboard/buy-token', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                            { icon: Wallet, label: 'My Wallet', desc: 'View balance & history', href: '/dashboard/wallet', color: 'text-violet-600', bg: 'bg-violet-50' },
                            { icon: ShoppingBag, label: 'Services', desc: 'Browse available services', href: '/dashboard/services', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { icon: BarChart2, label: 'Analytics', desc: 'Detailed performance', href: '/dashboard/token', color: 'text-amber-600', bg: 'bg-amber-50' },
                        ].map((action, i) => (
                            <a key={i} href={action.href} className="flex items-center gap-3 p-5 hover:bg-slate-50 transition-colors group">
                                <div className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    <action.icon size={18} className={action.color} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                                    <p className="text-xs text-slate-500">{action.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
