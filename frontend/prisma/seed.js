const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Create Admin Roles
    const roles = [
        {
            name: 'Super Admin',
            description: 'Full Access (Owner Equivalent)',
            canManageUsers: true,
            canManageServices: true,
            canViewReports: true,
            canProcessOrders: true,
            canManagefinance: true,
        },
        {
            name: 'Admin Transaksi',
            description: 'Handle Orders & Payments',
            canManageUsers: false,
            canManageServices: false,
            canViewReports: false,
            canProcessOrders: true,
            canManagefinance: false,
        },
        {
            name: 'Content Creator',
            description: 'Manage Blog & Services',
            canManageUsers: false,
            canManageServices: true,
            canViewReports: false,
            canProcessOrders: false,
            canManagefinance: false,
        },
    ]

    for (const role of roles) {
        await prisma.adminRole.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        })
    }

    // 2. Create Services
    const services = [
        {
            name: 'Turnitin No Repository',
            slug: 'turnitin-no-repo',
            description: 'Check plagiarism without saving to repository.',
            basePrice: 5000,
            category: 'SOFTWARE',
            adminCommission: 1000,
            adminCommissionType: 'FIXED',
        },
        {
            name: 'Canva Pro (1 Year)',
            slug: 'canva-pro-1-year',
            description: 'Upgrade your personal account to Canva Pro.',
            basePrice: 25000,
            category: 'DESIGN',
            adminCommission: 5000,
            adminCommissionType: 'FIXED',
        },
        {
            name: 'Netflix Premium (1 Month)',
            slug: 'netflix-premium-1-month',
            description: 'Shared account, 4K UHD supported.',
            basePrice: 35000,
            category: 'ENTERTAINMENT',
            adminCommission: 2000,
            adminCommissionType: 'FIXED',
        },
        {
            name: 'Desain Logo Professional',
            slug: 'design-logo',
            description: 'Custom logo design with 3 revisions.',
            basePrice: 150000,
            category: 'DESIGN',
            adminCommission: 10,
            adminCommissionType: 'PERCENTAGE',
        },
    ]

    for (const service of services) {
        await prisma.service.upsert({
            where: { slug: service.slug },
            update: {},
            create: service,
        })
    }

    // 3. Create Owner Account
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const owner = await prisma.user.upsert({
        where: { email: 'owner@snishop.id' },
        update: {},
        create: {
            email: 'owner@snishop.id',
            name: 'SNISHOP Owner',
            password: hashedPassword,
            isOwner: true,
            membershipTier: 'DIAMOND',
            snishopBalance: 1000000, // 1M Tokens
            platformCredits: 5000000, // IDR 5jt
        },
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
