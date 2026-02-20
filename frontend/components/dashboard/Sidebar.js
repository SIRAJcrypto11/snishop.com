"use client";
import React from 'react';
import { Home, ShoppingBag, Wallet, Grid, Shield, LogOut, Briefcase, Users, Settings, ChevronRight, X, Sparkles } from 'lucide-react';
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
            { name: 'Owner Overview', path: '/dashboard/owner', icon: Sparkles },
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
            className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative font-semibold ${
                active
                    ? 'text-primary font-bold border-l-3 border-primary pl-2.5 bg-gradient-to-r from-primary/10 to-transparent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:translate-x-1'
            }`}
        >
            <Icon size={20} className={active ? 'text-primary' : 'text-text-muted'} />
            <span className="flex-1">{name}</span>
            {active && <ChevronRight size={18} className="text-primary animate-pulse" />}
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

            {/* Premium Sidebar */}
            <aside className={`sidebar fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-surface via-white to-surface-secondary border-r border-border flex flex-col z-50 transition-transform duration-300 md:translate-x-0 shadow-lg ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Premium Logo Section */}
                <div className="sidebar-header p-6 border-b border-border-light flex items-center justify-between bg-gradient-to-br from-white to-surface-secondary">
                    <Link href="/" className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-xl gradient-blue-purple flex items-center justify-center font-bold text-white text-lg shadow-md">
                            S
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="font-black text-lg bg-gradient-to-r from-primary to-purple bg-clip-text text-transparent">SNISHOP</span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Dashboard</span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-surface-secondary rounded-lg transition-all"
                        aria-label="Close sidebar"
                    >
                        <X size={20} className="text-text-secondary" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                    {/* Customer Menu */}
                    <div className="space-y-1.5">
                        <p className="nav-label px-3 text-xs font-bold text-text-tertiary uppercase tracking-widest">Menu</p>
                        <div className="space-y-1">
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
                    </div>

                    {/* Admin/Owner Menu */}
                    {adminItems.length > 0 && (
                        <div className="space-y-1.5 pt-4 border-t border-border-light">
                            <p className="nav-label px-3 text-xs font-bold text-text-tertiary uppercase tracking-widest">
                                {user?.isOwner ? 'Owner Panel' : 'Admin Workspace'}
                            </p>
                            <div className="space-y-1">
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
                        </div>
                    )}
                </nav>

                {/* Premium User Profile Section */}
                <div className="p-4 border-t border-border-light space-y-3 bg-gradient-to-t from-surface-secondary to-transparent">
                    <div className="gradient-blue-purple rounded-xl p-4 space-y-3 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-sm font-bold text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-xs opacity-90 capitalize truncate font-medium">{user?.membershipTier || 'Member'}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 text-danger hover:bg-danger-light rounded-lg transition-all duration-200 font-bold text-sm uppercase tracking-wide border border-transparent hover:border-danger/20"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
