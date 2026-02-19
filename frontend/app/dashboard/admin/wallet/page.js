import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../auth'; // Adjust path
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';
import { WithdrawDialog } from '@/components/dashboard/wallet/WithdrawDialog';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getAdminStats(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { commissionBalance: true }
    });

    const completedJobs = await prisma.order.findMany({
        where: {
            handledById: userId,
            status: 'COMPLETED'
        },
        include: { service: true },
        orderBy: { updatedAt: 'desc' }
    });

    // Calculate total earned from history to compare or just show sum
    const totalEarned = completedJobs.reduce((acc, job) => acc + job.commissionPaid, 0);

    return { balance: user.commissionBalance, totalEarned, completedJobs };
}

export default async function AdminWallet() {
    const session = await auth();
    if (!session?.user) return <div>Unauthorized</div>;

    const { balance, totalEarned, completedJobs } = await getAdminStats(session.user.id);


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#202124]">Commission Wallet</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#DADCE0] flex items-center gap-4 shadow-sm">
                    <div className="p-4 bg-[#E8F0FE] rounded-lg text-[#1967D2]">
                        <Wallet size={32} />
                    </div>
                    <div>
                        <p className="text-[#5F6368] font-medium">Available Balance</p>
                        <h2 className="text-2xl font-bold text-[#202124]">IDR {balance.toLocaleString()}</h2>
                    </div>
                    <div className="ml-auto">
                        <WithdrawDialog userId={session.user.id} currentBalance={balance} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#DADCE0] flex items-center gap-4 shadow-sm">
                    <div className="p-4 bg-[#E6F4EA] rounded-lg text-[#137333]">
                        <DollarSign size={32} />
                    </div>
                    <div>
                        <p className="text-[#5F6368] font-medium">Total Earned</p>
                        <h2 className="text-2xl font-bold text-[#202124]">IDR {totalEarned.toLocaleString()}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden mt-8 shadow-sm">
                <div className="p-6 border-b border-[#DADCE0] bg-white">
                    <h3 className="font-bold text-[#202124]">Transaction History</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0] text-[#5F6368] text-sm uppercase font-medium">
                        <tr>
                            <th className="p-4">Service</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Commission</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0]">
                        {completedJobs.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-[#5F6368]">No completed jobs yet.</td>
                            </tr>
                        ) : (
                            completedJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-[#F8F9FA] transition-colors">
                                    <td className="p-4 font-medium text-[#202124]">{job.service.name}</td>
                                    <td className="p-4 text-sm text-[#5F6368]">{new Date(job.updatedAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right font-mono text-[#137333] font-bold">+ IDR {job.commissionPaid.toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
