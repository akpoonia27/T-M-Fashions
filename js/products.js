/* ============================================================================
   TM FASHIONS — PRODUCT CATALOGUE
   ============================================================================
   This file holds ALL the dresses shown on the website. The entire site reads
   from this one file, so to add / edit / remove a design you only edit here.

   ----------------------------------------------------------------------------
   HOW TO ADD A NEW PRODUCT
   ----------------------------------------------------------------------------
   1. Copy one whole object inside the PRODUCTS array (including the { } and
      the comma after it).
   2. Paste it at the end of the array and change the values (see the guide
      below for what each field means).
   3. Save the file. The new dress appears on the Home page, the Designs page
      and gets its own Product detail page automatically.

   ----------------------------------------------------------------------------
   FIELD GUIDE  (fill in these for every product)
   ----------------------------------------------------------------------------
   id                 → unique number, must be different from every other id
   name               → the dress name shown to customers (e.g. "Rosalind Anarkali")
   designCode         → short code shown under the name (e.g. "EA-014")
   category           → one of: Salwar Suit | Anarkali | Punjabi Suit | Kurti |
                        Palazzo | Sharara | Lehenga | Blouse | Gown |
                        Bridal Wear | Party Wear
   colour             → main colour of the dress (e.g. "Blush Rose")
   occasion           → when it is worn (e.g. "Wedding · Reception")
   fabric             → main fabric (e.g. "Silk Chanderi")
   availableSizes      → array of ready sizes, e.g. ["XS","S","M","L","XL"]
   description         → 1–3 sentence description shown on the detail page
   images              → array of 4–5 photo URLs. Order matters:
                          [0] main image   [1] front view
                          [2] back view    [3] side view   [4] close-up detail
                        Replace the URL with your own photo link if you have one.
   materialCost       → an object with the four material lines shown in the
                        price table on the detail page:
                          fabric      → { quantity, price }
                          lining      → { quantity, price }
                          lace        → { quantity, price }
                          accessories → { price }            (no quantity needed)
   stitchingPrice     → the default stitching cost (number, in rupees)
   deliveryCharge     → almost always 150 (flat pan-India delivery)
   totalPrice         → materialCost total + stitchingPrice + deliveryCharge
                        (the site also re-calculates this live, but keep it
                         correct here so the cards show the right starting price)
   ============================================================================ */


/* ----------------------------------------------------------------------------
   SHARED CUSTOMISATION OPTIONS
   ----------------------------------------------------------------------------
   These appear in the "Customise Your Design" panel on every product page.
   Edit a list here and it updates everywhere. You can also override any of
   these inside a single product by adding the same key to that product.
   ---------------------------------------------------------------------------- */
const CUSTOMIZATION_OPTIONS = {
  fabricTypes: ["Silk", "Chiffon", "Georgette", "Cotton", "Velvet", "Organza", "Net", "Crepe"],
  colours: ["Ivory", "Blush Rose", "Champagne Gold", "Emerald", "Maroon", "Royal Blue", "Mint", "Charcoal"],
  sleeveStyles: ["Sleeveless", "Cap Sleeve", "Short Sleeve", "Three-Quarter", "Full Sleeve", "Bell Sleeve"],
  neckDesigns: ["Round Neck", "V-Neck", "Boat Neck", "High Collar", "Sweetheart", "Keyhole"],
  embroidery: [
    { name: "Hand Work",   price: 1200 },
    { name: "Machine Work", price: 600 },
    { name: "Zari",         price: 1800 },
    { name: "Sequins",      price: 900 },
    { name: "Stone Work",   price: 2200 },
    { name: "Mirror Work", price: 1500 }
  ]
};

/* ----------------------------------------------------------------------------
   STITCHING TIERS  (shown as pricing cards on the product page)
   ---------------------------------------------------------------------------- */
const STITCHING_TIERS = [
  {
    name: "Basic Stitching",
    price: 800,
    description: "Standard fit & finish with neat hemming and basic lining.",
    features: ["Standard measurements", "Plain lining", "Machine finishing", "5–7 day delivery"]
  },
  {
    name: "Designer Stitching",
    price: 1500,
    description: "Tailored silhouette with designer detailing and premium lining.",
    features: ["Custom body fit", "Premium lining", "Designer finishing", "Hook & zip", "7–10 day delivery"],
    popular: true
  },
  {
    name: "Premium Bridal Finish",
    price: 3500,
    description: "Couture-level construction with inner cancan, padding and hand finishing.",
    features: ["Couture construction", "Inner cancan & padding", "Hand finishing", "Fall & picot", "10–14 day delivery"]
  }
];

