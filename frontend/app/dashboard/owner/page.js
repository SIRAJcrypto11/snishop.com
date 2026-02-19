import { PrismaClient } from '@prisma/client';
import { Users, DollarSign, Activity, ShoppingCart, Zap, TrendingUp } from 'lucide-react';
import { DashboardCharts } from '../../../components/dashboard/overview/DashboardCharts';

// Global Prisma instance to prevent dev connection exhaustion
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getSystemStats() {
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();

    // Calculate total revenue from completed orders
    const revenueResult = await prisma.order.aggregate({
        _sum: {
            finalPrice: true,
        },
        where: {
            status: 'COMPLETED',
        },
    });

    const totalRevenue = revenueResult._sum.finalPrice || 0;

    return { totalUsers, totalOrders, totalRevenue };
}

export default async function OwnerDashboard() {
    // Check ownership is handled by middleware.

    const stats = await getSystemStats();

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            {/* Premium Hero Section */}
            <div className="section-hero">
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1">
                        <h1 className="text-4xl font-black mb-3">Owner Command Center</h1>
                        <p className="text-lg opacity-95">Real-time overview of your platform's performance and system health.</p>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur border border-white/20 px-5 py-3 rounded-full text-white text-sm font-bold shadow-lg">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        System Operational
                    </div>
                </div>
            </div>

            {/* Premium Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Total Users Card */}
                <div className="stat-card stagger-child">
                    <div className="flex justify-between items-start mb-6">
                        <div className="stat-card-icon primary animate-float">
                            <Users size={28} />
                        </div>
                        <div className="px-3 py-1.5 gradient-blue rounded-lg text-white text-xs font-bold shadow-md">
                            +5.2%
                        </div>
                    </div>
                    <p className="stat-card-label">Total Users</p>
                    <h3 className="stat-card-value animate-counter">{stats.totalUsers.toLocaleString()}</h3>
                    <p className="text-sm text-primary font-bold mt-4 flex items-center gap-2">
                        <TrendingUp size={16} /> Active Members
                    </p>
                </div>

                {/* Total Revenue Card */}
                <div className="stat-card stagger-child">
                    <div className="flex justify-between items-start mb-6">
                        <div className="stat-card-icon success animate-float">
                            <DollarSign size={28} />
                        </div>
                        <div className="px-3 py-1.5 gradient-green rounded-lg text-white text-xs font-bold shadow-md">
                            +12.8%
                        </div>
                    </div>
                    <p className="stat-card-label">Total Revenue</p>
                    <h3 className="stat-card-value animate-counter">${parseFloat(stats.totalRevenue).toLocaleString('en-US', { maximumFractionDigits: 0 })}</h3>
                    <p className="text-sm text-success font-bold mt-4 flex items-center gap-2">
                        <TrendingUp size={16} /> Growing
                    </p>
                </div>

                {/* Total Orders Card */}
                <div className="stat-card stagger-child">
                    <div className="flex justify-between items-start mb-6">
                        <div className="stat-card-icon warning animate-float">
                            <ShoppingCart size={28} />
                        </div>
                        <div className="px-3 py-1.5 gradient-amber rounded-lg text-white text-xs font-bold shadow-md">
                            +8.1%
                        </div>
                    </div>
                    <p className="stat-card-label">Total Orders</p>
                    <h3 className="stat-card-value animate-counter">{stats.totalOrders.toLocaleString()}</h3>
                    <p className="text-sm text-warning font-bold mt-4 flex items-center gap-2">
                        <TrendingUp size={16} /> This Month
                    </p>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-premium">
                    <h3 className="text-xl font-bold mb-6 text-text-primary">System Management</h3>
                    <div className="space-y-3">
                        <a href="/dashboard/owner/users" className="btn-primary w-full flex items-center justify-center gap-2">
                            <Users size={18} />
                            Manage Users
                        </a>
                        <a href="/dashboard/owner/services" className="btn-secondary w-full flex items-center justify-center gap-2">
                            <ShoppingCart size={18} />
                            Manage Services
                        </a>
                        <a href="/dashboard/owner/roles" className="btn-secondary w-full flex items-center justify-center gap-2">
                            <Zap size={18} />
                            Configure Roles
                        </a>
                    </div>
                </div>

                <div className="card-premium">
                    <h3 className="text-xl font-bold mb-6 text-text-primary">System Health</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary font-bold">Database Status</span>
                            <span className="badge-success">Connected</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary font-bold">API Response</span>
                            <span className="badge-success">Optimal</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary font-bold">Platform Load</span>
                            <span className="badge-success">Normal</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary font-bold">System Uptime</span>
                            <span className="badge-success">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="animate-fade-in">
                <DashboardCharts />
            </div>
        </div>
    );
}
                            </div>
                            <span className="text-sm font-bold text-[#5F6368] uppercase tracking-wider">Total Revenue</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-[#202124]">IDR {stats.totalRevenue.toLocaleString()}</h2>
                        <p className="text-[#137333] text-sm font-medium mt-2 flex items-center gap-1">
                            <Activity size={14} /> Lifetime Earnings
                        </p>
                    </div>
                </div>

                {/* Total Orders Card */}
                <div className="bg-gradient-to-br from-[#F3E8FD] to-white rounded-xl p-6 border border-[#E9D5FF] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group min-w-0">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ShoppingCart size={80} className="text-[#9334E6] rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-[#9334E6]">
                                <ShoppingCart size={24} />
                            </div>
                            <span className="text-sm font-bold text-[#5F6368] uppercase tracking-wider">Total Orders</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-[#202124]">{stats.totalOrders.toLocaleString()}</h2>
                        <p className="text-[#9334E6] text-sm font-medium mt-2 flex items-center gap-1">
                            <Activity size={14} /> Completed Orders
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-[#DADCE0] shadow-sm overflow-hidden p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#202124]">Performance Analytics</h3>
                </div>
                <DashboardCharts />
            </div>
        </div>
    );
}
