// All attraction content lives here as an array of objects.
// Components never hard-code a destination: they render whatever is in this array.
//
// Costs are estimates in Maloti (M). 1 Loti is pegged to 1 South African rand.
// Altitudes are approximate, in metres above sea level.
// To use real photos: drop a .jpg into public/images and change the `image` value.

export const CATEGORIES = [
  'Adventure',
  'Culture & History',
  'Nature & Wildlife',
  'Landmarks & Scenery',
];

export const attractions = [
  {
    id: 'maletsunyane-falls',
    name: 'Maletsunyane Falls',
    image: 'images/maletsunyane-falls.svg',
    location: 'Semonkong, Maseru District',
    category: 'Landmarks & Scenery',
    altitude: 2200,
    featured: true,
    description:
      'A 192 m single drop into a basalt gorge, a short walk from the village of Semonkong, "the place of smoke".',
    details:
      'The Senqu tributary known as the Maletsunyane River leaps off a sandstone lip and falls 192 metres in one piece. In summer the spray drifts across the gorge and the sound carries for kilometres. Semonkong takes its name from that mist. Most visitors stay in the village, walk to the viewpoint, and book pony treks or the abseil through local lodges.',
    activities: ['Abseiling', 'Waterfall viewpoint walks', 'Pony trekking', 'Fly fishing'],
    cost: 'Viewpoint from M50, abseil about M1,100',
    costFrom: 50,
    bestTime: 'December to February, when the river is strongest',
    tip: 'Book the abseil a day ahead. Wind can postpone it.',
  },
  {
    id: 'thaba-bosiu',
    name: 'Thaba-Bosiu',
    image: 'images/thaba-bosiu.svg',
    location: 'Near Maseru, Maseru District',
    category: 'Culture & History',
    altitude: 1800,
    featured: true,
    description:
      'The flat-topped "Mountain at Night", where King Moshoeshoe I built the fortress that protected the young Basotho nation.',
    details:
      'Moshoeshoe I settled here in 1824 and gathered clans from across the region. The summit has a natural wall, springs and enough grazing to hold out against attackers. Today a local guide walks you up past the old gateways to the royal graves and the ruins of the chief\'s village, and points out the Qiloane pinnacle whose shape inspired the Basotho hat.',
    activities: ['Guided historical walk', 'Visit the royal graves', 'Cultural centre', 'Photography'],
    cost: 'Entry and guide from M50',
    costFrom: 50,
    bestTime: 'Year round, ideally mornings',
    tip: 'Wear shoes with grip. The final climb is over bare rock.',
  },
  {
    id: 'sani-pass',
    name: 'Sani Pass',
    image: 'images/sani-pass.svg',
    location: 'Mokhotlong District, on the South African border',
    category: 'Adventure',
    altitude: 2874,
    featured: true,
    description:
      'A 4x4-only gravel road that climbs the Drakensberg escarpment in a string of hairpin bends to the top of Lesotho.',
    details:
      'The pass links KwaZulu-Natal to the Lesotho highlands and gains more than 1,000 metres in a few kilometres. At the top, the Sani Mountain Lodge advertises itself as the highest pub in Africa. From there you can ride ponies, visit herder villages, or start the hike to Thabana Ntlenyana.',
    activities: ['4x4 day tours', 'Pony trekking', 'Village visits', 'Overnight lodge stay'],
    cost: '4x4 day tour from M1,000',
    costFrom: 1000,
    bestTime: 'October to April for clear roads, June to August for snow',
    tip: 'Carry your passport. You cross an international border.',
  },
  {
    id: 'afriski',
    name: 'Afriski Mountain Resort',
    image: 'images/afriski.svg',
    location: 'Mahlasela Pass, Butha-Buthe District',
    category: 'Adventure',
    altitude: 3050,
    featured: false,
    description:
      'Southern Africa\'s best-known ski resort, with snowmaking in winter and mountain biking when the snow melts.',
    details:
      'Afriski sits just over 3,000 metres up, so winter nights are cold enough for snowmaking even when natural snow is thin. The resort has slopes for beginners and confident skiers, a snow tube park, and a lodge with a restaurant. In summer the same slopes become mountain biking and hiking terrain.',
    activities: ['Skiing', 'Snowboarding', 'Snow tubing', 'Mountain biking', 'Hiking'],
    cost: 'Lift pass from M450, equipment hire extra',
    costFrom: 450,
    bestTime: 'June to August for snow, October to March for biking',
    tip: 'Pack layers and sunscreen. The sun is strong at 3,000 m.',
  },
  {
    id: 'thabana-ntlenyana',
    name: 'Thabana Ntlenyana',
    image: 'images/thabana-ntlenyana.svg',
    location: 'Mokhotlong District',
    category: 'Adventure',
    altitude: 3482,
    featured: false,
    description:
      'The highest point in southern Africa. The name means "beautiful little mountain", which undersells it.',
    details:
      'At 3,482 metres this is the summit of Lesotho and the whole of southern Africa. The usual route starts at the top of Sani Pass and takes two to three days there and back across open grassland and ridges. There is no technical climbing, but the weather turns fast and snow can fall in any month.',
    activities: ['Summit hike', 'Wild camping', 'Bird watching', 'Photography'],
    cost: 'Guide from about M400 per day',
    costFrom: 400,
    bestTime: 'October to April',
    tip: 'Hire a local guide and tell your lodge your return date.',
  },
  {
    id: 'katse-dam',
    name: 'Katse Dam',
    image: 'images/katse-dam.svg',
    location: 'Thaba-Tseka District',
    category: 'Landmarks & Scenery',
    altitude: 2053,
    featured: false,
    description:
      'A 185 m arch dam in the Lesotho Highlands Water Project, set in a deep valley with a lake you can cruise.',
    details:
      'The dam holds back water that is piped to South Africa and used to generate power for Lesotho. A guided tour covers the wall and the story of the project. The reservoir is long and narrow, with steep sides that suit boat cruises and bird watching, and a small botanical garden nearby shows highland plants.',
    activities: ['Dam wall tour', 'Boat cruise', 'Bird watching', 'Katse Botanical Garden'],
    cost: 'Tour from M80, boat cruise about M200',
    costFrom: 80,
    bestTime: 'March to May, when skies are clear and roads are dry',
    tip: 'Tours run on weekdays. Call the visitor centre first.',
  },
  {
    id: 'sehlabathebe',
    name: 'Sehlabathebe National Park',
    image: 'images/sehlabathebe.svg',
    location: 'Qacha\'s Nek District',
    category: 'Nature & Wildlife',
    altitude: 2400,
    featured: true,
    description:
      'A quiet plateau of sandstone arches, rock pools and trout streams, part of the Maloti-Drakensberg World Heritage Site.',
    details:
      'Sehlabathebe means "plateau of the shields". It is remote, so you are likely to share it with only a few other visitors and plenty of birds, including the bearded vulture. Trails lead to natural arches, rock paintings and pools that are cold enough to sting. Basic camping and lodge rooms are available.',
    activities: ['Hiking', 'Trout fishing', 'Bird watching', 'Rock art visits', 'Horse riding'],
    cost: 'Park entry about M60, camping about M100',
    costFrom: 60,
    bestTime: 'September to May',
    tip: 'Bring food and fuel. There are no shops inside the park.',
  },
  {
    id: 'liphofung-cave',
    name: 'Liphofung Cave',
    image: 'images/liphofung-cave.svg',
    location: 'Near Butha-Buthe, Butha-Buthe District',
    category: 'Culture & History',
    altitude: 1750,
    featured: false,
    description:
      'A sandstone shelter with San rock paintings, once used by King Moshoeshoe I as a resting place.',
    details:
      'Liphofung is a cultural and historical site set into a cliff. Faded San paintings of people and animals are still visible on the rock, and the cave was visited by Moshoeshoe I during his travels. A short guided walk covers the paintings, the plants around the shelter, and the history of the people who lived here.',
    activities: ['Guided cave tour', 'Rock art viewing', 'Nature walks', 'Craft shop'],
    cost: 'Entry about M40',
    costFrom: 40,
    bestTime: 'Year round',
    tip: 'Please do not touch the paintings. Oil from skin damages them.',
  },
  {
    id: 'bokong-nature-reserve',
    name: 'Bokong Nature Reserve',
    image: 'images/bokong-nature-reserve.svg',
    location: 'Mafika-Lisiu Pass, Leribe District',
    category: 'Nature & Wildlife',
    altitude: 3090,
    featured: false,
    description:
      'A high-altitude reserve beside one of Africa\'s highest road passes, with the Lepaqoa waterfall and soaring bearded vultures.',
    details:
      'The visitor centre sits on the Mafika-Lisiu Pass at around 3,090 metres. Short trails lead to the Lepaqoa waterfall, which freezes into curtains of ice in winter. The reserve protects alpine wetlands and cliffs where bearded vultures nest, and you can book pony treks into the surrounding hills.',
    activities: ['Hiking', 'Pony trekking', 'Bird watching', 'Waterfall walk'],
    cost: 'Entry about M60, pony trek extra',
    costFrom: 60,
    bestTime: 'Summer for walking, July for frozen waterfalls',
    tip: 'Ask staff where the vultures are circling that day.',
  },
  {
    id: 'morija',
    name: 'Morija Museum and Archives',
    image: 'images/morija.svg',
    location: 'Morija, Maseru District',
    category: 'Culture & History',
    altitude: 1600,
    featured: false,
    description:
      'Lesotho\'s oldest mission station, with a museum, archives, dinosaur footprints and a yearly arts festival.',
    details:
      'French missionaries founded Morija in 1833, and the town became a centre for printing and education in Sesotho. The museum covers Basotho history, crafts and the early mission years. Nearby, dinosaur footprints are preserved in the rock. The Morija Arts and Cultural Festival, usually held in the dry season, fills the town with music, food and dance.',
    activities: ['Museum visit', 'Dinosaur footprint walk', 'Arts festival', 'Craft shopping'],
    cost: 'Museum entry about M30',
    costFrom: 30,
    bestTime: 'Festival season, usually September to October',
    tip: 'Hire a local guide for the footprints. They are hard to find alone.',
  },
];

export const getAttraction = (id) => attractions.find((a) => a.id === id);
