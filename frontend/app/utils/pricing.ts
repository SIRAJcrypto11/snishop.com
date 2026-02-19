export const TIERS = {
    BRONZE: { name: 'Bronze', discount: 0 },
    SILVER: { name: 'Silver', discount: 0.05 },
    GOLD: { name: 'Gold', discount: 0.10 },
    PLATINUM: { name: 'Platinum', discount: 0.20 },
    DIAMOND: { name: 'Diamond', discount: 0.25 }, // 25% Discount + 0% Fees
};

export function calculatePrice(basePrice: number, tier: string = 'BRONZE') {
    const tierKey = tier.toUpperCase();
    const discountRate = TIERS[tierKey]?.discount || 0;
    const discountAmount = basePrice * discountRate;
    const finalPrice = basePrice - discountAmount;

    return {
        originalPrice: basePrice,
        discountRate: discountRate * 100, // Percentage
        finalPrice: Math.floor(finalPrice), // Round down to avoid decimals
        savedAmount: Math.floor(discountAmount),
    };
}
