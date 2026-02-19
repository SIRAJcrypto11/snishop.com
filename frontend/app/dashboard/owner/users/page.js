import { PrismaClient } from '@prisma/client';
import { User, Shield, Search } from 'lucide-react';
import { UserDrawer } from '../../../../components/dashboard/users/UserDrawer';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            include: { adminRole: true }
        });
        return users;
    } catch (error) {
        return [];
    }
}

export default async function UserManager() {
    const users = await getUsers();

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#202124]">User Management</h1>
                    <p className="text-[#5F6368] mt-1">Manage network participants and roles.</p>
                </div>
                <div className="relative group w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5F6368] group-focus-within:text-[#1A73E8] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full md:w-80 pl-12 pr-4 py-3 border border-[#DADCE0] rounded-xl bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all shadow-sm focus:shadow-md"
                    />
                </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F8F9FA] text-[#5F6368]">
                            <tr>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider">User Identity</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider">System Role</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider">Membership</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider">Token Balance</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8EAED]">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#F9FAFB] transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8F0FE] to-[#D2E3FC] flex items-center justify-center text-[#1967D2] font-bold shadow-inner">
                                                {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors text-sm">{user.name || 'Anonymous User'}</p>
                                                <p className="text-xs text-[#5F6368]">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        {user.isOwner ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FCE8E6] text-[#C5221F] rounded-full text-xs font-bold border border-[#FAD2CF] shadow-sm">
                                                <Shield size={12} fill="currentColor" /> OWNER
                                            </span>
                                        ) : user.adminRole ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3E8FD] text-[#9334E6] rounded-full text-xs font-bold border border-[#E9D5FF] shadow-sm">
                                                <Shield size={12} /> {user.adminRole.name}
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-[#F1F3F4] text-[#5F6368] rounded-full text-xs font-bold border border-[#E8EAED]">Customer</span>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border inline-block shadow-sm ${user.membershipTier === 'DIAMOND' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                                                user.membershipTier === 'GOLD' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                            }`}>
                                            {user.membershipTier}
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="font-mono font-bold text-[#202124] bg-[#F1F3F4] px-2 py-1 rounded-md text-sm border border-[#E8EAED]">
                                            {parseFloat(user.snishopBalance).toFixed(2)} SNI
                                        </span>
                                    </td>

                                    <td className="p-5 text-right">
                                        <UserDrawer user={user}>
                                            <button className="text-[#1A73E8] hover:text-[#174EA6] hover:bg-[#E8F0FE] px-4 py-2 rounded-lg text-sm font-bold transition-all">
                                                Manage
                                            </button>
                                        </UserDrawer>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-[#5F6368]">
                                        <div className="flex flex-col items-center justify-center opacity-50">
                                            <User size={48} className="mb-2" />
                                            <p className="font-medium">No users found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5F6368] px-2">
                <p>Showing {users.length} registered users</p>
                <p>Secure Connection • Encrypted Data</p>
            </div>
        </div>
    );
}
