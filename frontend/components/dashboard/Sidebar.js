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
            className={`nav-item flex items-center gap-3 rounded-lg transition-all duration-200 group relative ${
                active
                    ? 'nav-item active bg-primary-light text-primary font-semibold border-l-3 border-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
            }`}
        >
            <Icon size={20} className={active ? 'text-primary' : 'text-text-muted group-hover:text-text-secondary transition-colors'} />
            <span className="font-medium flex-1">{name}</span>
            {active && <ChevronRight size={16} className="text-primary" />}
        </Link>
    );

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar fixed left-0 top-0 h-screen w-[280px] bg-surface border-r border-border flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Logo Section */}
                <div className="sidebar-header p-6 border-b border-border flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center font-bold text-white text-sm">
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
                        <p className="nav-label px-3 text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">Menu</p>
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
                            <p className="nav-label px-3 text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">
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
                <div className="p-6 border-t border-border space-y-4 bg-surface-secondary/50">
                    <div className="bg-surface border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-sm font-bold text-text-primary truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-primary capitalize truncate font-medium">{user?.membershipTier || 'Member'}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center gap-3 px-3 py-3 text-danger hover:bg-danger-light rounded-lg transition-all duration-200 font-medium text-sm border border-transparent hover:border-danger/20"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
