"use client";
import React from 'react';
import { useSnishop } from '../../context/SnishopContext';
import { Wallet, Coins, CreditCard, ArrowRight, TrendingUp, Activity, Box, MoreVertical, ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';
import { DashboardCharts } from '../../components/dashboard/overview/DashboardCharts';

export default function DashboardOverview() {
    const { balance, bdagBalance, platformSaldo, transactions } = useSnishop();

    const StatCard = ({ icon: Icon, label, value, unit, trend, trendType, color }) => (
        <div className="stat-card stagger-child">
            <div className="flex justify-between items-start mb-6">
                <div className={`stat-card-icon ${color} animate-float`}>
                    <Icon size={28} />
                </div>
                <button className="p-2.5 hover:bg-surface-secondary hover:scale-110 rounded-lg transition-all">
                    <MoreVertical size={18} className="text-text-muted" />
                </button>
            </div>
            <p className="stat-card-label">{label}</p>
            <h3 className="stat-card-value animate-counter">
                {value} <span className="text-lg text-text-secondary font-normal">{unit}</span>
            </h3>
            {trend && (
                <div className={`stat-card-trend ${trendType === 'positive' ? 'positive' : trendType === 'negative' ? 'negative' : 'neutral'}`}>
                    {trendType === 'positive' ? <ArrowUpRight size={16} /> : trendType === 'negative' ? <ArrowDownLeft size={16} /> : <Zap size={16} />}
                    <span className="font-bold">{trend}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Premium Header Section */}
            <div className="section-header animate-fade-in">
                <h1 className="text-3xl md:text-4xl">Dashboard Overview</h1>
                <p className="text-lg mt-2">Welcome back! Here's your portfolio performance and insights.</p>
            </div>

            {/* Premium Stats Grid with Stagger Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-scale">
                <StatCard
                    icon={Coins}
                    label="SNISHOP Token"
                    value={parseFloat(balance).toLocaleString()}
                    unit="SNI"
                    trend="+12.5%"
                    trendType="positive"
                    color="primary"
                />
                <StatCard
                    icon={Wallet}
                    label="BDAG Balance"
                    value={parseFloat(bdagBalance).toFixed(4)}
                    unit="BDAG"
                    trend="+8.2%"
                    trendType="positive"
                    color="success"
                />
                <StatCard
                    icon={CreditCard}
                    label="Platform Credits"
                    value={platformSaldo.toLocaleString()}
                    unit="Credits"
                    trend="Stable"
                    trendType="neutral"
                    color="warning"
                />
            </div>

            {/* Premium Charts Section */}
            <div className="animate-fade-in">
                <DashboardCharts />
            </div>

            {/* Premium Recent Transactions */}
            <div className="chart-container animate-fade-in">
                <div className="pb-6 border-b border-border flex justify-between items-center">
                    <div>
                        <h2 className="chart-title">Recent Transactions</h2>
                        <p className="chart-subtitle">Latest activity on your account</p>
                    </div>
                    <a href="/dashboard/wallet" className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-primary hover:bg-primary-light transition-all hover:scale-105 active:scale-95 uppercase tracking-wide">
                        View All <ArrowRight size={18} />
                    </a>
                </div>

                <div className="divide-y divide-border-light overflow-x-auto mt-8">
                    {transactions.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center justify-center min-h-96">
                            <div className="w-24 h-24 gradient-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-float">
                                <Activity size={48} className="text-white" />
                            </div>
                            <p className="text-lg text-text-primary font-bold mb-2">No transactions yet</p>
                            <p className="text-text-secondary text-sm">Your transaction history will appear here once you make a transaction</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border-light">
                            {transactions.slice(0, 5).map((tx, idx) => (
                                <div 
                                    key={tx.id} 
                                    className="p-6 hover:bg-primary-light/30 transition-all duration-200 flex items-center justify-between group cursor-pointer stagger-child"
                                    style={{ '--delay': `${idx * 50}ms` }}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold stat-card-icon ${
                                            tx.type.includes("Buy") 
                                                ? "primary" 
                                                : tx.type.includes("Service")
                                                ? "warning"
                                                : "success"
                                        } shadow-md`}>
                                            {tx.type.includes("Token") ? <Coins size={24} /> :
                                                tx.type.includes("Service") ? <Box size={24} /> : <CreditCard size={24} />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-text-primary group-hover:text-primary transition-colors text-lg">{tx.type}</p>
                                            <p className="text-xs text-text-muted mt-1 font-medium">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono font-bold text-text-primary text-xl">{tx.amount}</p>
                                        <span className={`text-xs px-4 py-1.5 rounded-full font-bold inline-block mt-2 uppercase tracking-wider ${
                                            tx.status === 'Completed' 
                                                ? 'badge-success' 
                                                : 'badge-warning'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
