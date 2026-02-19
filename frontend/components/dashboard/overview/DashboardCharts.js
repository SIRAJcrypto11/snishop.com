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
    Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

// Mock data for initial implementation (Phase 10)
// In a real scenario, this would come from a Server Action or API
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

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border-[#DADCE0] shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-[#202124]">Revenue Trend (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#1A73E8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EAED" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#5F6368"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#5F6368"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `Rp${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #DADCE0' }}
                                    itemStyle={{ color: '#202124' }}
                                    formatter={(value) => [`IDR ${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#1A73E8"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-[#DADCE0] shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg text-[#202124]">New User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EAED" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#5F6368"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#5F6368"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F1F3F4' }}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #DADCE0' }}
                                />
                                <Bar
                                    dataKey="users"
                                    fill="#34A853"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
