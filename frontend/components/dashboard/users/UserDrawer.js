'use client';

import { useState } from 'react';
import { User, Shield, Package, Clock, DollarSign } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter
} from "../../ui/sheet"
import { getUserDetails, updateUserRole } from '../../../app/actions/users';

export function UserDrawer({ user, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleOpen(open) {
        setIsOpen(open);
        if (open && !details) {
            setLoading(true);
            const data = await getUserDetails(user.id);
            setDetails(data);
            setLoading(false);
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="overflow-y-auto w-[400px] sm:w-[540px]">
                <SheetHeader className="mb-6">
                    <SheetTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#1967D2]">
                            <User size={20} />
                        </div>
                        <div>
                            <p>{user.name}</p>
                            <SheetDescription>{user.email}</SheetDescription>
                        </div>
                    </SheetTitle>
                </SheetHeader>

                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-40 w-full" />
                    </div>
                ) : details ? (
                    <div className="space-y-8">
                        {/* Status Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8F9FA]">
                                <p className="text-xs text-[#5F6368] uppercase font-bold mb-1">Balance</p>
                                <p className="text-lg font-mono font-bold text-[#202124]">
                                    {(details.snishopBalance || 0).toFixed(2)} SNI
                                </p>
                            </div>
                            <div className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8F9FA]">
                                <p className="text-xs text-[#5F6368] uppercase font-bold mb-1">Membership</p>
                                <Badge variant="secondary">{details.membershipTier}</Badge>
                            </div>
                        </div>

                        {/* Role Management */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2">
                                <Shield size={16} /> Role & Permissions
                            </h3>
                            <div className="p-4 border border-[#DADCE0] rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-[#202124]">
                                        {details.isOwner ? 'Owner (God Mode)' : 'Standard User'}
                                    </p>
                                    <p className="text-xs text-[#5F6368]">
                                        {details.isOwner ? 'Full system access' : 'Restricted access'}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Manage Role
                                </Button>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2">
                                <Package size={16} /> Recent Orders
                            </h3>
                            {details.orders && details.orders.length > 0 ? (
                                <div className="border border-[#DADCE0] rounded-xl overflow-hidden">
                                    {details.orders.map((order) => (
                                        <div key={order.id} className="p-3 border-b border-[#DADCE0] last:border-0 hover:bg-[#F8F9FA] transition-colors flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-sm text-[#202124]">{order.service.name}</p>
                                                <p className="text-xs text-[#5F6368]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <Badge variant={order.status === 'COMPLETED' ? 'success' : 'secondary'}>
                                                {order.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[#5F6368] italic">No recent orders.</p>
                            )}
                        </div>

                        {/* Activity Logs */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2">
                                <Clock size={16} /> Recent Activity
                            </h3>
                            <div className="space-y-2">
                                {details.logs && details.logs.map((log) => (
                                    <div key={log.id} className="flex gap-3 text-sm">
                                        <span className="text-[#5F6368] min-w-[80px] text-xs">
                                            {new Date(log.createdAt).toLocaleTimeString()}
                                        </span>
                                        <span className="text-[#202124]">{log.action}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">Failed to load user details.</p>
                )}
            </SheetContent>
        </Sheet>
    );
}
