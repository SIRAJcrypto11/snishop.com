import { PrismaClient } from '@prisma/client';
import { Users, DollarSign, Activity, ShoppingCart } from 'lucide-react';
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
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#202124]">
                        Owner Command Center
                    </h1>
                    <p className="text-[#5F6368] mt-1">Real-time overview of your platform&apos;s performance.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#E6F4EA] border border-[#CEEAD6] px-3 py-1.5 rounded-full text-[#137333] text-sm font-bold shadow-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E8E3E] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1E8E3E]"></span>
                    </span>
                    System Operational
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users Card */}
                <div className="bg-gradient-to-br from-[#E8F0FE] to-white rounded-3xl p-6 border border-[#D2E3FC] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={80} className="text-[#1967D2] rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-[#1967D2]">
                                <Users size={24} />
                            </div>
                            <span className="text-sm font-bold text-[#5F6368] uppercase tracking-wider">Total Users</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-[#202124]">{stats.totalUsers.toLocaleString()}</h2>
                        <p className="text-[#1A73E8] text-sm font-medium mt-2 flex items-center gap-1">
                            <Activity size={14} /> Active Network
                        </p>
                    </div>
                </div>

                {/* Total Revenue Card */}
                <div className="bg-gradient-to-br from-[#E6F4EA] to-white rounded-3xl p-6 border border-[#CEEAD6] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign size={80} className="text-[#137333] rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-[#137333]">
                                <DollarSign size={24} />
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
                <div className="bg-gradient-to-br from-[#F3E8FD] to-white rounded-3xl p-6 border border-[#E9D5FF] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
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

            <div className="bg-white rounded-3xl border border-[#DADCE0] shadow-sm overflow-hidden p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#202124]">Performance Analytics</h3>
                </div>
                <DashboardCharts />
            </div>
        </div>
    );
}
