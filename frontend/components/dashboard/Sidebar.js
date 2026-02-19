"use client";
import React from 'react';
import { Home, ShoppingBag, Wallet, Grid, Shield, LogOut, Briefcase, Users, Settings, ChevronRight, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar({ isOpen = true, onClose }) {
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

    const NavItem = ({ icon: Icon, name, path, isActive: active }) => (
        <Link
            href={path}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                active
                    ? 'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 text-accent-primary border border-accent-primary/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
            }`}
        >
            <Icon size={20} className={active ? 'text-accent-primary' : 'text-text-tertiary group-hover:text-text-secondary transition-colors'} />
            <span className="font-medium flex-1">{name}</span>
            {active && <ChevronRight size={16} className="text-accent-primary" />}
        </Link>
    );

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-screen w-[280px] bg-surface border-r border-border-default flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Logo Section */}
                <div className="p-6 border-b border-border-default flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center font-bold text-black">
                            S
                        </div>
                        <span className="font-bold text-lg text-text-primary hidden sm:inline">SNISHOP</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-surface-secondary rounded-lg transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={20} className="text-text-secondary" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
                    {/* Customer Menu */}
                    <div className="space-y-2">
                        <p className="px-3 text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Menu</p>
                        {customerItems.map((item) => (
                            <NavItem
                                key={item.path}
                                icon={item.icon}
                                name={item.name}
                                path={item.path}
                                isActive={isActive(item.path)}
                            />
                        ))}
                    </div>

                    {/* Admin/Owner Menu */}
                    {adminItems.length > 0 && (
                        <div className="space-y-2">
                            <p className="px-3 text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">
                                {user?.isOwner ? 'Owner Panel' : 'Admin Workspace'}
                            </p>
                            {adminItems.map((item) => (
                                <NavItem
                                    key={item.path}
                                    icon={item.icon}
                                    name={item.name}
                                    path={item.path}
                                    isActive={isActive(item.path)}
                                />
                            ))}
                        </div>
                    )}
                </nav>

                {/* User Profile Section */}
                <div className="p-6 border-t border-border-default space-y-4 bg-surface-secondary/50 backdrop-blur-sm">
                    <div className="bg-surface border border-border-default rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-secondary to-accent-tertiary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-sm font-bold text-text-primary truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-accent-primary capitalize truncate font-medium">{user?.membershipTier || 'Member'}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center gap-3 px-3 py-3 text-danger hover:bg-danger/10 rounded-lg transition-all duration-200 font-medium text-sm hover:border-danger/20 border border-transparent"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
