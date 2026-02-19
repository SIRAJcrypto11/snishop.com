'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

// Mock data for initial implementation
const revenueData = [
    { name: 'Mon', total: 150000 },
    { name: 'Tue', total: 230000 },
    { name: 'Wed', total: 180000 },
    { name: 'Thu', total: 320000 },
    { name: 'Fri', total: 290000 },
    { name: 'Sat', total: 450000 },
    { name: 'Sun', total: 380000 },
];

const userGrowthData = [
    { name: 'Week 1', users: 12 },
    { name: 'Week 2', users: 19 },
    { name: 'Week 3', users: 25 },
    { name: 'Week 4', users: 34 },
];

const performanceData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-surface border border-border-default rounded-lg p-3 shadow-lg">
                <p className="text-text-primary font-semibold text-sm">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-sm">
                        {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="card-base p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-text-primary">Revenue Trend</h3>
                    <p className="text-text-tertiary text-sm mt-1">Last 7 days performance</p>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                            <XAxis
                                dataKey="name"
                                stroke="#a0aec0"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#a0aec0"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `Rp${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#00d9ff"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Growth */}
            <div className="card-base p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-text-primary">User Growth</h3>
                    <p className="text-text-tertiary text-sm mt-1">Monthly new registrations</p>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                            <XAxis
                                dataKey="name"
                                stroke="#a0aec0"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#a0aec0"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#252d3d' }} />
                            <Bar
                                dataKey="users"
                                fill="#10b981"
                                radius={[8, 8, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Performance Comparison */}
            <div className="card-base p-6 lg:col-span-2">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-text-primary">Performance Analysis</h3>
                    <p className="text-text-tertiary text-sm mt-1">Revenue vs Profit trend over 6 months</p>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                            <XAxis
                                dataKey="name"
                                stroke="#a0aec0"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#a0aec0"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ color: '#a0aec0' }}
                                separator=" • "
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#00d9ff"
                                strokeWidth={2}
                                dot={{ fill: '#00d9ff', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="profit"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ fill: '#6366f1', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
