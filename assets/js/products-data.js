/**
 * Bramble & Oak Craft Kombucha Taproom & Bottling Co.
 * Product Catalog & Fermentation Data
 * 20 Distinct Artisan Small-Batch Kombuchas
 * Organized by Categories:
 * - Citrus & Zest
 * - Berry Blends
 * - Tropical Fruits
 * - Botanical & Herbal
 * - Ginger & Spice
 * - Seasonal Specials
 */

const BRAMBLE_PRODUCTS = [
  // =========================================================================
  // 1. CITRUS & ZEST
  // =========================================================================
  {
    id: "blood-orange-bergamot",
    name: "Blood Orange Bergamot",
    subtitle: "Sun-Drenched Moro Citrus & Cold-Pressed Bergamot Peel",
    category: "citrus-zest",
    categoryName: "Citrus & Zest",
    badge: "Bestseller",
    badgeColor: "orange",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.50",
    tagline: "Bright bittersweet citrus bursting with aromatic floral bergamot.",
    description: "Cold-fermented with whole-leaf organic black tea, fresh-pressed Sicilian blood orange juice, and cold-pressed bergamot peel essence. Crisp, vibrant, and thirst-quenching with a tangy vinegar snap.",
    abv: "0.3% ABV",
    cfu: "5.4 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Fine Champagne Bubbles (2.8 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Moro Blood Orange", "Calabrian Bergamot", "Wild Thyme", "Cardamom Pod"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Black Tea, Live Probiotic Culture), Blood Orange Juice, Cold-Pressed Bergamot Oil, Crushed Cardamom.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 38,
      totalCarbs: "9g",
      sugars: "6g (unrefined, consumed by culture)",
      aceticAcid: "460mg",
      polyphenols: "210mg"
    },
    pricing: {
      single: 4.50,
      fourPack: 16.50,
      twelvePack: 45.00
    },
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 1
  },
  {
    id: "yuzu-lemon-verbena",
    name: "Yuzu Lemon Verbena",
    subtitle: "Japanese Rare Citrus & Garden-Grown Verbena",
    category: "citrus-zest",
    categoryName: "Citrus & Zest",
    badge: "Tasting Room Pick",
    badgeColor: "amber",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.25",
    tagline: "Ultra-crisp yuzu zest balanced by calming aromatic herbs.",
    description: "Brewed with high-mountain Sencha green tea and cold-pressed Japanese Yuzu juice, steeped with fresh-picked lemon verbena leaves. High acidity, clean carbonation, and an unforgettable citrus nose.",
    abv: "0.2% ABV",
    cfu: "5.2 Billion CFUs",
    ph: "3.1 pH",
    fermentationDuration: "18-Day Cold",
    carbonation: "Lively Sparkle (3.0 Vol)",
    sweetness: 2,
    tartness: 5,
    fizziness: 4,
    notes: ["Japanese Yuzu", "Lemon Verbena", "Kaffir Lime Leaf", "Green Apple"],
    ingredients: "Raw Organic Kombucha (Filtered Spring Water, Organic Sugar, Organic Sencha Green Tea, Living SCOBY), Japanese Yuzu Juice, Lemon Verbena Leaf Extract.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 32,
      totalCarbs: "7g",
      sugars: "5g",
      aceticAcid: "480mg",
      polyphenols: "190mg"
    },
    pricing: {
      single: 4.25,
      fourPack: 15.50,
      twelvePack: 42.00
    },
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 2
  },
  {
    id: "ruby-grapefruit-tarragon",
    name: "Ruby Grapefruit Tarragon",
    subtitle: "Rio Red Grapefruit & French Aniseed Tarragon",
    category: "citrus-zest",
    categoryName: "Citrus & Zest",
    badge: "Cellar Master Choice",
    badgeColor: "orange",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.40",
    tagline: "Tart blushing pink citrus grounded by delicate anise herbal notes.",
    description: "Cold-pressed Texas Rio Red grapefruit juice infused into a white peony tea kombucha base, finished with fresh sweet French tarragon. Crisp, dry, and elegantly complex.",
    abv: "0.25% ABV",
    cfu: "5.1 Billion CFUs",
    ph: "3.0 pH",
    fermentationDuration: "19-Day Cold",
    carbonation: "Effervescent Bead (2.9 Vol)",
    sweetness: 2,
    tartness: 5,
    fizziness: 4,
    notes: ["Rio Red Grapefruit", "French Tarragon", "White Peony Tea", "Lime Blossom"],
    ingredients: "Raw Living Kombucha (Organic White Peony Tea, Mountain Water, Cane Sugar, Heirloom Culture), Ruby Grapefruit Juice, Fresh French Tarragon Infusion.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 34,
      totalCarbs: "8g",
      sugars: "5g",
      aceticAcid: "490mg",
      polyphenols: "230mg"
    },
    pricing: {
      single: 4.40,
      fourPack: 16.00,
      twelvePack: 44.00
    },
    image: "https://plus.unsplash.com/premium_photo-1705369161186-c7ef53e01767?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://plus.unsplash.com/premium_photo-1705369161186-c7ef53e01767?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 13
  },
  {
    id: "calamansi-lime-crush",
    name: "Calamansi Lime Crush",
    subtitle: "Filipino Golden Lime & Crushed Lemongrass",
    category: "citrus-zest",
    categoryName: "Citrus & Zest",
    badge: "Summer Sensation",
    badgeColor: "green",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.30",
    tagline: "Piquant golden lime with an electrifying botanical sour kick.",
    description: "Calamansi citrus—a hybrid of mandarin and kumquat—provides an intense aromatic punch paired with whole crushed lemongrass and cold mountain spring water.",
    abv: "0.2% ABV",
    cfu: "5.0 Billion CFUs",
    ph: "3.0 pH",
    fermentationDuration: "17-Day Cold",
    carbonation: "Sharp Spritz (3.1 Vol)",
    sweetness: 1,
    tartness: 5,
    fizziness: 5,
    notes: ["Calamansi Citrus", "Crushed Lemongrass", "Lime Peel", "Ginger Root"],
    ingredients: "Filtered Living Kombucha (Spring Water, Organic Sugar, Green Tea, SCOBY), Cold-Pressed Calamansi Juice, Fresh Lemongrass Extract.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 28,
      totalCarbs: "6g",
      sugars: "4g",
      aceticAcid: "520mg",
      polyphenols: "180mg"
    },
    pricing: {
      single: 4.30,
      fourPack: 15.75,
      twelvePack: 43.00
    },
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 14
  },

  // =========================================================================
  // 2. BERRY BLENDS
  // =========================================================================
  {
    id: "wild-blackberry-bramble",
    name: "Wild Blackberry Bramble",
    subtitle: "Pacific Northwest Wild Berry & Elderberry Nectar",
    category: "berry-blends",
    categoryName: "Berry Blends",
    badge: "House Signature",
    badgeColor: "purple",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.85",
    tagline: "Deep forest brambleberries steeped with wild elderberries and oolong.",
    description: "Our namesake brew. Hand-harvested Oregon wild blackberries combined with whole elderberries and Darjeeling tea. Rich, deep purple hue with a velvety mouthfeel and natural berry tartness.",
    abv: "0.4% ABV",
    cfu: "5.8 Billion CFUs",
    ph: "3.3 pH",
    fermentationDuration: "24-Day French Oak",
    carbonation: "Fine Micro-Bubble (2.8 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Wild Blackberry", "Black Currant", "Crushed Elderberry", "Vanilla Bark"],
    ingredients: "Raw Kombucha (Living Probiotic Cultures, Mountain Spring Water, Organic Oolong Tea), Pure Oregon Wild Blackberry Puree, Organic Elderberry Juice, Madagascar Vanilla Bean.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 42,
      totalCarbs: "9g",
      sugars: "7g",
      aceticAcid: "440mg",
      polyphenols: "320mg"
    },
    pricing: {
      single: 4.85,
      fourPack: 17.50,
      twelvePack: 48.00
    },
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 3
  },
  {
    id: "marionberry-hibiscus",
    name: "Marionberry Hibiscus",
    subtitle: "Willamette Valley Marionberries & Egyptian Hibiscus Petals",
    category: "berry-blends",
    categoryName: "Berry Blends",
    badge: "Crowd Favorite",
    badgeColor: "rose",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.60",
    tagline: "Vibrant ruby pour bursting with floral tang and sweet-tart berry depth.",
    description: "Whole Egyptian hibiscus calyces steeped with sun-ripened Oregon marionberries and crushed rose hips. Delivers an electric ruby color, high polyphenols, and a thirst-quenching dry finish.",
    abv: "0.3% ABV",
    cfu: "5.6 Billion CFUs",
    ph: "3.1 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Bright Lively Sparkle (3.0 Vol)",
    sweetness: 3,
    tartness: 5,
    fizziness: 4,
    notes: ["Marionberry", "Tart Hibiscus", "Crushed Rose Hips", "Cranberry Zing"],
    ingredients: "Raw Organic Kombucha (Filtered Water, Organic Sugar, Organic Black Tea, Active Cultures), Marionberry Puree, Organic Hibiscus Flower Extract, Organic Rose Hips.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 40,
      totalCarbs: "9g",
      sugars: "7g",
      aceticAcid: "510mg",
      polyphenols: "260mg"
    },
    pricing: {
      single: 4.60,
      fourPack: 16.75,
      twelvePack: 46.00
    },
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 4
  },
  {
    id: "black-currant-acai-vitality",
    name: "Black Currant & Wild Açaí",
    subtitle: "Northern European Ribes & Brazilian Amazon Açaí",
    category: "berry-blends",
    categoryName: "Berry Blends",
    badge: "Antioxidant Rich",
    badgeColor: "indigo",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.90",
    tagline: "Deep violet superfood powerhouse with grounding earthy tannins.",
    description: "Dark, inky black currant berries harvested at first frost combined with wild Brazilian açaí puree. Fermented over toasted American oak staves to develop deep cocoa-berry undertones.",
    abv: "0.4% ABV",
    cfu: "6.8 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "25-Day French Oak",
    carbonation: "Silky Velvet Bubbles (2.7 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 3,
    notes: ["Black Currant", "Wild Açaí", "Cacao Nib", "Toasted Oak Tannin"],
    ingredients: "Raw Living Kombucha (Organic Assam Tea, Spring Water, Cane Sugar, Culture), Black Currant Juice, Organic Açaí Berry Puree.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 44,
      totalCarbs: "10g",
      sugars: "7g",
      aceticAcid: "450mg",
      polyphenols: "380mg"
    },
    pricing: {
      single: 4.90,
      fourPack: 17.75,
      twelvePack: 49.00
    },
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 15
  },
  {
    id: "raspberry-rose-water",
    name: "Raspberry Rose Water",
    subtitle: "Heritage Red Raspberries & Damask Rose Hydrosol",
    category: "berry-blends",
    categoryName: "Berry Blends",
    badge: "Floral Pick",
    badgeColor: "rose",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.55",
    tagline: "Sweet-tart red raspberry aroma with a delicate Turkish rose finish.",
    description: "Macerated red raspberries infuse a bright pink glow into our slow-aged green tea kombucha. A final kiss of pure steam-distilled Damask rose water brings pure romantic elegance.",
    abv: "0.2% ABV",
    cfu: "4.8 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "18-Day Cold",
    carbonation: "Delicate Bead (2.8 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Red Raspberry", "Damask Rose", "Green Tea Leaf", "Wild Honey"],
    ingredients: "Organic Kombucha (Filtered Water, Cane Sugar, Organic Green Tea, Cultures), Pure Red Raspberry Puree, Distilled Rose Petal Hydrosol.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 36,
      totalCarbs: "8g",
      sugars: "6g",
      aceticAcid: "460mg",
      polyphenols: "240mg"
    },
    pricing: {
      single: 4.55,
      fourPack: 16.50,
      twelvePack: 45.50
    },
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 16
  },

  // =========================================================================
  // 3. TROPICAL FRUITS
  // =========================================================================
  {
    id: "guava-passionfruit-bloom",
    name: "Guava Passionfruit Bloom",
    subtitle: "Pink Guava Nectar & Purple Passionfruit Pulp",
    category: "tropical-fruits",
    categoryName: "Tropical Fruits",
    badge: "Tropical Reserve",
    badgeColor: "yellow",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.75",
    tagline: "Exotic lush tropical nectar balanced with electric citric acidity.",
    description: "A sunlit escape. We steep whole tropical pink guava puree with fragrant Ecuadorian purple passionfruit in our light Jasmine green tea kombucha. Unfiltered, cloudy, and packed with vitamins.",
    abv: "0.35% ABV",
    cfu: "6.1 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "20-Day Primary",
    carbonation: "Tropical Champagne (2.9 Vol)",
    sweetness: 4,
    tartness: 4,
    fizziness: 4,
    notes: ["Pink Guava", "Passionfruit Pulp", "Jasmine Flower", "Calamansi"],
    ingredients: "Raw Kombucha (Living Probiotic SCOBY, Water, Organic Sugar, Jasmine Green Tea), Pure Pink Guava Puree, Fresh Passionfruit Juice.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 45,
      totalCarbs: "11g",
      sugars: "8g",
      aceticAcid: "470mg",
      polyphenols: "220mg"
    },
    pricing: {
      single: 4.75,
      fourPack: 17.25,
      twelvePack: 47.50
    },
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 5
  },
  {
    id: "golden-pineapple-mango",
    name: "Golden Pineapple Mango",
    subtitle: "Costa Rican Gold Pineapple & Alphonso Mango",
    category: "tropical-fruits",
    categoryName: "Tropical Fruits",
    badge: "Staff Favorite",
    badgeColor: "amber",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.65",
    tagline: "Juicy golden pineapple with silky mango nectar and oak warmth.",
    description: "Cold-crushed golden pineapples fermented alongside world-renowned Alphonso mangoes. The sweet tropical notes harmonize naturally with the clean lactic acidity of our heirloom yeast cultures.",
    abv: "0.3% ABV",
    cfu: "5.5 Billion CFUs",
    ph: "3.3 pH",
    fermentationDuration: "19-Day Cellar",
    carbonation: "Fine Bubbles (2.8 Vol)",
    sweetness: 4,
    tartness: 3,
    fizziness: 4,
    notes: ["Gold Pineapple", "Alphonso Mango", "Lime Zest", "Coconut Water"],
    ingredients: "Living Organic Kombucha (Water, Organic Black & Green Tea, Sugar, Culture), Pineapple Juice, Pure Alphonso Mango Puree.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 44,
      totalCarbs: "10g",
      sugars: "8g",
      aceticAcid: "430mg",
      polyphenols: "195mg"
    },
    pricing: {
      single: 4.65,
      fourPack: 17.00,
      twelvePack: 46.50
    },
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 6
  },

  // =========================================================================
  // 4. BOTANICAL & HERBAL
  // =========================================================================
  {
    id: "lavender-blue-magic",
    name: "Lavender Blue Magic",
    subtitle: "Sequim French Lavender & Butterfly Pea Flower",
    category: "botanical-herbal",
    categoryName: "Botanical & Herbal",
    badge: "Artisanal",
    badgeColor: "indigo",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.95",
    tagline: "Soothing floral lavender with an enchanting deep indigo hue.",
    description: "Whole culinary lavender blossoms from Washington's Olympic Peninsula steeped with butterfly pea flowers. When poured, it reveals an otherworldly violet-blue shimmer with grounding botanical aromatics.",
    abv: "0.2% ABV",
    cfu: "4.9 Billion CFUs",
    ph: "3.4 pH",
    fermentationDuration: "22-Day Neutral Oak",
    carbonation: "Soft Champagne (2.7 Vol)",
    sweetness: 2,
    tartness: 3,
    fizziness: 3,
    notes: ["French Lavender", "Butterfly Pea Flower", "Lemon Balm", "Chamomile"],
    ingredients: "Raw Kombucha (Water, Sugar, White Tea, SCOBY Culture), Organic Sequim Lavender Flowers, Butterfly Pea Flower Petals, Lemon Balm.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 30,
      totalCarbs: "7g",
      sugars: "4g",
      aceticAcid: "410mg",
      polyphenols: "310mg"
    },
    pricing: {
      single: 4.95,
      fourPack: 17.50,
      twelvePack: 49.00
    },
    image: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 7
  },
  {
    id: "holy-basil-elderflower",
    name: "Holy Basil & Elderflower",
    subtitle: "Organic Tulsi Basil & Wild Austrian Elderberry Blossoms",
    category: "botanical-herbal",
    categoryName: "Botanical & Herbal",
    badge: "Adaptogen Focus",
    badgeColor: "green",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.50",
    tagline: "Crisp botanical adaptogens with sweet floral elderflower sparkle.",
    description: "Krishna Tulsi (holy basil) is legendary in Ayurvedic herbalism for stress relief and cognitive clarity. Blended with fragrant spring elderflowers and crisp Darjeeling green tea.",
    abv: "0.25% ABV",
    cfu: "5.3 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Fine Silk Bubbles (2.9 Vol)",
    sweetness: 2,
    tartness: 4,
    fizziness: 4,
    notes: ["Holy Basil (Tulsi)", "Wild Elderflower", "Spearmint", "Green Cardamom"],
    ingredients: "Living Kombucha (Spring Water, Sugar, Organic Green Tea, SCOBY), Organic Tulsi Basil Extract, Austrian Elderflower Blossom Tea.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 28,
      totalCarbs: "6g",
      sugars: "4g",
      aceticAcid: "460mg",
      polyphenols: "290mg"
    },
    pricing: {
      single: 4.50,
      fourPack: 16.50,
      twelvePack: 45.00
    },
    image: "https://images.unsplash.com/photo-1781773338907-12d05cc3f038?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1781773338907-12d05cc3f038?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 8
  },
  {
    id: "chamomile-lemongrass-calm",
    name: "Chamomile Lemongrass Calm",
    subtitle: "Egyptian Golden Chamomile & Fresh Guatemalan Lemongrass",
    category: "botanical-herbal",
    categoryName: "Botanical & Herbal",
    badge: "Evening Rest",
    badgeColor: "amber",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.25",
    tagline: "Gentle golden chamomile flowers with crisp soothing lemongrass.",
    description: "Whole chamomile flower heads deliver calming apigenin flavonoids, balanced with the crisp citrus lift of hand-harvested lemongrass stalks. Perfect for twilight unwind.",
    abv: "0.15% ABV",
    cfu: "4.6 Billion CFUs",
    ph: "3.4 pH",
    fermentationDuration: "16-Day Neutral Oak",
    carbonation: "Gentle Sparkle (2.6 Vol)",
    sweetness: 2,
    tartness: 3,
    fizziness: 3,
    notes: ["Golden Chamomile", "Fresh Lemongrass", "Wild Honeycomb", "Lemon Thyme"],
    ingredients: "Raw Living Kombucha (Organic White Peony Tea, Mountain Spring Water, Cane Sugar, Heirloom Culture), Chamomile Flower Heads, Lemongrass Stalks.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 26,
      totalCarbs: "6g",
      sugars: "4g",
      aceticAcid: "390mg",
      polyphenols: "210mg"
    },
    pricing: {
      single: 4.25,
      fourPack: 15.50,
      twelvePack: 42.00
    },
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 18
  },

  // =========================================================================
  // 5. GINGER & SPICE
  // =========================================================================
  {
    id: "peruvian-ginger-zing",
    name: "Peruvian Ginger Zing",
    subtitle: "High-Altitude Peruvian Yellow Ginger & Fresh Lime",
    category: "ginger-spice",
    categoryName: "Ginger & Spice",
    badge: "Spicy Classic",
    badgeColor: "amber",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.35",
    tagline: "Fiery ginger heat with a crisp citrus bite and champagne fizz.",
    description: "Peruvian high-elevation yellow ginger is prized worldwide for its intense gingerol warmth and lack of bitterness. We cold-press 30g of fresh raw root into every single bottle.",
    abv: "0.4% ABV",
    cfu: "5.7 Billion CFUs",
    ph: "3.1 pH",
    fermentationDuration: "23-Day Oak",
    carbonation: "Crisp Sharp Fizz (3.2 Vol)",
    sweetness: 2,
    tartness: 4,
    fizziness: 5,
    notes: ["Raw Yellow Ginger", "Key Lime Juice", "Turmeric Root", "Black Peppercorn"],
    ingredients: "Raw Living Kombucha (Spring Water, Sugar, Black Tea, Living SCOBY), Cold-Pressed Peruvian Ginger Juice, Key Lime Juice.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 35,
      totalCarbs: "8g",
      sugars: "5g",
      aceticAcid: "510mg",
      polyphenols: "280mg"
    },
    pricing: {
      single: 4.35,
      fourPack: 16.00,
      twelvePack: 43.50
    },
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 9
  },
  {
    id: "smoked-oak-chai-spice",
    name: "Smoked Oak Chai Spice",
    subtitle: "Single-Estate Assam Black Tea & Smoked Spices",
    category: "ginger-spice",
    categoryName: "Ginger & Spice",
    badge: "Winter Warmth",
    badgeColor: "amber",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$5.25",
    tagline: "Rich malty black tea steeped with whole cinnamon, clove, and oak smoke.",
    description: "Inspired by ancient cellar warming ales. Fermented in heavily charred oak casks with roasted cassia cinnamon bark, green cardamom pods, whole clove, and smoked star anise.",
    abv: "0.45% ABV",
    cfu: "6.4 Billion CFUs",
    ph: "3.3 pH",
    fermentationDuration: "26-Day Toasted Oak",
    carbonation: "Velvet Foam (2.6 Vol)",
    sweetness: 3,
    tartness: 3,
    fizziness: 3,
    notes: ["Cassia Cinnamon", "Charred French Oak", "Green Cardamom", "Whole Clove"],
    ingredients: "Living Kombucha (Filtered Spring Water, Organic Sugar, Assam Black Tea, Culture), Whole Chai Spice Infusion (Cinnamon, Cardamom, Clove, Star Anise, Black Pepper).",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 42,
      totalCarbs: "9g",
      sugars: "6g",
      aceticAcid: "440mg",
      polyphenols: "360mg"
    },
    pricing: {
      single: 5.25,
      fourPack: 19.00,
      twelvePack: 52.00
    },
    image: "https://images.pexels.com/photos/11833310/pexels-photo-11833310.jpeg?auto=compress&cs=tinysrgb&w=800",
    bottleImage: "https://images.pexels.com/photos/11833310/pexels-photo-11833310.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    tapNumber: 10
  },
  {
    id: "cardamom-turmeric-tonic",
    name: "Cardamom Turmeric Tonic",
    subtitle: "Hawaiian Red Turmeric & Crushed Malabar Cardamom",
    category: "ginger-spice",
    categoryName: "Ginger & Spice",
    badge: "Recovery Elixir",
    badgeColor: "yellow",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.70",
    tagline: "Radiant golden wellness elixir with aromatic Indian spice warmth.",
    description: "Cold-crushed fresh Hawaiian turmeric root provides active curcuminoids, boosted by black pepper piperine and fragrant crushed Malabar green cardamom pods.",
    abv: "0.35% ABV",
    cfu: "6.2 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "22-Day Oak",
    carbonation: "Lively Sparkle (3.0 Vol)",
    sweetness: 2,
    tartness: 4,
    fizziness: 4,
    notes: ["Hawaiian Turmeric", "Malabar Cardamom", "Cracked Pepper", "Meyer Lemon"],
    ingredients: "Raw Kombucha (Living SCOBY Cultures, Water, Cane Sugar, Organic Green Tea), Pure Cold-Pressed Turmeric Juice, Cardamom Infusion, Meyer Lemon Juice.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 34,
      totalCarbs: "8g",
      sugars: "5g",
      aceticAcid: "470mg",
      polyphenols: "330mg"
    },
    pricing: {
      single: 4.70,
      fourPack: 17.00,
      twelvePack: 47.00
    },
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 19
  },

  // =========================================================================
  // 6. SEASONAL SPECIALS
  // =========================================================================
  {
    id: "pinot-noir-oak-reserve",
    name: "Pinot Noir Oak Cask Reserve #14",
    subtitle: "Dundee Hills Pinot Noir Grape Must & 45-Day French Oak Cask",
    category: "seasonal-specials",
    categoryName: "Seasonal Specials",
    badge: "Reserve Vintage",
    badgeColor: "purple",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$6.50",
    tagline: "Aged 45 days in French wine casks with wild Willamette grape must.",
    description: "Our crowning seasonal achievement. First-press Pinot Noir grape must from Oregon's Dundee Hills AVA is blended with black and oolong kombucha, then cellar-conditioned for 45 full days in neutral French oak wine barrels.",
    abv: "0.48% ABV",
    cfu: "7.2 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "45-Day Wine Barrel",
    carbonation: "Silky Vintage Micro-Bead (2.7 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Pinot Noir Grape", "French Oak Vanilla", "Black Cherry", "Forest Floor"],
    ingredients: "Raw Oak-Conditioned Kombucha (Spring Water, Organic Sugar, First-Flush Darjeeling & Oolong Tea, Living Cultures), Willamette Valley Pinot Noir Grape Must.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 48,
      totalCarbs: "11g",
      sugars: "8g (unrefined grape must sugars)",
      aceticAcid: "520mg",
      polyphenols: "480mg"
    },
    pricing: {
      single: 6.50,
      fourPack: 24.00,
      twelvePack: 66.00
    },
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 11
  },
  {
    id: "spiced-orchard-cascara",
    name: "Spiced Orchard Cascara",
    subtitle: "Hood River Heirloom Apples & Upcycled Coffee Cherry Tea",
    category: "seasonal-specials",
    categoryName: "Seasonal Specials",
    badge: "Autumn Harvest",
    badgeColor: "amber",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$5.00",
    tagline: "Heirloom crisp cider apples paired with floral dried cascara coffee fruit.",
    description: "Pressed Hood River heirloom apple varieties (Gravenstein and Roxbury Russet) combined with sustainably harvested coffee cherry cascara, bringing a crisp dry cider character.",
    abv: "0.3% ABV",
    cfu: "5.9 Billion CFUs",
    ph: "3.3 pH",
    fermentationDuration: "28-Day Cask",
    carbonation: "Crisp Cider Bead (3.0 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Gravenstein Apple", "Coffee Cherry Cascara", "Nutmeg", "Toasted Oak"],
    ingredients: "Living Kombucha (Mountain Water, Sugar, Organic Black Tea, SCOBY), Fresh Hood River Apple Cider, Organic Cascara Tea Extract, Whole Ground Nutmeg.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 40,
      totalCarbs: "9g",
      sugars: "7g",
      aceticAcid: "470mg",
      polyphenols: "340mg"
    },
    pricing: {
      single: 5.00,
      fourPack: 18.50,
      twelvePack: 50.00
    },
    image: "https://images.unsplash.com/photo-1695606393069-c05c231c69ca?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1695606393069-c05c231c69ca?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 12
  },
  {
    id: "winter-spruce-cranberry",
    name: "Winter Spruce & Cranberry",
    subtitle: "Foraged Oregon Sitka Spruce Tips & Bog Cranberry",
    category: "seasonal-specials",
    categoryName: "Seasonal Specials",
    badge: "Winter Solstice",
    badgeColor: "rose",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$5.50",
    tagline: "Resinous forest pine aroma with mouth-puckering wild red cranberries.",
    description: "Spring-foraged young Sitka spruce tips frozen at peak aroma and infused into winter kombucha alongside tart coastal Oregon cranberries and organic Valencia orange peel.",
    abv: "0.45% ABV",
    cfu: "6.5 Billion CFUs",
    ph: "3.1 pH",
    fermentationDuration: "30-Day Pine & Oak",
    carbonation: "Champagne Effervescence (3.1 Vol)",
    sweetness: 2,
    tartness: 5,
    fizziness: 5,
    notes: ["Sitka Spruce Needles", "Mountain Cranberry", "Valencia Orange Peel", "Oak Bark"],
    ingredients: "Raw Oak-Conditioned Kombucha, Foraged Sitka Spruce Tip Infusion, Pure Wild Cranberry Juice, Organic Orange Zest.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 40,
      totalCarbs: "9g",
      sugars: "6g",
      aceticAcid: "480mg",
      polyphenols: "390mg"
    },
    pricing: {
      single: 5.50,
      fourPack: 20.00,
      twelvePack: 55.00
    },
    image: "https://plus.unsplash.com/premium_photo-1664472743686-4bd63ad502fd?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://plus.unsplash.com/premium_photo-1664472743686-4bd63ad502fd?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 20
  },
  {
    id: "kumquat-meyer-lemon-shrub",
    name: "Kumquat Meyer Lemon Shrub",
    subtitle: "Sweet Meyer Lemon Juice & Sun-Ripened Candied Kumquats",
    category: "citrus-zest",
    categoryName: "Citrus & Zest",
    badge: "New Harvest",
    badgeColor: "orange",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.50",
    tagline: "Sweet-tart California Meyer lemon blended with floral whole kumquats.",
    description: "Crafted with delicate winter Meyer lemons and fragrant golden kumquats macerated whole to release citrus oils and gentle pectin sweetness into oak-conditioned sencha.",
    abv: "0.3% ABV",
    cfu: "5.6 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Silky Champagne Fizz (2.7 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Meyer Lemon", "Sunlit Kumquat", "White Blossom", "Lemon Verbena"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Green Tea, Live Probiotic Culture), Fresh Meyer Lemon Juice, Macerated Golden Kumquats, Lemon Verbena Infusion.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 36,
      totalCarbs: "8g",
      sugars: "5g (unrefined, consumed by culture)",
      aceticAcid: "450mg",
      polyphenols: "220mg"
    },
    pricing: {
      single: 4.50,
      fourPack: 16.50,
      twelvePack: 45.00
    },
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 21
  },
  {
    id: "mango-habanero-agave",
    name: "Mango Habanero Agave",
    subtitle: "Alphonso Mango, Mild Charred Habanero & Blue Agave",
    category: "tropical-fruits",
    categoryName: "Tropical Fruits",
    badge: "Bold Craft",
    badgeColor: "orange",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.75",
    tagline: "Luscious ripe mango sweetness kissed with a gentle, warming habanero glow.",
    description: "Pureed Alphonso mangoes and single-origin Jalisco blue agave nectar, steeped with deseeded, lightly charred orange habaneros for a warm back-palate tickle without overpowering the lush fruit.",
    abv: "0.4% ABV",
    cfu: "5.5 Billion CFUs",
    ph: "3.3 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Fine Effervescence (2.6 Vol)",
    sweetness: 4,
    tartness: 3,
    fizziness: 4,
    notes: ["Alphonso Mango", "Gentle Habanero", "Blue Agave", "Lime Zest"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Black Tea, Live Probiotic Culture), Alphonso Mango Pulp, Organic Blue Agave, Infused Charred Habanero, Fresh Lime Zest.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 42,
      totalCarbs: "10g",
      sugars: "6g (unrefined, consumed by culture)",
      aceticAcid: "440mg",
      polyphenols: "205mg"
    },
    pricing: {
      single: 4.75,
      fourPack: 17.50,
      twelvePack: 47.00
    },
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 23
  },
  {
    id: "rosemary-pear-white-pine",
    name: "Rosemary Pear & White Pine",
    subtitle: "Bartlett Pear Puree, Garden Rosemary & Oregon White Pine Needles",
    category: "botanical-herbal",
    categoryName: "Botanical & Herbal",
    badge: "Forager Special",
    badgeColor: "green",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.50",
    tagline: "Crisp winter pear harmonized with aromatic garden rosemary and pine.",
    description: "A pastoral Northwest homage pairing hand-pressed Bartlett pears with wild-foraged white pine needles and crushed evergreen rosemary, evoking misty morning strolls through pine orchards.",
    abv: "0.3% ABV",
    cfu: "5.7 Billion CFUs",
    ph: "3.3 pH",
    fermentationDuration: "24-Day Oak",
    carbonation: "Fine Oak Bubble (2.7 Vol)",
    sweetness: 3,
    tartness: 3,
    fizziness: 4,
    notes: ["Crisp Bartlett Pear", "Fresh Rosemary", "Oregon White Pine", "Forest Meadow"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Green & White Tea, Live Probiotic Culture), Bartlett Pear Puree, Organic Rosemary Extract, Oregon White Pine Tip Infusion.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 37,
      totalCarbs: "8g",
      sugars: "5g (unrefined, consumed by culture)",
      aceticAcid: "450mg",
      polyphenols: "240mg"
    },
    pricing: {
      single: 4.50,
      fourPack: 16.50,
      twelvePack: 45.00
    },
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 24
  },
  {
    id: "galangal-thai-basil-elixir",
    name: "Galangal Thai Basil Elixir",
    subtitle: "Crushed Galangal Root, Holy Basil & Kaffir Lime Leaf",
    category: "ginger-spice",
    categoryName: "Ginger & Spice",
    badge: "Apothecary",
    badgeColor: "green",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.50",
    tagline: "Piney sharp galangal root balanced with sweet anise basil and citrus leaves.",
    description: "Steeped with Indonesian galangal root (blue ginger) for a complex woodsy kick, blended with purple Thai basil leaves and crushed kaffir lime foliage. Bracing, aromatic, and deeply digestive.",
    abv: "0.3% ABV",
    cfu: "5.9 Billion CFUs",
    ph: "3.1 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Crisp Sparkling (2.8 Vol)",
    sweetness: 2,
    tartness: 4,
    fizziness: 4,
    notes: ["Galangal Root", "Thai Sweet Basil", "Kaffir Lime Leaf", "Peppery Finish"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Black Tea, Live Probiotic Culture), Fresh Galangal Juice, Organic Thai Basil Essence, Kaffir Lime Leaf Extract.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 34,
      totalCarbs: "7g",
      sugars: "4g (unrefined, consumed by culture)",
      aceticAcid: "480mg",
      polyphenols: "250mg"
    },
    pricing: {
      single: 4.50,
      fourPack: 16.50,
      twelvePack: 45.00
    },
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
    featured: false,
    tapNumber: 25
  },
  {
    id: "spiced-fig-dark-honey",
    name: "Spiced Fig & Dark Honey",
    subtitle: "Black Mission Figs, Wildflower Buckwheat Honey & Toasted Nutmeg",
    category: "seasonal-specials",
    categoryName: "Seasonal Specials",
    badge: "Cellar Reserve",
    badgeColor: "orange",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$5.00",
    tagline: "Rich jammy California figs, raw buckwheat honey, and grated autumn nutmeg.",
    description: "A decadent cellar release conditioned for 28 days in neutral oak. Whole ripe Black Mission figs macerate alongside local dark wildflower honey and freshly grated nutmeg, offering wine-like body and velvety warmth.",
    abv: "0.4% ABV",
    cfu: "6.0 Billion CFUs",
    ph: "3.4 pH",
    fermentationDuration: "28-Day Cask",
    carbonation: "Fine Petillant Bubbles (2.4 Vol)",
    sweetness: 4,
    tartness: 3,
    fizziness: 3,
    notes: ["Black Mission Fig", "Dark Honey", "Toasted Nutmeg", "French Oak Tannins"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Assam Tea, Live Probiotic Culture), California Fig Puree, Raw Wildflower Buckwheat Honey, Fresh Ground Nutmeg, Cask Oak.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 45,
      totalCarbs: "11g",
      sugars: "7g (unrefined, consumed by culture)",
      aceticAcid: "420mg",
      polyphenols: "260mg"
    },
    pricing: {
      single: 5.00,
      fourPack: 18.50,
      twelvePack: 50.00
    },
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 26
  },
  {
    id: "yuzu-ginger-zing",
    name: "Yuzu Ginger Zing",
    subtitle: "Organic Sencha, Peruvian Yellow Ginger & Japanese Yuzu",
    category: "ginger-spice",
    categoryName: "Ginger & Spice",
    badge: "Flagship Pour",
    badgeColor: "orange",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.00",
    tagline: "Bright tart yuzu balanced by spicy Peruvian mountain ginger.",
    description: "Organic Sencha green tea base, cold-pressed Peruvian yellow ginger, and aromatic Japanese yuzu juice. Crisp, tart, and delightfully warming.",
    abv: "0.4% ABV",
    cfu: "5.4 Billion CFUs",
    ph: "3.2 pH",
    fermentationDuration: "21-Day Oak",
    carbonation: "Fine Champagne Bubbles (2.8 Vol)",
    sweetness: 2,
    tartness: 4,
    fizziness: 4,
    notes: ["Spicy Ginger", "Yuzu Zest", "Honey Blossom"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Sencha Green Tea, Living SCOBY), Cold-Pressed Peruvian Yellow Ginger, Japanese Yuzu Juice.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 35,
      totalCarbs: "8g",
      sugars: "5g",
      aceticAcid: "470mg",
      polyphenols: "205mg"
    },
    pricing: {
      single: 4.00,
      fourPack: 16.00,
      twelvePack: 44.00
    },
    image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 3
  },
  {
    id: "hibiscus-rose-hip",
    name: "Hibiscus Rose Hip",
    subtitle: "Egyptian Hibiscus Calyces, Organic Rose Hips & Elderberry",
    category: "berry-blends",
    categoryName: "Berry Blends",
    badge: "Crowd Favorite",
    badgeColor: "rose",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.00",
    tagline: "Ruby red botanical infusion bursting with wild berries and floral tartness.",
    description: "Egyptian hibiscus calyces, organic whole rose hips, and crushed wild elderberry puree. Tart, refreshing, and deeply restorative.",
    abv: "0.3% ABV",
    cfu: "5.8 Billion CFUs",
    ph: "3.1 pH",
    fermentationDuration: "18-Day Cold",
    carbonation: "Effervescent Sparkle (3.0 Vol)",
    sweetness: 3,
    tartness: 4,
    fizziness: 4,
    notes: ["Wild Rose", "Elderberry", "Ruby Tart"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Organic Oolong Tea, Living SCOBY), Egyptian Hibiscus, Organic Whole Rose Hips, Wild Elderberry Puree.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 36,
      totalCarbs: "8g",
      sugars: "5g",
      aceticAcid: "480mg",
      polyphenols: "220mg"
    },
    pricing: {
      single: 4.00,
      fourPack: 16.00,
      twelvePack: 44.00
    },
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 6
  },
  {
    id: "smoked-oak-chaga",
    name: "Smoked Oak Chaga",
    subtitle: "Charred Virgin Oak Barrels & Wild Siberian Chaga",
    category: "botanical-herbal",
    categoryName: "Botanical & Herbal",
    badge: "Oak Cellar",
    badgeColor: "emerald",
    bottleSize: "12 fl oz (355ml)",
    priceDisplay: "$4.88",
    tagline: "Earthy, velvety, and complex with toasted vanilla and charred wood smoke.",
    description: "Charred virgin American oak barrels, wild Siberian chaga mushrooms, and vanilla bark infusion. A sophisticated, savory cellar pour.",
    abv: "0.5% ABV",
    cfu: "4.9 Billion CFUs",
    ph: "3.4 pH",
    fermentationDuration: "28-Day Cask",
    carbonation: "Fine Micro-Bubbles (2.4 Vol)",
    sweetness: 2,
    tartness: 3,
    fizziness: 3,
    notes: ["Wild Chaga", "Charred Oak", "Vanilla Bark"],
    ingredients: "Raw Organic Kombucha (Mountain Spring Water, Organic Cane Sugar, Wild Foraged Black Tea, Living SCOBY), Siberian Chaga Mushroom Extract, Toasted Oak Essence, Organic Vanilla Bean.",
    nutrition: {
      servingSize: "12 fl oz (355ml)",
      calories: 40,
      totalCarbs: "7g",
      sugars: "4g",
      aceticAcid: "440mg",
      polyphenols: "260mg"
    },
    pricing: {
      single: 4.88,
      fourPack: 19.50,
      twelvePack: 54.00
    },
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=800",
    bottleImage: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=800",
    featured: true,
    tapNumber: 15
  }
];

