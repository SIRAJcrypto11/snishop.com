"use client";
import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { Toaster } from '../../components/ui/toaster';
import Header from '../../components/dashboard/Header';
import '../dashboard.css';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-background text-text-primary flex">
            {/* Desktop Sidebar (Always visible on md+) */}
            <div className="hidden md:block w-[280px] flex-shrink-0">
                <Sidebar isOpen={true} onClose={closeSidebar} />
            </div>

            {/* Mobile Sidebar (Conditional) */}
            <div className="md:hidden">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-6 overflow-auto bg-background">
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}
