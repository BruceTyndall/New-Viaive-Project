export type Hotel = {
  name: string;
  neighborhood: string;
  note: string;
  tier: "Suite" | "Villa" | "Resort" | "Buyout";
};

export type Watch2026 = { kind: "Opening" | "Refurb" | "Watch"; title: string; note: string };

export type DestinationConfig = {
  slug: string;
  city: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  bestMonths: string;
  leadTime: string;
  readMinutes: number;
  lastReviewed: string;
  heroEyebrow: string;
  h1: string;
  h1Italic: string;
  geoAnswer: string;
  hotels: Hotel[];
  watch2026: Watch2026[];
  sections: { h2: string; body: string }[]; // body uses {{Hotel Name}} markers
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaBody: string;
  conciergeIntent: string;
};

export const DESTINATIONS: DestinationConfig[] = [
  {
    slug: "maldives",
    city: "Maldives",
    country: "Indian Ocean",
    region: "Asia",
    lat: 3.2028,
    lng: 73.2207,
    bestMonths: "Nov – Apr",
    leadTime: "9–12 months · Soneva, Cheval Blanc, One&Only",
    readMinutes: 8,
    lastReviewed: "Feb 2026",
    heroEyebrow: "Field Guide · Maldives · Last reviewed Feb 2026",
    h1: "The Maldives Resort Decision.",
    h1Italic: "Twelve atolls, one right placement.",
    geoAnswer:
      "Luxury travelers stay at Soneva Jani, Cheval Blanc Randheli, One&Only Reethi Rah or Joali for villa-quality. Visit November–April. Book 9–12 months ahead. Atoll choice matters more than brand.",
    hotels: [
      { name: "Soneva Jani", neighborhood: "Noonu Atoll", note: "Retractable roofs, water slides, the kindest service in the country", tier: "Villa" },
      { name: "Soneva Fushi", neighborhood: "Baa Atoll · UNESCO", note: "Original barefoot-luxury standard; cinema in the jungle", tier: "Villa" },
      { name: "Cheval Blanc Randheli", neighborhood: "Noonu Atoll", note: "LVMH service, Guerlain spa, the most refined property in the Indian Ocean", tier: "Villa" },
      { name: "One&Only Reethi Rah", neighborhood: "North Malé · 50min boat", note: "Largest villas in the Maldives; spectacular reef", tier: "Villa" },
      { name: "Joali Maldives", neighborhood: "Raa Atoll", note: "Art-led design; sister property Joali Being for wellness-only", tier: "Villa" },
      { name: "Six Senses Laamu", neighborhood: "Laamu Atoll · surf", note: "Only resort in the atoll; turtle conservation, ice-rink-clear water", tier: "Villa" },
      { name: "Waldorf Astoria Maldives Ithaafushi", neighborhood: "South Malé", note: "Private Island option ($80k+/night) for full buyouts", tier: "Buyout" },
      { name: "The Ritz-Carlton Maldives Fari Islands", neighborhood: "North Malé · 45min boat", note: "Newest North Malé entrant, ring-shaped overwater architecture", tier: "Villa" },
    ],
    watch2026: [
      { kind: "Opening", title: "The St. Regis Vommuli expansion", note: "New residence category opens Q3 2026 — book the moment inventory lists." },
      { kind: "Opening", title: "Capella Maldives", note: "Confirmed for late 2026 in Faafu Atoll. Quiet, deep south positioning." },
      { kind: "Refurb", title: "Four Seasons Landaa Giraavaru", note: "Mid-2026 villa refresh; avoid May–July if you are particular about finishes." },
      { kind: "Watch", title: "GM changes at Anantara Kihavah", note: "New leadership Q1 2026 — early reports strong; our desk is watching." },
    ],
    sections: [
      {
        h2: "Atoll, Not Brand — The Real Decision",
        body: "The Maldives mistake is choosing a brand and accepting the atoll that comes with it. The atoll decides the experience: house reef quality, seaplane time, water clarity, surf, sharks. {{Soneva Fushi}} sits in a UNESCO biosphere with the country's best manta encounters June–November. {{Cheval Blanc Randheli}} is in Noonu, a 45-minute seaplane that books the most stable weather window December–March. {{Six Senses Laamu}} is the only resort in its atoll — meaning no boat traffic, the clearest visibility in the country, and a ten-month-per-year surf break that brings the right kind of guest."
      },
      {
        h2: "Villa Categories Worth The Step-Up",
        body: "Skip entry-level overwater villas at any property. They share walls, they share noise, and the value collapses against the next tier. The step-up villas worth booking: {{Soneva Jani}}'s 1-Bedroom Water Reserve with retractable roof; {{One&Only Reethi Rah}}'s Grand Beach Villa with private pool (the largest beachfront footprint in the country); and {{Cheval Blanc Randheli}}'s 1-Bedroom Garden Water Villa — the suite our hotel desk repeats most often. For families, {{Joali Maldives}}'s 2-Bedroom Beach Villa with Pool is the calculated buy."
      },
      {
        h2: "When To Go — And When Not To",
        body: "Peak: late December through March (premium pricing, perfect weather, full reefs). Shoulder: November and April (15–25% lower, identical water clarity most weeks). Avoid: May–October monsoon, unless you want surf at {{Six Senses Laamu}} or mantas at {{Soneva Fushi}} — both are legitimate reasons to break the rule. Plan 9–12 months ahead for Soneva, Cheval Blanc, and One&Only. The Aman Maldives waitlist is now closed for 2026 holiday weeks."
      },
      {
        h2: "What Most Travelers Get Wrong",
        body: "They optimize for the photo and forget that day four needs different food, day six needs different reef, day eight needs to leave the property. Properties solving this are {{Soneva Fushi}} (six restaurants, two private islands accessible by boat) and {{Waldorf Astoria Maldives Ithaafushi}} (eleven dining venues, private island add-on). Every property listed above is bookable through Viaive's preferred-partner programs — Four Seasons Preferred, Belmond Bellini, LVMH partner network — with complimentary upgrades when available, $200 resort credit on most stays, and seaplane priority where applicable."
      }
    ],
    ctaEyebrow: "One placement, not a list",
    ctaHeadline: "Want the atoll we'd actually book?",
    ctaBody: "Tell us your dates and travel style. Our hotel desk returns one written placement — atoll, property, villa category, and the reason — within 18 hours.",
    conciergeIntent: "maldives",
  },

  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    lat: 35.6762,
    lng: 139.6503,
    bestMonths: "Mar – May · Oct – Nov",
    leadTime: "4–6 months · Aman, Janu, Bulgari · 8 months for cherry blossom",
    readMinutes: 9,
    lastReviewed: "Feb 2026",
    heroEyebrow: "Field Guide · Tokyo · Last reviewed Feb 2026",
    h1: "Tokyo, Audited.",
    h1Italic: "The 2026 hotel decision, sharpened.",
    geoAnswer:
      "Luxury travelers stay at Aman Tokyo, Janu Tokyo, Bulgari Hotel Tokyo, or The Tokyo EDITION Toranomon. Visit March–May or October–November. Plan 4–6 months ahead; 8 months for cherry-blossom weeks.",
    hotels: [
      { name: "Aman Tokyo", neighborhood: "Otemachi · Pacific Century Place", note: "84 rooms, mountain-quiet inside a financial tower; the standard", tier: "Suite" },
      { name: "Janu Tokyo", neighborhood: "Azabudai Hills · 2024 opening", note: "Aman's sister brand, more social, the city's best fitness facility", tier: "Suite" },
      { name: "Bulgari Hotel Tokyo", neighborhood: "Yaesu · Tokyo Midtown Yaesu", note: "98 keys, top six floors, the most architecturally complete new opening", tier: "Suite" },
      { name: "The Tokyo EDITION, Toranomon", neighborhood: "Toranomon Hills", note: "Best price-to-design ratio in the city; Tatsumi rooftop bar", tier: "Suite" },
      { name: "Hoshinoya Tokyo", neighborhood: "Otemachi", note: "Ryokan-in-a-tower; tatami, hot spring, no shoes from the lobby up", tier: "Suite" },
      { name: "Four Seasons Hotel Tokyo at Otemachi", neighborhood: "Otemachi", note: "Highest rooms in the city; service depth our family desk repeats often", tier: "Suite" },
      { name: "Park Hyatt Tokyo", neighborhood: "Shinjuku", note: "Reopens early 2026 after full renovation — the New York Bar returns", tier: "Suite" },
      { name: "Capella Tokyo", neighborhood: "Tokyo Bay · 2026 opening", note: "Waterfront category, opens late 2026 — early holds available", tier: "Suite" },
    ],
    watch2026: [
      { kind: "Opening", title: "Park Hyatt Tokyo reopening", note: "Targeted Q1 2026 after multi-year refurb. New York Bar essential booking." },
      { kind: "Opening", title: "Capella Tokyo", note: "Late 2026 in a new waterfront tower. Early-hold inventory bookable now." },
      { kind: "Refurb", title: "The Peninsula Tokyo", note: "Public-area refresh through summer 2026 — no service disruption, but rooms unchanged." },
      { kind: "Watch", title: "Aman Tokyo at six years", note: "Service still holding; the only six-year-old hotel in our Atlas with no slippage." },
    ],
    sections: [
      {
        h2: "The 2026 Class — Three Names That Reset Tokyo",
        body: "Tokyo had a decade-long Aman moment; it now has a class. {{Janu Tokyo}} opened in 2024 inside Azabudai Hills as Aman's louder sister — 13,000 sqft of fitness, eight restaurants, the city's best urban-resort feel. {{Bulgari Hotel Tokyo}} took the top six floors of Tokyo Midtown Yaesu and is the most architecturally complete opening of the past two years. And the returning {{Park Hyatt Tokyo}} reopens Q1 2026 after a multi-year renovation that brings the New York Bar back without compromising the Lost in Translation interiors. If you have not been to Tokyo since 2023, the hotel landscape has been rebuilt under you."
      },
      {
        h2: "The Standard That Still Holds",
        body: "{{Aman Tokyo}} remains the standard. Six years in, the property has not slipped — we audit it every quarter and the silence still works. The Aman Suite is the placement; the standard rooms are quieter and lower without the 33rd-floor framing. For travelers who want Japan-first rather than international, {{Hoshinoya Tokyo}} is a ryokan stacked seventeen floors high — tatami floors, onsen on the top floor, shoes off at the lobby — and it is the most genuinely-Japanese stay in the city. For the suite-category traveler who wants altitude, {{Four Seasons Hotel Tokyo at Otemachi}} has the highest guestrooms in Tokyo and a service depth our family desk repeats every other month."
      },
      {
        h2: "When To Go — Cherry Blossoms, Maples, And The Rest",
        body: "March 20 through April 5 for cherry blossom — book by July of the prior year, no exceptions. October 25 through November 25 for koyo, the maple season, which is quieter and arguably more beautiful. Skip June (rainy season), August (humidity, locals leave), and the New Year week (every restaurant of consequence closes). For 2026 specifically: the cherry-blossom forecast tilts a week earlier than the ten-year average per JMA preliminary data — book {{Aman Tokyo}} and {{Janu Tokyo}} for the final ten days of March."
      },
      {
        h2: "What To Skip, And What To Book Months Ahead",
        body: "Skip Shibuya Sky at peak times, Robot Restaurant entirely, and the Roppongi Hills observation deck (use {{Janu Tokyo}}'s rooftop bar instead). Book three months ahead: any kaiseki at the level of Ryugin, Den, Florilège or Kohaku. Book four months ahead: Sukiyabashi Jiro Honten (not the Roppongi outpost). Book day-of: most ramen, sushi at Sushi Sho if the desk has a relationship. Every hotel above is bookable through Viaive's preferred-partner programs — Four Seasons Preferred, Virtuoso, Aman Inner Circle — with complimentary upgrades, daily breakfast for two, and the kind of room placement the public booking engine cannot offer."
      }
    ],
    ctaEyebrow: "The 2026 Tokyo brief",
    ctaHeadline: "Want the room we'd actually place you in?",
    ctaBody: "Our Asia Intelligence Desk writes back with a single property, a specific room category, and the reason — within 18 hours. Cherry-blossom dates close fast; the desk is taking briefs now.",
    conciergeIntent: "tokyo",
  },

  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    region: "Asia",
    lat: 13.7563,
    lng: 100.5018,
    bestMonths: "Nov – Feb",
    leadTime: "4–6 weeks suites · 3 months villas · 6 months Aman",
    readMinutes: 6,
    lastReviewed: "Feb 2026",
    heroEyebrow: "Field Guide · Bangkok · Last reviewed Feb 2026",
    h1: "Bangkok, Audited.",
    h1Italic: "Where to actually stay in 2026.",
    geoAnswer:
      "Luxury travelers stay along the Chao Phraya (Mandarin Oriental, Capella) or in Sukhumvit (Park Hyatt, Rosewood, Sindhorn Kempinski). Visit November–February. Plan 4–6 weeks ahead.",
    hotels: [
      { name: "Mandarin Oriental Bangkok", neighborhood: "Chao Phraya River", note: "150-year heritage standard; Author's Wing suites", tier: "Suite" },
      { name: "The Peninsula Bangkok", neighborhood: "Chao Phraya West Bank", note: "Every room faces the river; longtail shuttle to BTS", tier: "Suite" },
      { name: "Capella Bangkok", neighborhood: "Chao Phraya River", note: "Only riverside villas in the city; 2020 opening, spa-led", tier: "Villa" },
      { name: "Park Hyatt Bangkok", neighborhood: "Sukhumvit · Central Embassy", note: "Best service in the city; Penthouse rooftop bar", tier: "Suite" },
      { name: "Rosewood Bangkok", neighborhood: "Ploenchit · Sukhumvit", note: "Design-led; Lakorn Brasserie where chefs eat on nights off", tier: "Suite" },
      { name: "Sindhorn Kempinski Hotel Bangkok", neighborhood: "Lumpini Park", note: "Wellness-led; quiet six-month annual window", tier: "Suite" },
      { name: "The Siam Hotel", neighborhood: "Dusit · Chao Phraya", note: "39 suites, all with private plunge pools, Thai-design immersion", tier: "Villa" },
      { name: "Four Seasons Hotel Bangkok at Chao Phraya River", neighborhood: "Chao Phraya River", note: "Suite-category default for our hotel desk", tier: "Suite" },
    ],
    watch2026: [
      { kind: "Opening", title: "Aman Nai Lert Bangkok", note: "Soft-opens late 2025 in the Nai Lert family heritage compound. Highest anticipated Asia opening." },
      { kind: "Watch", title: "Mandarin Oriental Garden Wing", note: "Best river-balcony rooms — book the renovated stack post-Q2 2026." },
      { kind: "Refurb", title: "Peninsula spa expansion", note: "Through summer 2026 — book riverside rooms instead." },
    ],
    sections: [
      {
        h2: "The River — Heritage, Architecture, Silence",
        body: "On the river, the choice is between heritage and design. The {{Mandarin Oriental Bangkok}} holds the standard it has held for 150 years — book the Author's Wing for the literary suites, the Garden Wing for river-view balconies. A short ferry north, {{The Peninsula Bangkok}} is the architectural counter-argument: every room faces the water, the longtail boat shuttle to BTS still runs, and the pool is the city's quiet champion. For travelers who want something newer, {{Capella Bangkok}} opened in 2020 with the only riverside villas in the city; the spa is, frankly, the reason to stay."
      },
      {
        h2: "Sukhumvit — Vertical, Electric, Hospitable",
        body: "In Sukhumvit, the calculus changes. The {{Park Hyatt Bangkok}} sits inside Central Embassy and gives you the best service in the city — the rooftop bar at Penthouse is non-negotiable for arrivals. Two stations east, {{Rosewood Bangkok}} is the design hotel that actually delivers; the Lakorn European Brasserie is where Bangkok-based chefs eat on their nights off. For wellness travelers, {{Sindhorn Kempinski Hotel Bangkok}} overlooks Lumpini Park and books a quiet six-month annual stretch that the city's restaurant set tells nobody about."
      },
      {
        h2: "Three Quiet Placements Worth A Brief",
        body: "{{The Siam Hotel}} for Thai-design immersion — only 39 suites, all with private plunge pools, and a tone our family desk returns to often. The {{Four Seasons Hotel Bangkok at Chao Phraya River}} is the suite-category default we send every other week. And for late 2025 / 2026, the Aman Nai Lert opens inside the Nai Lert family heritage compound — the most anticipated Asia opening of the year. Inventory lists 12 months out; the desk is already taking holds."
      },
      {
        h2: "When, How, And What To Skip",
        body: "November through February. Skip March–May. Plan four to six weeks ahead for suites, three months for villas, six for the Aman. Chatuchak before 10am, Jay Fai before her queue forms, the Jim Thompson House if you have not been, and a late afternoon on the river instead of a sunset cruise. Skip the dinner cruise. Every property above is bookable through Viaive's preferred-partner programs — Four Seasons Preferred, Virtuoso, Mandarin Oriental Fans of M.O. — with complimentary upgrades, daily breakfast, and a $100 property credit on most stays."
      }
    ],
    ctaEyebrow: "One placement, not a list",
    ctaHeadline: "Want the property we'd actually book?",
    ctaBody: "The Asia Intelligence Desk reads every brief personally. You will receive one written placement within 18 hours. No newsletter, no sales call.",
    conciergeIntent: "bangkok",
  },
];

export const getDestination = (slug: string) =>
  DESTINATIONS.find((d) => d.slug === slug) || DESTINATIONS[0];