// Aliases for compatibility with existing scripts
const ZYMA_PRODUCTS = BRAMBLE_PRODUCTS;

const PRODUCT_ID_ALIASES = {
  'yuzu-ginger-zing': 'yuzu-ginger-zing',
  'peruvian-ginger-zing': 'yuzu-ginger-zing',
  'hibiscus-rose-hip': 'hibiscus-rose-hip',
  'marionberry-hibiscus': 'hibiscus-rose-hip',
  'smoked-oak-chaga': 'wild-blackberry-bramble',
  'smoked-oak-chai-spice': 'wild-blackberry-bramble',
  'lavender-blue-magic': 'blood-orange-bergamot'
};

// Resilient lookup utility with alias support and fuzzy matching
function getProductById(id) {
  if (!id) return null;
  // 1. Direct match
  let product = BRAMBLE_PRODUCTS.find(p => p.id === id);
  if (product) return product;

  // 2. Alias match
  const aliasId = PRODUCT_ID_ALIASES[id];
  if (aliasId) {
    product = BRAMBLE_PRODUCTS.find(p => p.id === aliasId);
    if (product) return product;
  }

  // 3. Normalized fuzzy match (ignoring dashes and casing)
  const clean = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  product = BRAMBLE_PRODUCTS.find(p => 
    p.id.toLowerCase().replace(/[^a-z0-9]/g, '') === clean ||
    p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === clean
  );
  return product || null;
}

// Category filter utility
function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return BRAMBLE_PRODUCTS;
  return BRAMBLE_PRODUCTS.filter(p => p.category === cat);
}
