import { PrismaClient } from '@prisma/client';
import { User, Shield, Search, Mail, Calendar, MoreVertical, Edit, Trash2, Filter } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Management</h1>
            <p className="text-slate-500 mt-2 font-medium">Oversee your network participants and system access.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: users.length, color: 'indigo' },
            { label: 'Active Today', value: Math.floor(users.length * 0.8), color: 'emerald' },
            { label: 'New This Week', value: Math.floor(users.length * 0.1), color: 'amber' },
            { label: 'Pending Verif', value: 0, color: 'slate' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Table Container */}
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">User Details</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Access Level</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Membership</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                            {user.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name || 'Anonymous User'}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <Mail size={12} />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {user.isOwner ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-tighter border border-rose-100 shadow-sm shadow-rose-50">
                          <Shield size={12} className="fill-current" /> System Owner
                        </span>
                      ) : user.adminRole ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-tighter border border-indigo-100 shadow-sm shadow-indigo-50">
                          <Shield size={12} /> {user.adminRole.name}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                          Standard User
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter border shadow-sm ${
                        user.membershipTier === 'DIAMOND' ? 'bg-cyan-50 text-cyan-700 border-cyan-100' :
                        user.membershipTier === 'GOLD' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {user.membershipTier}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <UserDrawer user={user}>
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                            <Edit size={18} />
                          </button>
                        </UserDrawer>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total {users.length} Records
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
