"use client";
import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { Toaster } from '../../components/ui/toaster';
import Header from '../../components/dashboard/Header';
import '../dashboard.css';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-dashboard text-main flex">
            {/* Desktop Sidebar (Always visible on md+) */}
            <div className="hidden md:block w-[280px] flex-shrink-0">
                {/* Sidebar component determines its own fixed position, 
                     but we need this spacer if we want flex alignment 
                     OR we can just use ml-[280px] on main.
                     
                     The new Sidebar is fixed. So we don't need this wrapper to take space 
                     IF we use ml-[280px] on the main content.
                     
                     Actually, let's keep the Sidebar usage as is, but we might need to 
                     pass a prop or handle mobile state better if Sidebar handles its own visibility.
                     
                     My new Sidebar is: <aside className="fixed ...">
                     It is ALWAYS fixed.
                     
                     So we just need md:ml-[280px] on the main content.
                 */}
                <Sidebar />
            </div>

            {/* Mobile Sidebar (Conditional) */}
            <div className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
                <div className="relative w-[280px] h-full">
                    <Sidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-[280px] transition-all duration-300">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}
