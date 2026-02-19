"use client";
import React from 'react';
import { Home, ShoppingBag, Wallet, Grid, Shield, LogOut, Briefcase, Users, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;

    const isActive = (path) => pathname === path;

    // Default Customer Links
    const customerItems = [
        { name: 'Overview', path: '/dashboard', icon: Home },
        { name: 'Buy Token', path: '/dashboard/presale', icon: ShoppingBag },
        { name: 'My Wallet', path: '/dashboard/wallet', icon: Wallet },
        { name: 'Services', path: '/dashboard/services', icon: Grid },
    ];

    // Admin / Owner Links
    const adminItems = [];

    if (user?.isOwner) {
        adminItems.push(
            { name: 'Owner Overview', path: '/dashboard/owner', icon: Shield },
            { name: 'User Manager', path: '/dashboard/owner/users', icon: Users },
            { name: 'Service Manager', path: '/dashboard/owner/services', icon: Settings },
            { name: 'Roles & Perms', path: '/dashboard/owner/roles', icon: Shield },
        );
    } else if (user?.adminRole) {
        adminItems.push(
            { name: 'Job Board', path: '/dashboard/admin/jobs', icon: Briefcase },
            { name: 'My Active Jobs', path: '/dashboard/admin/jobs/active', icon: Briefcase },
            { name: 'Commission Wallet', path: '/dashboard/admin/wallet', icon: Wallet },
        );
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-[#DADCE0] flex flex-col z-50 shadow-sm">
            <div className="p-6 border-b border-[#DADCE0]">
                <Link href="/" className="block">
                    <img src="/assets/logo snishop/Logo snishop biru panjang.png" alt="SNISHOP" className="h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = 'SNISHOP NETWORK' }} />
                </Link>
            </div>

            <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
                <div className="space-y-2">
                    <p className="px-3 text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-2">Menu</p>
                    {customerItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${active
                                    ? 'bg-[#E8F0FE] text-[#1A73E8]'
                                    : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
                                    }`}
                            >
                                <Icon size={20} className={active ? 'text-[#1A73E8]' : 'text-[#5F6368] group-hover:text-[#202124] transition-colors'} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {adminItems.length > 0 && (
                    <div className="space-y-2">
                        <p className="px-3 text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-2">
                            {user?.isOwner ? 'Owner Panel' : 'Admin Workspace'}
                        </p>
                        {adminItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${active
                                        ? 'bg-[#FCE8E6] text-[#D93025]'
                                        : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
                                        }`}
                                >
                                    <Icon size={20} className={active ? 'text-[#D93025]' : 'text-[#5F6368] group-hover:text-[#202124] transition-colors'} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>

            <div className="p-6 border-t border-[#DADCE0] mt-auto bg-white">
                <div className="bg-[#F8F9FA] rounded-xl p-4 mb-4 border border-[#E8EAED] shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#4285F4] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-[#202124] truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-[#1A73E8] capitalize truncate font-medium">{user?.membershipTier || 'Member'}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center justify-center gap-3 px-3 py-3 text-[#EA4335] hover:bg-[#FCE8E6] rounded-lg transition-all duration-200 font-medium hover:shadow-sm"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