/* ----------------------------------------------------------------------------
   DELIVERY  (flat across India)
   ---------------------------------------------------------------------------- */
const DELIVERY_CHARGE = 150;


/* ----------------------------------------------------------------------------
   THE PRODUCT CATALOGUE  ←  add / edit dresses below
   ---------------------------------------------------------------------------- */
const _HARDCODED_PRODUCTS = [
  {
    id: 1,
    name: "Rosalind Anarkali",
    designCode: "EA-014",
    category: "Anarkali",
    colour: "Blush Rose",
    occasion: "Festive · Reception",
    fabric: "Silk Chanderi",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A floor-grazing anarkali cut from silk Chanderi, hand-embroidered with resham florals and finished with a gold zari border. The silhouette floats with every step — made for festive evenings and reception celebrations.",
    images: [
      "https://images.pexels.com/photos/14205210/pexels-photo-14205210.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/17040982/pexels-photo-17040982.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/17152210/pexels-photo-17152210.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/19115384/pexels-photo-19115384.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8711176/pexels-photo-8711176.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "3.5 m", price: 4200 },
      lining:      { quantity: "2.5 m", price: 900 },
      lace:        { quantity: "4 m",   price: 1200 },
      accessories: { price: 600 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 2,
    name: "Mehr Bridal Lehenga",
    designCode: "EA-021",
    category: "Bridal Wear",
    colour: "Maroon",
    occasion: "Wedding · Bridal",
    fabric: "Raw Silk",
    availableSizes: ["S", "M", "L", "XL"],
    description: "A heritage bridal lehenga in deep maroon raw silk, dense with gold zardozi and sequin work. Paired with a matching choli and a net dupatta edged in gold — the centrepiece of a bride's trousseau.",
    images: [
      "https://images.pexels.com/photos/12959396/pexels-photo-12959396.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/14683793/pexels-photo-14683793.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/12791932/pexels-photo-12791932.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/38391089/pexels-photo-38391089.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/20883949/pexels-photo-20883949.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "6 m",   price: 9500 },
      lining:      { quantity: "4 m",   price: 1600 },
      lace:        { quantity: "8 m",   price: 2800 },
      accessories: { price: 2200 }
    },
    stitchingPrice: 3500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 3,
    name: "Noor Punjabi Suit",
    designCode: "EA-008",
    category: "Punjabi Suit",
    colour: "Sunshine Yellow",
    occasion: "Daytime · Festive",
    fabric: "Cotton Slub",
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "A breezy Punjabi suit in sunshine yellow cotton slub with phulkari-inspired thread work on the yoke. Straight-cut kurta, matching salwar and a chiffon dupatta — effortless for daytime festivities.",
    images: [
      "https://images.pexels.com/photos/30196701/pexels-photo-30196701.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8770996/pexels-photo-8770996.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8887122/pexels-photo-8887122.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/20604437/pexels-photo-20604437.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/12972006/pexels-photo-12972006.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "4 m",   price: 2400 },
      lining:      { quantity: "2 m",   price: 600 },
      lace:        { quantity: "3 m",   price: 700 },
      accessories: { price: 400 }
    },
    stitchingPrice: 800,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 4,
    name: "Aira Cotton Kurti",
    designCode: "EA-003",
    category: "Kurti",
    colour: "Indigo",
    occasion: "Everyday · Office",
    fabric: "Cotton",
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "An everyday kurti in breathable cotton with a hand-blocked indigo print and a contrast placket. Slim cut, side slits for ease — the piece you reach for on repeat.",
    images: [
      "https://images.pexels.com/photos/13178920/pexels-photo-13178920.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/35521738/pexels-photo-35521738.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/37523792/pexels-photo-37523792.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/37523793/pexels-photo-37523793.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/6276040/pexels-photo-6276040.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "2.5 m", price: 1400 },
      lining:      { quantity: "1 m",   price: 300 },
      lace:        { quantity: "1.5 m", price: 350 },
      accessories: { price: 200 }
    },
    stitchingPrice: 800,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 5,
    name: "Saanjh Palazzo Set",
    designCode: "EA-011",
    category: "Palazzo",
    colour: "Ivory",
    occasion: "Daytime · Festive",
    fabric: "Crepe",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A fluid palazzo set in ivory crepe with a short embroidered kurta and wide-leg trousers. Minimal, modern and endlessly comfortable — a contemporary take on festive dressing.",
    images: [
      "https://images.pexels.com/photos/2659787/pexels-photo-2659787.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/17611651/pexels-photo-17611651.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/32041557/pexels-photo-32041557.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/1149964/pexels-photo-1149964.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/6276032/pexels-photo-6276032.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "4 m",   price: 3200 },
      lining:      { quantity: "2 m",   price: 700 },
      lace:        { quantity: "2.5 m", price: 650 },
      accessories: { price: 350 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 6,
    name: "Gul Sharara Set",
    designCode: "EA-017",
    category: "Sharara",
    colour: "Emerald",
    occasion: "Festive · Mehndi",
    fabric: "Georgette",
    availableSizes: ["S", "M", "L", "XL"],
    description: "A flared sharara in emerald georgette with gota-patti trim and a short embroidered kurti. The trousers sweep beautifully — a festive favourite for mehndi and haldi mornings.",
    images: [
      "https://images.pexels.com/photos/8887117/pexels-photo-8887117.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8140820/pexels-photo-8140820.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8031944/pexels-photo-8031944.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/1322993/pexels-photo-1322993.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/17246956/pexels-photo-17246956.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "5 m",   price: 3600 },
      lining:      { quantity: "3 m",   price: 800 },
      lace:        { quantity: "6 m",   price: 1400 },
      accessories: { price: 500 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 7,
    name: "Zoya Silk Lehenga",
    designCode: "EA-022",
    category: "Lehenga",
    colour: "Champagne Gold",
    occasion: "Reception · Sangeet",
    fabric: "Art Silk",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A champagne-gold lehenga in art silk with delicate sequin scatter and a scalloped hem. Light to wear, luminous to look at — built for reception nights and the sangeet floor.",
    images: [
      "https://images.pexels.com/photos/11726516/pexels-photo-11726516.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/32652561/pexels-photo-32652561.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/37396069/pexels-photo-37396069.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/36489477/pexels-photo-36489477.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/33101418/pexels-photo-33101418.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "5.5 m", price: 6800 },
      lining:      { quantity: "3.5 m", price: 1200 },
      lace:        { quantity: "7 m",   price: 2200 },
      accessories: { price: 1500 }
    },
    stitchingPrice: 3500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 8,
    name: "Ila Designer Blouse",
    designCode: "EA-031",
    category: "Blouse",
    colour: "Royal Blue",
    occasion: "Festive · Saree Pairing",
    fabric: "Velvet",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A statement designer blouse in royal blue velvet with gold zardozi at the neckline and sleeves. Padded, boned and finished to pair with your finest silk saree.",
    images: [
      "https://images.pexels.com/photos/32519307/pexels-photo-32519307.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/19115366/pexels-photo-19115366.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/19664455/pexels-photo-19664455.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/34351520/pexels-photo-34351520.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/4935559/pexels-photo-4935559.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "1.2 m", price: 1800 },
      lining:      { quantity: "1 m",   price: 400 },
      lace:        { quantity: "1.5 m", price: 600 },
      accessories: { price: 800 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 9,
    name: "Tara Evening Gown",
    designCode: "EA-028",
    category: "Gown",
    colour: "Charcoal",
    occasion: "Cocktail · Party",
    fabric: "Velvet",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A floor-length evening gown in charcoal velvet with a cowl neckline and a thigh-high slit. Quietly dramatic — the piece for cocktail nights and gallery openings.",
    images: [
      "https://images.pexels.com/photos/5197764/pexels-photo-5197764.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/3930017/pexels-photo-3930017.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/37191977/pexels-photo-37191977.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/18010396/pexels-photo-18010396.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8751904/pexels-photo-8751904.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "3.5 m", price: 4600 },
      lining:      { quantity: "2.5 m", price: 900 },
      lace:        { quantity: "2 m",   price: 500 },
      accessories: { price: 700 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 10,
    name: "Reyansh Party Gown",
    designCode: "EA-035",
    category: "Party Wear",
    colour: "Wine",
    occasion: "Cocktail · Reception",
    fabric: "Sequin Net",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A shimmering party gown in wine sequin net with a fitted bodice and a gentle flare. Light-reflecting and camera-ready — made for reception after-parties and celebrations.",
    images: [
      "https://images.pexels.com/photos/29069494/pexels-photo-29069494.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/29069491/pexels-photo-29069491.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/13012419/pexels-photo-13012419.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/38279923/pexels-photo-38279923.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/12972006/pexels-photo-12972006.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "4 m",   price: 5200 },
      lining:      { quantity: "2.5 m", price: 800 },
      lace:        { quantity: "1.5 m", price: 400 },
      accessories: { price: 600 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 11,
    name: "Kiara Salwar Suit",
    designCode: "EA-006",
    category: "Salwar Suit",
    colour: "Mint",
    occasion: "Daytime · Festive",
    fabric: "Chanderi Silk",
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "A classic salwar suit in mint Chanderi silk with a printed yoke and contrast dupatta. The timeless straight-cut silhouette, refined for the modern wardrobe.",
    images: [
      "https://images.pexels.com/photos/30876168/pexels-photo-30876168.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/33824984/pexels-photo-33824984.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/19271174/pexels-photo-19271174.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/1322993/pexels-photo-1322993.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8711176/pexels-photo-8711176.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "4.5 m", price: 3000 },
      lining:      { quantity: "2.5 m", price: 700 },
      lace:        { quantity: "3 m",   price: 800 },
      accessories: { price: 400 }
    },
    stitchingPrice: 800,
    deliveryCharge: DELIVERY_CHARGE
  },

  {
    id: 12,
    name: "Anaya Festive Anarkali",
    designCode: "EA-015",
    category: "Anarkali",
    colour: "Royal Blue",
    occasion: "Festive · Reception",
    fabric: "Georgette",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    description: "A layered anarkali in royal blue georgette with a sequined bodice and a net dupatta. Light, flowing and photogenic — designed for festive evenings that go long into the night.",
    images: [
      "https://images.pexels.com/photos/7693907/pexels-photo-7693907.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8531660/pexels-photo-8531660.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8532216/pexels-photo-8532216.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/8531460/pexels-photo-8531460.jpeg?auto=compress&cs=tinysrgb&h=900&w=600",
      "https://images.pexels.com/photos/4935559/pexels-photo-4935559.jpeg?auto=compress&cs=tinysrgb&h=600&w=900"
    ],
    materialCost: {
      fabric:      { quantity: "4 m",   price: 3800 },
      lining:      { quantity: "3 m",   price: 900 },
      lace:        { quantity: "5 m",   price: 1300 },
      accessories: { price: 700 }
    },
    stitchingPrice: 1500,
    deliveryCharge: DELIVERY_CHARGE
  }
];

/* ----------------------------------------------------------------------------
   LOAD PRODUCTS — read from localStorage first (admin-edited data),
   fall back to the hardcoded catalogue above.
   ---------------------------------------------------------------------------- */
let PRODUCTS;
try {
  const stored = JSON.parse(localStorage.getItem("tmf_products"));
  PRODUCTS = (Array.isArray(stored) && stored.length) ? stored : _HARDCODED_PRODUCTS;
} catch (e) {
  PRODUCTS = _HARDCODED_PRODUCTS;
}

/* ----------------------------------------------------------------------------
   HELPER: compute the "starting price" shown on cards
   (material total + default stitching + delivery)
   ---------------------------------------------------------------------------- */
function materialTotal(p) {
  return (p.materialCost?.fabric?.price || 0) +
         (p.materialCost?.lining?.price || 0) +
         (p.materialCost?.lace?.price || 0) +
         (p.materialCost?.accessories?.price || 0);
}
function startingPrice(p) {
  return materialTotal(p) + (p.stitchingPrice || 0) + (p.deliveryCharge || DELIVERY_CHARGE);
}

/* ----------------------------------------------------------------------------
   HELPER: get a product by id
   ---------------------------------------------------------------------------- */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

/* ----------------------------------------------------------------------------
   HELPER: unique category list (used by the filter on the Designs page)
   ---------------------------------------------------------------------------- */
const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

/* expose to other scripts */
if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
  window.CUSTOMIZATION_OPTIONS = CUSTOMIZATION_OPTIONS;
  window.STITCHING_TIERS = STITCHING_TIERS;
  window.DELIVERY_CHARGE = DELIVERY_CHARGE;
  window.CATEGORIES = CATEGORIES;
  window.materialTotal = materialTotal;
  window.startingPrice = startingPrice;
  window.getProductById = getProductById;
}
