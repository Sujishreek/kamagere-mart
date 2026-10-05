function productArt(label, fill1, fill2) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
            <defs>
                <linearGradient id="bg" x1="0" x2="1">
                    <stop offset="0%" stop-color="${fill1}" />
                    <stop offset="100%" stop-color="${fill2}" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" rx="42" fill="url(#bg)"/>
            <circle cx="150" cy="120" r="80" fill="rgba(255,255,255,0.2)"/>
            <circle cx="650" cy="420" r="140" fill="rgba(255,255,255,0.12)"/>
            <rect x="160" y="150" width="480" height="220" rx="26" fill="rgba(255,255,255,0.18)"/>
            <text x="400" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#fff">${label}</text>
        </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const PRODUCTS = [
    {
        id: 1,
        name: "Aashirvaad Atta",
        category: "Atta & Rice",
        unit: "5 kg",
        price: 285,
        oldPrice: 310,
        discount: 8,
        image: productArt("Aashirvaad Atta", "#d9f99d", "#65a30d"),
        description:
            "Aashirvaad Atta made from quality wheat. Suitable for everyday chapati and roti preparation."
    },

    {
        id: 2,
        name: "India Gate Basmati Rice",
        category: "Atta & Rice",
        unit: "5 kg",
        price: 499,
        oldPrice: 550,
        discount: 9,
        image: productArt("Basmati Rice", "#fef3c7", "#f59e0b"),
        description:
            "Premium quality basmati rice with long grains and a pleasant aroma, suitable for biryani, pulao and everyday meals."
    },

    {
        id: 3,
        name: "Nandini Toned Milk",
        category: "Dairy",
        unit: "1 L",
        price: 56,
        oldPrice: 60,
        discount: 7,
        image: productArt("Toned Milk", "#dbeafe", "#2563eb"),
        description:
            "Fresh toned milk suitable for drinking, tea, coffee, cooking and everyday household use."
    },

    {
        id: 4,
        name: "Amul Butter",
        category: "Dairy",
        unit: "500 g",
        price: 285,
        oldPrice: 310,
        discount: 8,
        image: productArt("Amul Butter", "#fef3c7", "#fbbf24"),
        description:
            "Amul butter with a rich and creamy taste, suitable for breakfast, cooking, baking and snacks."
    },

    {
        id: 5,
        name: "Tata Salt",
        category: "Staples",
        unit: "1 kg",
        price: 28,
        oldPrice: 32,
        discount: 13,
        image: productArt("Tata Salt", "#e2e8f0", "#64748b"),
        description:
            "Iodised salt for everyday cooking and household food preparation."
    },

    {
        id: 6,
        name: "Fortune Sunflower Oil",
        category: "Cooking Oil",
        unit: "1 L",
        price: 145,
        oldPrice: 165,
        discount: 12,
        image: productArt("Sunflower Oil", "#fef9c3", "#facc15"),
        description:
            "Sunflower cooking oil suitable for everyday frying, cooking and food preparation."
    },

    {
        id: 7,
        name: "Maggi Noodles",
        category: "Snacks",
        unit: "280 g",
        price: 65,
        oldPrice: 70,
        discount: 7,
        image: productArt("Maggi Noodles", "#fed7aa", "#f97316"),
        description:
            "Instant noodles that are quick and easy to prepare for a convenient snack or meal."
    },

    {
        id: 8,
        name: "Parle-G Biscuits",
        category: "Snacks",
        unit: "800 g",
        price: 80,
        oldPrice: 90,
        discount: 11,
        image: productArt("Biscuits", "#fde68a", "#d97706"),
        description:
            "Classic glucose biscuits suitable for tea time, snacks and everyday family consumption."
    },

    {
        id: 9,
        name: "Banana",
        category: "Fruits",
        unit: "1 dozen",
        price: 70,
        oldPrice: 80,
        discount: 12,
        image: productArt("Banana", "#fef08a", "#84cc16"),
        description:
            "Fresh bananas suitable for everyday consumption, breakfast and snacks."
    },

    {
        id: 10,
        name: "Tomato",
        category: "Vegetables",
        unit: "1 kg",
        price: 42,
        oldPrice: 50,
        discount: 16,
        image: productArt("Tomato", "#fecaca", "#ef4444"),
        description:
            "Fresh tomatoes suitable for curries, sambar, rasam, salads and everyday cooking."
    },

    {
        id: 11,
        name: "Onion",
        category: "Vegetables",
        unit: "1 kg",
        price: 38,
        oldPrice: 45,
        discount: 16,
        image: productArt("Onion", "#fbcfe8", "#ec4899"),
        description:
            "Fresh onions suitable for everyday cooking, curries, biryani and salads."
    },

    {
        id: 12,
        name: "Surf Excel",
        category: "Household",
        unit: "1 kg",
        price: 155,
        oldPrice: 175,
        discount: 11,
        image: productArt("Surf Excel", "#dbeafe", "#0ea5e9"),
        description:
            "Laundry detergent suitable for everyday washing and household cleaning."
    }
];

module.exports = PRODUCTS;













