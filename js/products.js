/**
 * TM Fashions - Centralized Design Data Configuration File
 * 
 * Instructions to manage designs:
 * - Add a Design: Add a new object key matching the design ID.
 * - Update Image: Modify `images.primary` or `images.gallery`.
 * - Update Stitching Price: Change `stitchingPrice` for the specific design ID.
 * - Remove Design: Delete the corresponding design object.
 */

const DESIGNS_DATA = {
    "design-1": {
        id: "design-1",
        name: "Classic Silk Saree Blouse",
        // Images configuration (Falls back to URL/links if missing or empty)
        images: {
            primary: "images/products/design-1-main.jpg",
            gallery: [
                "images/products/design-1-front.jpg",
                "images/products/design-1-back.jpg",
                "images/products/design-1-side.jpg"
            ]
        },
        stitchingPrice: 1200, // Single standard stitching price for both modes
        sleeveStyles: ["Elbow Length", "Short Sleeves", "Sleeveless", "Full Sleeves"],
        neckDesigns: ["Round Neck", "V-Neck", "Boat Neck", "Square Neck"],
        sizes: ["32", "34", "36", "38", "40", "42"],
        stitchingWithFabric: {
            fabricTypes: [
                { name: "Silk", price: 1500 },
                { name: "Cotton", price: 800 },
                { name: "Georgette", price: 1000 }
            ],
            colors: ["Red", "Blue", "Green", "Gold", "Black"],
            embroideryOptions: [
                { id: "emb-1", name: "Zardosi Handwork", price: 800 },
                { id: "emb-2", name: "Mirror Work", price: 500 }
            ]
        }
    },
    "design-2": {
        id: "design-2",
        name: "Designer Anarkali Suit",
        images: {
            primary: "images/products/design-2-main.jpg",
            gallery: [
                "images/products/design-2-front.jpg",
                "images/products/design-2-back.jpg"
            ]
        },
        stitchingPrice: 1500, // Single standard stitching price for both modes
        sleeveStyles: ["Full Sleeves", "3/4 Sleeves", "Sleeveless"],
        neckDesigns: ["Sweetheart Neck", "V-Neck", "High Neck", "Round Neck"],
        sizes: ["34", "36", "38", "40", "42", "44"],
        stitchingWithFabric: {
            fabricTypes: [
                { name: "Chiffon", price: 1200 },
                { name: "Georgette", price: 1100 },
                { name: "Silk", price: 1800 }
            ],
            colors: ["Pink", "Peach", "Navy Blue", "Maroon"],
            embroideryOptions: [
                { id: "emb-1", name: "Gota Patti", price: 900 },
                { id: "emb-2", name: "Aari Work", price: 700 }
            ]
        }
    }
};

/**
 * Safely fetches design configuration by ID.
 * Falls back to default template if the ID is missing.
 */
function getDesignById(designId) {
    if (DESIGNS_DATA && DESIGNS_DATA[designId]) {
        return DESIGNS_DATA[designId];
    }
    return {
        id: designId || "default-design",
        name: "Custom Design",
        images: {
            primary: "images/products/default.jpg",
            gallery: []
        },
        stitchingPrice: 1000,
        sleeveStyles: ["Short Sleeves", "3/4 Sleeves", "Full Sleeves"],
        neckDesigns: ["Round Neck", "V-Neck"],
        sizes: ["34", "36", "38", "40"],
        stitchingWithFabric: {
            fabricTypes: [{ name: "Standard Fabric", price: 1000 }],
            colors: ["Default Color"],
            embroideryOptions: []
        }
    };
}