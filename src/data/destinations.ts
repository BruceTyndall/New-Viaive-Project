import type { DestinationConfig } from '@/types/destination'

export const STATIC_DESTINATIONS: DestinationConfig[] = [
  {
    slug: 'thailand',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Asia',
    lat: 13.7563,
    lng: 100.5018,
    bestMonths: 'Nov – Feb',
    leadTime: '4–6 weeks suites · 3 months villas · 6 months Aman',
    readMinutes: 6,
    lastReviewed: 'Feb 2026',
    heroEyebrow: 'Field Guide · Bangkok · Last reviewed Feb 2026',
    h1: 'Bangkok, Audited.',
    h1Italic: 'Where to actually stay in 2026.',
    geoAnswer:
      'Luxury travelers stay along the Chao Phraya (Mandarin Oriental, Capella) or in Sukhumvit (Park Hyatt, Rosewood, Sindhorn Kempinski). Visit November–February. Plan 4–6 weeks ahead.',
    hotels: [
      { name: 'Mandarin Oriental Bangkok', neighborhood: 'Chao Phraya River', note: '150-year heritage standard; Author\'s Wing suites', tier: 'Suite' },
      { name: 'Capella Bangkok', neighborhood: 'Chao Phraya River', note: 'Only riverside villas in the city; 2020 opening, spa-led', tier: 'Villa' },
      { name: 'Park Hyatt Bangkok', neighborhood: 'Sukhumvit · Central Embassy', note: 'Best service in the city; Penthouse rooftop bar', tier: 'Suite' },
      { name: 'Rosewood Bangkok', neighborhood: 'Ploenchit · Sukhumvit', note: 'Design-led; Lakorn Brasserie where chefs eat on nights off', tier: 'Suite' },
      { name: 'The Peninsula Bangkok', neighborhood: 'Chao Phraya West Bank', note: 'Every room faces the river; longtail shuttle to BTS', tier: 'Suite' },
      { name: 'Four Seasons Hotel Bangkok at Chao Phraya River', neighborhood: 'Chao Phraya River', note: 'Suite-category default for our hotel desk', tier: 'Suite' },
    ],
    watch2026: [
      { kind: 'Opening', title: 'Aman Nai Lert Bangkok', note: 'Soft-opens late 2025 in the Nai Lert family heritage compound. Highest anticipated Asia opening.' },
      { kind: 'Watch', title: 'Mandarin Oriental Garden Wing', note: 'Best river-balcony rooms — book the renovated stack post-Q2 2026.' },
    ],
    sections: [
      {
        h2: 'The River — Heritage, Architecture, Silence',
        body: 'On the river, the choice is between heritage and design. The {{Mandarin Oriental Bangkok}} holds the standard it has held for 150 years — book the Author\'s Wing for the literary suites, the Garden Wing for river-view balconies. A short ferry north, {{The Peninsula Bangkok}} is the architectural counter-argument: every room faces the water, the longtail boat shuttle to BTS still runs. For travelers who want something newer, {{Capella Bangkok}} opened in 2020 with the only riverside villas in the city; the spa is, frankly, the reason to stay.',
      },
      {
        h2: 'Sukhumvit — Vertical, Electric, Hospitable',
        body: 'In Sukhumvit, the calculus changes. The {{Park Hyatt Bangkok}} sits inside Central Embassy and gives you the best service in the city — the rooftop bar at Penthouse is non-negotiable for arrivals. Two stations east, {{Rosewood Bangkok}} is the design hotel that actually delivers. For wellness travelers, {{Sindhorn Kempinski Hotel Bangkok}} overlooks Lumpini Park and books a quiet six-month annual stretch.',
      },
    ],
    ctaEyebrow: 'One placement, not a list',
    ctaHeadline: 'Want the property we\'d actually book?',
    ctaBody: 'The Asia Intelligence Desk reads every brief personally. You will receive one written placement within 18 hours.',
    conciergeIntent: 'bangkok',
  },
  {
    slug: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    lat: 35.6762,
    lng: 139.6503,
    bestMonths: 'Mar – May · Oct – Nov',
    leadTime: '4–6 months · Aman, Janu, Bulgari · 8 months for cherry blossom',
    readMinutes: 9,
    lastReviewed: 'Feb 2026',
    heroEyebrow: 'Field Guide · Tokyo · Last reviewed Feb 2026',
    h1: 'Tokyo, Audited.',
    h1Italic: 'The 2026 hotel decision, sharpened.',
    geoAnswer:
      'Luxury travelers stay at Aman Tokyo, Janu Tokyo, Bulgari Hotel Tokyo, or The Tokyo EDITION Toranomon. Visit March–May or October–November. Plan 4–6 months ahead; 8 months for cherry-blossom weeks.',
    hotels: [
      { name: 'Aman Tokyo', neighborhood: 'Otemachi · Pacific Century Place', note: '84 rooms, mountain-quiet inside a financial tower; the standard', tier: 'Suite' },
      { name: 'Janu Tokyo', neighborhood: 'Azabudai Hills · 2024 opening', note: "Aman's sister brand, more social, the city's best fitness facility", tier: 'Suite' },
      { name: 'Bulgari Hotel Tokyo', neighborhood: 'Yaesu · Tokyo Midtown Yaesu', note: '98 keys, top six floors, the most architecturally complete new opening', tier: 'Suite' },
      { name: 'The Tokyo EDITION, Toranomon', neighborhood: 'Toranomon Hills', note: 'Best price-to-design ratio in the city; Tatsumi rooftop bar', tier: 'Suite' },
      { name: 'Four Seasons Hotel Tokyo at Otemachi', neighborhood: 'Otemachi', note: 'Highest rooms in the city; service depth our family desk repeats often', tier: 'Suite' },
      { name: 'Park Hyatt Tokyo', neighborhood: 'Shinjuku', note: 'Reopens early 2026 after full renovation — the New York Bar returns', tier: 'Suite' },
    ],
    watch2026: [
      { kind: 'Opening', title: 'Park Hyatt Tokyo reopening', note: 'Targeted Q1 2026 after multi-year refurb. New York Bar essential booking.' },
      { kind: 'Opening', title: 'Capella Tokyo', note: 'Late 2026 in a new waterfront tower. Early-hold inventory bookable now.' },
    ],
    sections: [
      {
        h2: 'The 2026 Class — Three Names That Reset Tokyo',
        body: 'Tokyo had a decade-long Aman moment; it now has a class. {{Janu Tokyo}} opened in 2024 inside Azabudai Hills as Aman\'s louder sister — 13,000 sqft of fitness, eight restaurants, the city\'s best urban-resort feel. {{Bulgari Hotel Tokyo}} took the top six floors of Tokyo Midtown Yaesu and is the most architecturally complete opening of the past two years. And the returning {{Park Hyatt Tokyo}} reopens Q1 2026 after a multi-year renovation that brings the New York Bar back.',
      },
      {
        h2: 'The Standard That Still Holds',
        body: '{{Aman Tokyo}} remains the standard. Six years in, the property has not slipped — we audit it every quarter and the silence still works. For travelers who want Japan-first rather than international, Hoshinoya Tokyo is a ryokan stacked seventeen floors high — tatami floors, onsen on the top floor, shoes off at the lobby — and it is the most genuinely-Japanese stay in the city.',
      },
    ],
    ctaEyebrow: 'The 2026 Tokyo brief',
    ctaHeadline: "Want the room we'd actually place you in?",
    ctaBody: 'Our Asia Intelligence Desk writes back with a single property, a specific room category, and the reason — within 18 hours.',
    conciergeIntent: 'tokyo',
  },
  {
    slug: 'paris',
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    lat: 48.8566,
    lng: 2.3522,
    bestMonths: 'Apr – Jun · Sep – Oct',
    leadTime: '3–6 months · Palace hotels · 8 months for fashion weeks',
    readMinutes: 7,
    lastReviewed: 'Mar 2026',
    heroEyebrow: 'Field Guide · Paris · Last reviewed Mar 2026',
    h1: 'Paris, Audited.',
    h1Italic: 'The palace decision, without the noise.',
    geoAnswer:
      'Luxury travelers stay at Cheval Blanc Paris, Hôtel de Crillon, Le Bristol, or The Ritz Paris. Visit April–June or September–October. Plan 3–6 months ahead; fashion-week dates close 8 months out.',
    hotels: [
      { name: 'Cheval Blanc Paris', neighborhood: 'Samaritaine · Seine', note: 'LVMH flagship; the best spa in Paris and Maxime Frédéric pastries', tier: 'Suite' },
      { name: 'Hôtel de Crillon', neighborhood: 'Place de la Concorde', note: 'Rosewood revival; the Jardin d\'Hiver is the room our desk repeats most', tier: 'Suite' },
      { name: 'Le Bristol Paris', neighborhood: '8th · Faubourg Saint-Honoré', note: 'Oetker Collection; the most French palace in the city, garden suites unmatched', tier: 'Suite' },
      { name: 'The Ritz Paris', neighborhood: 'Place Vendôme', note: 'Post-renovation standard holds; Hemingway Bar is non-negotiable', tier: 'Suite' },
      { name: 'Four Seasons George V', neighborhood: 'Champs-Élysées', note: 'The suite floor is the buy; Le Cinq three-star kitchen', tier: 'Suite' },
      { name: 'Hôtel Lutetia', neighborhood: 'Saint-Germain-des-Prés', note: 'Left Bank palace; the only Art Deco palace in Paris, quieter crowd', tier: 'Suite' },
    ],
    watch2026: [
      { kind: 'Refurb', title: 'Four Seasons George V suite wing', note: 'Rolling refresh through 2026 — request post-renovation rooms at booking.' },
      { kind: 'Watch', title: 'Le Meurice under new chef', note: 'Transition year; monitor before committing to a tasting-menu evening.' },
    ],
    sections: [
      {
        h2: 'The Seine — Cheval Blanc and the New Palace Standard',
        body: 'The Samaritaine opening moved the conversation. {{Cheval Blanc Paris}} occupies the top floors with seven restaurant concepts, a rooftop Dior spa, and a chef pastry program that the city\'s serious food press has not stopped writing about. For classic palace orientation, {{Hôtel de Crillon}} on Place de la Concorde is the Rosewood property our desk places most often — specifically the Jardin d\'Hiver suite, where morning light comes through floor-to-ceiling garden windows in a way that no renovation has managed to replicate anywhere else in Paris.',
      },
      {
        h2: 'The Old Standard — Three Palaces That Still Hold',
        body: '{{Le Bristol Paris}} is the most quietly French of the palaces — the garden courtyard is the reason to stay, the Epicure restaurant is the reason to eat in. {{The Ritz Paris}} post-renovation is performing well; book the Hemingway Bar for the first evening, skip the over-photographed lobby. {{Four Seasons George V}} gives you Le Cinq, a three-Michelin-star kitchen that is worth the reservation, and a suite floor our family desk places every other month for multi-room configurations.',
      },
    ],
    ctaEyebrow: 'The Paris placement',
    ctaHeadline: "Want the suite we'd actually book?",
    ctaBody: 'Our Europe desk returns one written placement — property, room category, and the reason — within 18 hours. Fashion-week inventory moves fast.',
    conciergeIntent: 'paris',
  },
  {
    slug: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    lat: 25.2048,
    lng: 55.2708,
    bestMonths: 'Nov – Mar',
    leadTime: '4–8 weeks suites · 3 months villas',
    readMinutes: 6,
    lastReviewed: 'Mar 2026',
    heroEyebrow: 'Field Guide · Dubai · Last reviewed Mar 2026',
    h1: 'Dubai, Audited.',
    h1Italic: 'Beyond the spectacle, into the placement.',
    geoAnswer:
      'Luxury travelers stay at Atlantis The Royal, Bulgari Resort Dubai, Four Seasons Resort DIFC, or One&Only The Palm. Visit November–March. Plan 4–8 weeks ahead for suites.',
    hotels: [
      { name: 'Atlantis The Royal', neighborhood: 'Palm Jumeirah', note: '795 rooms, 90 suites, 17 pools — the ultra-resort; Grand Atlantis Suite is the buy', tier: 'Suite' },
      { name: 'Bulgari Resort Dubai', neighborhood: 'Jumeirah Bay Island', note: 'Quietest property in the city; private island, 102 rooms, Milanese service', tier: 'Villa' },
      { name: 'Four Seasons Resort at Jumeirah Beach', neighborhood: 'Jumeirah Beach', note: 'Best beach position in the city; pool preferred over Palm properties', tier: 'Suite' },
      { name: 'One&Only The Palm', neighborhood: 'Palm Jumeirah West', note: 'The original quiet Palm address; 94 rooms, best service ratio in Dubai', tier: 'Villa' },
      { name: 'Burj Al Arab', neighborhood: 'Jumeirah · Artificial island', note: 'The iconic stay — worth once; the Royal Suite is the unreasonable buy', tier: 'Suite' },
      { name: 'Jumeirah Al Qasr', neighborhood: 'Madinat Jumeirah', note: 'Canal-and-beach access; best for families wanting space without Palm crowds', tier: 'Suite' },
    ],
    watch2026: [
      { kind: 'Opening', title: 'Aman Dubai at Armani Hotel site', note: 'Rumored for late 2026 — unconfirmed. Desk monitoring inventory signals.' },
      { kind: 'Watch', title: 'Atlantis The Palm vs Royal positioning', note: 'Royal has taken the market; The Palm now the value play for families.' },
    ],
    sections: [
      {
        h2: 'The Royal — Dubai\'s Loudest Arrival',
        body: '{{Atlantis The Royal}} reset the conversation when it opened — 795 rooms, 17 pools, Nobu and Ariana Grande\'s permanent residency, and a Grand Atlantis Suite at the top that is the most spectacular single room in the Middle East. For travelers who want the spectacle and the infrastructure, nothing else in Dubai competes. For travelers who want the opposite of that, {{Bulgari Resort Dubai}} on Jumeirah Bay Island is the most quietly remarkable property in the city: 102 rooms, a private island, Milanese service that does not announce itself.',
      },
      {
        h2: 'The Quieter Placements',
        body: '{{One&Only The Palm}} remains the original quiet Palm address — 94 rooms, a service-to-guest ratio that no new opening has matched, and a beach that the crowds do not reach. {{Four Seasons Resort at Jumeirah Beach}} gives you the best beach position on the mainland — the pool tier, specifically, is the placement our hotel desk repeats most for guests who want Dubai as a destination rather than a spectacle. For families, {{Jumeirah Al Qasr}} at Madinat gives canal-and-beach access with room configurations that sleep six without the pressure of a Palm villa.',
      },
    ],
    ctaEyebrow: 'The Dubai placement',
    ctaHeadline: "Want the property we'd actually recommend?",
    ctaBody: 'Tell us your dates. Our hotel desk returns one written placement — property, room, and the reason — within 18 hours.',
    conciergeIntent: 'dubai',
  },
]

export const getDestination = (slug: string): DestinationConfig =>
  STATIC_DESTINATIONS.find((d) => d.slug === slug) ?? STATIC_DESTINATIONS[0]
