'use client';

import React from 'react';

export function SkeletonLoader() {
    return (
        <div className="space-y-4">
            <div className="skeleton h-12 rounded-lg w-full"></div>
            <div className="skeleton h-48 rounded-lg w-full"></div>
        </div>
    );
}

export function StatCardSkeleton() {
    return (
        <div className="card-base p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div className="skeleton h-10 w-10 rounded-lg"></div>
                <div className="skeleton h-6 w-6 rounded"></div>
            </div>
            <div className="skeleton h-4 w-24 rounded"></div>
            <div className="skeleton h-8 w-32 rounded"></div>
            <div className="skeleton h-4 w-20 rounded"></div>
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="card-base p-6">
            <div className="mb-6 space-y-2">
                <div className="skeleton h-5 w-40 rounded"></div>
                <div className="skeleton h-4 w-60 rounded"></div>
            </div>
            <div className="h-80 w-full skeleton rounded-lg"></div>
        </div>
    );
}

export function TransactionRowSkeleton() {
    return (
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <div className="skeleton h-12 w-12 rounded-lg"></div>
                <div className="space-y-2 flex-1">
                    <div className="skeleton h-4 w-32 rounded"></div>
                    <div className="skeleton h-3 w-24 rounded"></div>
                </div>
            </div>
            <div className="text-right space-y-2">
                <div className="skeleton h-5 w-24 rounded ml-auto"></div>
                <div className="skeleton h-4 w-20 rounded ml-auto"></div>
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="skeleton h-10 w-64 rounded"></div>
                <div className="skeleton h-4 w-96 rounded"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>

            {/* Transactions */}
            <div className="card-base p-6 space-y-4">
                <div className="skeleton h-6 w-40 rounded"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <TransactionRowSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
