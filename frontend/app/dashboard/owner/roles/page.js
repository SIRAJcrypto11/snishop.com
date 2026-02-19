import { PrismaClient } from '@prisma/client';
import { Shield, Lock, CheckCircle, XCircle } from 'lucide-react';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getRoles() {
    const roles = await prisma.adminRole.findMany({
        include: {
            _count: {
                select: { users: true }
            }
        }
    });
    return roles;
}

export default async function RoleManager() {
    const contentRoles = await getRoles();

    // Singularity Transform: Adapt Prisma Schema to UI Requirements
    const roles = contentRoles.map(role => ({
        ...role,
        usersCount: role._count?.users || 0,
        permissions: [
            role.canManageUsers && 'Manage Users',
            role.canManageServices && 'Manage Services',
            role.canViewReports && 'View Reports',
            role.canProcessOrders && 'Process Orders',
            role.canManagefinance && 'Manage Finance'
        ].filter(Boolean)
    }));

    const PermissionItem = ({ label, active }) => (
        <div className={`flex items-center gap-2 text-sm ${active ? 'text-green-400' : 'text-gray-600'}`}>
            {active ? <CheckCircle size={14} /> : <XCircle size={14} />}
            <span>{label}</span>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#202124]">Roles & Permissions</h1>
                    <p className="text-[#5F6368] mt-1">Define access levels and security clearances for the platform.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1557B0] transition-colors shadow-sm">
                    <Shield size={18} />
                    <span>Create New Role</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map(role => (
                    <div key={role.id} className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col min-w-0">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Lock size={100} className="text-[#202124] -rotate-12" />
                        </div>

                        <div className="relative z-10 mb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-[#E8F0FE] rounded-xl text-[#1967D2] shadow-sm">
                                    <Shield size={24} />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${role.name.includes('Admin') ? 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]' : 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]'}`}>
                                    {role.usersCount} Active Users
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#202124] mb-1">{role.name}</h3>
                            <p className="text-[#5F6368] text-sm">{role.type || 'Custom Role'}</p>
                        </div>

                        <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E8EAED] mb-6 flex-grow">
                            <p className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CheckCircle size={12} className="text-[#137333]" />
                                Granted Permissions
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map(perm => (
                                    <span key={perm} className="text-xs font-bold bg-white text-[#3C4043] px-2 py-1 rounded border border-[#DADCE0] shadow-sm">
                                        {perm}
                                    </span>
                                ))}
                                {role.permissions.length === 0 && (
                                    <span className="text-xs text-[#5F6368] italic">No specific permissions granted.</span>
                                )}
                            </div>
                        </div>

                        <button className="w-full py-3 border border-[#DADCE0] rounded-lg text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors font-bold mt-auto flex items-center justify-center gap-2 group-hover:border-[#1A73E8]/30">
                            Configure Access
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
