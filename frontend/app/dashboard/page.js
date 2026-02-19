"use client";
import React from 'react';
import { useSnishop } from '../../context/SnishopContext';
import { Wallet, Coins, CreditCard, ArrowRight, TrendingUp, Activity, Box, MoreVertical, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { DashboardCharts } from '../../components/dashboard/overview/DashboardCharts';

export default function DashboardOverview() {
    const { balance, bdagBalance, platformSaldo, transactions } = useSnishop();

    const StatCard = ({ icon: Icon, label, value, unit, trend, trendType, color }) => (
        <div className="stat-card">
            <div className="flex justify-between items-start mb-4">
                <div className={`stat-card-icon ${color}`}>
                    <Icon size={24} />
                </div>
                <button className="p-2 hover:bg-surface-secondary rounded-lg transition">
                    <MoreVertical size={18} className="text-text-muted" />
                </button>
            </div>
            <p className="stat-card-label">{label}</p>
            <h3 className="stat-card-value">
                {value} <span className="text-lg text-text-secondary font-normal">{unit}</span>
            </h3>
            {trend && (
                <div className={`stat-card-trend ${trendType === 'positive' ? 'positive' : 'neutral'}`}>
                    {trendType === 'positive' ? <ArrowUpRight size={14} className="inline mr-1" /> : <ArrowDownLeft size={14} className="inline mr-1" />}
                    {trend}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="section-header animate-fade-in">
                <h1>Dashboard Overview</h1>
                <p>Welcome back! Here's your portfolio performance and insights.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-scale">
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

            {/* Charts Section */}
            <div className="animate-fade-in">
                <DashboardCharts />
            </div>

            {/* Recent Transactions */}
            <div className="chart-container animate-fade-in">
                <div className="pb-6 border-b border-border flex justify-between items-center">
                    <div>
                        <h2 className="chart-title">Recent Transactions</h2>
                        <p className="chart-subtitle">Latest activity on your account</p>
                    </div>
                    <a href="/dashboard/wallet" className="text-primary hover:text-primary-hover flex items-center gap-2 transition-colors font-semibold text-sm">
                        View All <ArrowRight size={16} />
                    </a>
                </div>

                <div className="divide-y divide-border-light overflow-x-auto mt-6">
                    {transactions.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center min-h-80">
                            <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center mb-4">
                                <Activity size={32} className="text-text-muted" />
                            </div>
                            <p className="text-text-secondary font-medium">No transactions yet</p>
                            <p className="text-text-muted text-sm mt-1">Your transaction history will appear here</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border-light">
                            {transactions.slice(0, 5).map((tx) => (
                                <div key={tx.id} className="p-6 hover:bg-surface-secondary/50 transition-colors flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold stat-card-icon ${
                                            tx.type.includes("Buy") 
                                                ? "primary" 
                                                : tx.type.includes("Service")
                                                ? "info"
                                                : "success"
                                        }`}>
                                            {tx.type.includes("Token") ? <Coins size={20} /> :
                                                tx.type.includes("Service") ? <Box size={20} /> : <CreditCard size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-text-primary group-hover:text-primary transition-colors">{tx.type}</p>
                                            <p className="text-xs text-text-muted mt-1">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono font-bold text-text-primary text-lg">{tx.amount}</p>
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold inline-block mt-1 ${
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
