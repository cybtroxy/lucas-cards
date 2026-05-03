/**
 * 10 entradas por tipo × 10 tipos = 100 conceptos alineados a cards.json.
 * Índice: row = floor((n-1)/10) % 2 con n del id (ej. c1_11 → 11); slot = row*5 + (level-1).
 */
export const CONCEPTS = {
  nature: [
    {
      name: 'Geovena',
      cls: 'Brote de geoda volcánica',
      quote: '«Del cascarón roto nace el verde.»',
      formato: 'Planta-mineral',
      subjectEn:
        'A massive cracked geode half buried in dark soil, glowing lava veins inside the cavity, a single luminous green sprout curling out like a small dragon tail. No people. Macro wonder, stone and life intertwined.',
    },
    {
      name: 'Campanilla de Marea',
      cls: 'Artefacto coralino',
      quote: '«Toco y el arrecife despierta.»',
      formato: 'Objeto orgánico',
      subjectEn:
        'An ancient bronze bell completely overgrown with barnacles and soft corals, resting on a wet black tide rock. Tiny bioluminescent anemones pulse around its rim. Night beach mood, splash hints, no human figure.',
    },
    {
      name: 'Orquídea Tormenta',
      cls: 'Flor cimarrón eléctrica',
      quote: '«Bebo relámpago en silencio.»',
      formato: 'Planta heroica',
      subjectEn:
        'A towering orchid-like plant grafted to a lightning-charred tree trunk; glassy petals with faint internal sparks, roots gripping bark like claws. Stormy forest backdrop suggested, subject is purely botanical-monstrous.',
    },
    {
      name: 'Ojo de Pozas',
      cls: 'Fósil en charca de granito',
      quote: '«El tiempo quedó atrapado en círculo.»',
      formato: 'Escena natural',
      subjectEn:
        'A perfect round granite tide pool (or mountain pool) like an eye: spiral ammonite fossil at the bottom, neon algae rings, a few translucent shrimp. Contemplative, no characters — nature as portrait.',
    },
    {
      name: 'Ygg-spira',
      cls: 'Monte-ammonita auroral',
      quote: '«Mi espiral toca la aurora.»',
      formato: 'Monumento viviente',
      subjectEn:
        'A colossal weathered ammonite spiral forming a small mountain ridge, cracks leaking soft aurora light and moss waterfalls. Epic scale, clearly non-humanoid geology-creature hybrid silhouette.',
    },
    {
      name: 'Lotos de Obsidiana',
      cls: 'Flotadores de lava',
      quote: '«Florecemos donde arde el lago.»',
      formato: 'Placas volcánicas',
      subjectEn:
        'Wide obsidian lily pads with molten orange cracks, floating on a calm lava lake, steam curls. Optional small fireflies or sparks — still no humanoid, focus on alien botany.',
    },
    {
      name: 'Helecho Hielofuego',
      cls: 'Frontera de elementos',
      quote: '«Cada punta discute con su vecina.»',
      formato: 'Planta dual',
      subjectEn:
        'A fern whose fronds split visually: one side rimed with frost crystals, the other glowing ember-orange, growing from misty volcanic soil. Surreal but readable single plant subject.',
    },
    {
      name: 'Liana Gravítica',
      cls: 'Enredadera de piedra flotante',
      quote: '«Atamos lo que el cielo dejó caer.»',
      formato: 'Constructo vegetal',
      subjectEn:
        'Thick braided vines spiraling upward, visibly tethering several hovering boulders; dust motes and leaves in suspension. The composition centers the vine-boulder knot, not a person.',
    },
    {
      name: 'Manto del Eclipse',
      cls: 'Campo floral bajo luna negra',
      quote: '«Somos pétalos de sombra.»',
      formato: 'Paisaje focal',
      subjectEn:
        'A meadow of unusually tall flowers under a total eclipse; each bloom casts a thin crescent shadow on the ground. Dreamlike, painterly, no standing figure — the field is the “character”.',
    },
    {
      name: 'Corazón de Raíz',
      cls: 'Nudo mundial',
      quote: '«Latimos bajo todos los mapas.»',
      formato: 'Raíces colosales',
      subjectEn:
        'A gigantic heart-shaped tangle of ancient roots pulsing with soft green bioluminescence underground chamber hinted. Legendary nature spirit implied by form only — no human face or knight.',
    },
  ],

  water: [
    {
      name: 'Espiral de Cristal',
      cls: 'Banco de peces vidrio',
      quote: '«Transparentes pero no invisibles.»',
      formato: 'Enjambre acuático',
      subjectEn:
        'A helix school of perfectly glass-clear fish catching prismatic light underwater, bubbles like jewels. Abstract motion, no humanoid, ocean blues and teals.',
    },
    {
      name: 'Nebulosa Krill',
      cls: 'Nube de plancton',
      quote: '«Somos polvo de galaxia mojada.»',
      formato: 'Masa viva abstracta',
      subjectEn:
        'Billions of tiny krill / plankton lit from below so the swarm reads like a nebula cloud in water, subtle jaws and eyes only as texture — vast scale, no protagonist person.',
    },
    {
      name: 'Gólem de Quelpo',
      cls: 'Guardián de arrecife',
      quote: '«Pesado como marea.»',
      formato: 'Bestia rocosa',
      subjectEn:
        'A stocky quadruped or ape-like golem made of barnacle stone, kelp dreadlocks, and shell plates; eyes like pearl lamps. Clearly creature-construct, not a human warrior.',
    },
    {
      name: 'Tormenta Perla',
      cls: 'Huracán de conchas',
      quote: '«Llueve dientes del mar.»',
      formato: 'Fenómeno marino',
      subjectEn:
        'A stylized underwater hurricane of swirling oyster shells and loose pearls, motion spiral, bioluminescent edges. Dynamic object-weather hybrid.',
    },
    {
      name: 'Nave Abisal',
      cls: 'Ruina de vitral alga',
      quote: '«Aquí rezaban las profundidades.»',
      formato: 'Arquitectura hundida',
      subjectEn:
        'Sunken cathedral ruin where “stained glass” is actually colored algae membranes in window frames, silty god-rays. Fish as small accents — focus architecture + water.',
    },
    {
      name: 'Manta de Nutrias',
      cls: 'Balsa de estrellas',
      quote: '«El cielo se nos pegó al pelo.»',
      formato: 'Grupo de animales',
      subjectEn:
        'A raft of sea otters holding paws, starlight reflecting on wet fur and calm water, one kelp strand garland. Cute but painterly fantasy, no people.',
    },
    {
      name: 'Rey Cangrejo Faro',
      cls: 'Crustáceo de manglar',
      quote: '«Mi caparazón es faro.»',
      formato: 'Bestia gigante',
      subjectEn:
        'A huge crab with bioluminescent patterns on its shell among mangrove roots at night, claws raised gently, water mirrors glow. Insectoid/crustacean hero shot.',
    },
    {
      name: 'Arpa de Algas',
      cls: 'Instrumento natural',
      quote: '«Las corrientes tocan acordes.»',
      formato: 'Objeto orgánico',
      subjectEn:
        'Vertical kelp forest with taut golden seaweed “strings” like harp cables, a few fish swimming through as if plucking them. Artistic still-life energy underwater.',
    },
    {
      name: 'Flor del Pecio',
      cls: 'Anémonas en casco',
      quote: '«Del hierro viejo, pétalos.»',
      formato: 'Arrecife sobre metal',
      subjectEn:
        'Shipwreck hull burst open like a flower of giant anemones and coral, fish darting. Rust and neon pink/purple contrast, no diver human.',
    },
    {
      name: 'Escala Leviatán',
      cls: 'Fragmento colosal',
      quote: '«Una sola teja del monstruo.»',
      formato: 'Objeto colosal',
      subjectEn:
        'A single impossibly huge fish scale standing like a monolith in the surf, water cascading off iridescent surface, storm horizon. Mythic object, not a humanoid.',
    },
  ],

  alien: [
    {
      name: 'Hex-Meteor',
      cls: 'Colmena caída',
      quote: '«Trajimos geometría hambrienta.»',
      formato: 'Estructura xeno',
      subjectEn:
        'A meteorite crater with perfect hexagonal hive tunnels glowing violet, small winged not-insect aliens optional as specks. Geometry-first horror-beauty, no human.',
    },
    {
      name: 'Coral Silícico',
      cls: 'Cerebro de cristal',
      quote: '«Pensamos en frío.»',
      formato: 'Crecimiento mineral',
      subjectEn:
        'Brain-shaped silicate coral growth on alien shore, faceted like quartz, inner pink light veins. Organic crystal, unsettling, zero humanoids.',
    },
    {
      name: 'Jardín Plasma',
      cls: 'Zarcillos vivos',
      quote: '«Regamos con rayos suaves.»',
      formato: 'Plantas de energía',
      subjectEn:
        'Floating garden of magenta plasma tendrils rooted in floating soil clumps, gentle arcs between buds. Sci-fantasy flora, not a person.',
    },
    {
      name: 'Coro de Obeliscos',
      cls: 'Piedras que cantan',
      quote: '«Vibramos la atmósfera.»',
      formato: 'Monumentos alienígenas',
      subjectEn:
        'Circle of slim black obelisks on cracked lilac ground, visible sound-wave distortions in air, dust rings. Mysterious tech-organic, no faces.',
    },
    {
      name: 'Anillo Fúngico',
      cls: 'Planetoide podrido',
      quote: '«Orbitamos esporas.»',
      formato: 'Cuerpo celeste pequeño',
      subjectEn:
        'A small planetoid that is mostly giant mushroom cap rings and mycelium atmosphere, stars close. Whimsical cosmic, silhouette like Saturn made of fungus.',
    },
    {
      name: 'Calamar Criogénico',
      cls: 'Nube de tentáculos',
      quote: '«Helamos lo que tocamos.»',
      formato: 'Criatura etérea',
      subjectEn:
        'Translucent cryo-squid made of mist and ice crystals, tentacles dissolving into cloud, teal and white. Ethereal beast, not human-shaped.',
    },
    {
      name: 'Polilla Obsidiana',
      cls: 'Polvo de nebula',
      quote: '«Polvo de estrella en alas.»',
      formato: 'Insecto gigante',
      subjectEn:
        'Giant moth with obsidian shard wings dusted in star-like specks, eerie still pose on alien rock under twin moons. Insect idol shot.',
    },
    {
      name: 'Arbusto Gravedad',
      cls: 'Bayas que doblan luz',
      quote: '«Los fotones tropiezan aquí.»',
      formato: 'Planta anómala',
      subjectEn:
        'Bush of heavy glowing berries bending light into arcs around it, grass leaning inward. Physics-warp plant, comic-book science fantasy.',
    },
    {
      name: 'Jardín Singularidad',
      cls: 'Perla negra',
      quote: '«Todo inclina su cuello hacia mí.»',
      formato: 'Paisaje anómalo',
      subjectEn:
        'Alien garden where stems curve toward a floating black pearl “singularity”, subtle lensing distortion, flowers stretched. Cosmic horror-lite, still no human.',
    },
    {
      name: 'Costa de Lunas Gemelas',
      cls: 'Marea de rocas vivas',
      quote: '«Dos madres en el cielo.»',
      formato: 'Costa imposible',
      subjectEn:
        'Shoreline with two large moons, tide rocks that look like sleeping creatures, bioluminescent surf. Landscape as subject with subtle creature-shapes in stone.',
    },
  ],

  air: [
    {
      name: 'Polillas de Estática',
      cls: 'Enjambre eléctrico',
      quote: '«Polvo que pica.»',
      formato: 'Enjambre',
      subjectEn:
        'Thousands of pale moths leaving faint lightning dust trails in twilight sky, spiral formation. Insect weather, airy silvers and blues.',
    },
    {
      name: 'Corona de Granizo',
      cls: 'Anillo helado',
      quote: '«Llevamos el invierno en círculo.»',
      formato: 'Objeto flotante',
      subjectEn:
        'A hovering crown-like ring made of fused hailstones and ice crystals, inner glow, soft cloud pillow below. Jewelry-scale weather artifact.',
    },
    {
      name: 'Semilla de Tornado',
      cls: 'Ojo en espiral',
      quote: '«Donde miro, gira el mundo.»',
      formato: 'Fenómeno',
      subjectEn:
        'Tight tornado funnel with calm glowing eye, debris orbiting at safe painterly distance. Dynamic air elemental as place, not a wizard.',
    },
    {
      name: 'Serpiente Aurora',
      cls: 'Cinta de luz',
      quote: '«Nado sin agua.»',
      formato: 'Aurora con forma',
      subjectEn:
        'Northern lights shaped deliberately like a long thin sky serpent, stars through translucent body. Atmospheric creature illusion.',
    },
    {
      name: 'Viñedo Celeste',
      cls: 'Nubes entrenadas',
      quote: '«Podamos el viento.»',
      formato: 'Paisaje aéreo',
      subjectEn:
        'Impossible trellises high in sky with cloud vines clipped into geometric shapes, golden hour light. Whimsical aerial garden, no people.',
    },
    {
      name: 'Polilla de Escarcha',
      cls: 'Gigante nocturno',
      quote: '«Mis alas son ventisca.»',
      formato: 'Insecto',
      subjectEn:
        'Single huge moth with frost-pattern wings perched on a dead branch, moon behind, breath-like cold mist. Winter air totem.',
    },
    {
      name: 'Moretón Iris',
      cls: 'Nube herida',
      quote: '«Lluvia con arcoíris febril.»',
      formato: 'Nube anómala',
      subjectEn:
        'Storm cloud with a “bruise” of prismatic colors bleeding through dark gray, subtle rain curtain. Abstract weather portrait.',
    },
    {
      name: 'Diablillo de Máscaras',
      cls: 'Viento cargado',
      quote: '«Giramos recuerdos tallados.»',
      formato: 'Torbellino',
      subjectEn:
        'Dust devil lifting carved wooden masks in spiral, desert grit sparkle. Cultural objects + wind, no human figure visible.',
    },
    {
      name: 'Roble Partido',
      cls: 'Árbol relámpago',
      quote: '«La cicatriz canta.»',
      formato: 'Árbol heroico',
      subjectEn:
        'Ancient oak split down middle by lightning, inner wood glowing like filament, leaves lifting. Nature monument, storm aftermath.',
    },
    {
      name: 'Mural de Haboob',
      cls: 'Pared de arena',
      quote: '«Historias dentro del polvo.»',
      formato: 'Tormenta de arena',
      subjectEn:
        'Massive sand wall advancing, inside it faint luminous silhouettes of animals (wolf, bird, snake) like embedded fossils. Epic weather.',
    },
  ],

  fire: [
    {
      name: 'Salamandras de Brasas',
      cls: 'Colonias ígneas',
      quote: '«Pequeñas llamas con patas.»',
      formato: 'Reptiles menores',
      subjectEn:
        'Cluster of cute salamanders made of glowing coal and ember skin on ash ground, sparks. Animal charm, not a fire knight.',
    },
    {
      name: 'Dragón de Fuelle',
      cls: 'Bestia de fragua',
      quote: '«Soplo y nace el filo.»',
      formato: 'Bestia herrera',
      subjectEn:
        'Stocky forge beast: leather bellows body, brass plates, mouth blowing focused flame onto an anvil — face is snout not human. Workshop guardian animal.',
    },
    {
      name: 'Medusas Magma',
      cls: 'Flotadores de calor',
      quote: '«Subimos como burbujas rojas.»',
      formato: 'Criaturas gelatinosas',
      subjectEn:
        'Jellyfish-like creatures of molten glass and dark crust, rising from lava crack, heat shimmer. Alien fire life.',
    },
    {
      name: 'Candelabro Volcánico',
      cls: 'Goteo de piedra líquida',
      quote: '«Lujo peligroso.»',
      formato: 'Objeto volcánico',
      subjectEn:
        'Chandelier formed from cooling lava drips frozen in time, hanging over obsidian floor, pockets of fire inside. Still-life epic.',
    },
    {
      name: 'Árbol Hueco Solar',
      cls: 'Fuego perpetuo',
      quote: '«El tronco es ventana al sol.»',
      formato: 'Árbol ardiente',
      subjectEn:
        'Hollow dead tree trunk with eternal flame tornado gently spinning inside the cavity, ember leaves drifting. Mythic nature-fire.',
    },
    {
      name: 'Espiral de Chispas',
      cls: 'Polillas de ceniza',
      quote: '«Danza corta, brillo largo.»',
      formato: 'Enjambre ígneo',
      subjectEn:
        'Spiral of ash moths leaving bright trails in night, ember bokeh. Insect fire ballet, no humanoid center.',
    },
    {
      name: 'Zorro de Ceniza',
      cls: 'Tres colas de brasa',
      quote: '«Corro y dejo mapas ardientes.»',
      formato: 'Bestia mítica',
      subjectEn:
        'Fox creature with three tails like smoke plumes tipped in hot coals, running across cracked basalt. Kitsune-adjacent but clearly beast.',
    },
    {
      name: 'Gusano de Tubo Lava',
      cls: 'Coloso tubular',
      quote: '«Horado el mundo por dentro.»',
      formato: 'Gusano gigante',
      subjectEn:
        'Colossal lava tube worm segmented with cooling rock rings, mouth a glowing circular furnace, tunnel background. Monster worm portrait.',
    },
    {
      name: 'León de Mancha Solar',
      cls: 'Bestia de llamarada',
      quote: '«Rujo y sube la temperatura.»',
      formato: 'Bestia solar',
      subjectEn:
        'Lion silhouette built from solar flare ribbons and burning mane, eyes white-hot. Elemental beast god, not armored human.',
    },
    {
      name: 'Titán de Caldera',
      cls: 'Gólem fundido',
      quote: '«Cada paso es nuevo lago.»',
      formato: 'Gólem de lava',
      subjectEn:
        'Hunched lava golem with cooling crust plates and molten seams, volcanic caldera backdrop, heat lightning. Broad shoulders but no human face — featureless magma helm or beast snout.',
    },
  ],

  earth: [
    {
      name: 'Columnas Abeja',
      cls: 'Basalto y enjambre',
      quote: '«Hexágonos y zumbido.»',
      formato: 'Formación rocosa',
      subjectEn:
        'Hexagonal basalt columns with golden bioluminescent bees streaming between pillars, dusk light. Geometry + insect life.',
    },
    {
      name: 'Madriguera Terracota',
      cls: 'Túneles de arcilla',
      quote: '«Conejos de barro.»',
      formato: 'Corte transversal',
      subjectEn:
        'Cross-section cutaway of clay hill showing rabbit warren tunnels lined with terracotta bricks, tiny ceramic rabbits. Whimsical earth architecture.',
    },
    {
      name: 'Ámbar Araña',
      cls: 'Gota fósil',
      quote: '«Atrapada en miel de tiempo.»',
      formato: 'Objeto fósil',
      subjectEn:
        'Huge translucent amber drop with prehistoric spider inside, backlit gold, bark texture behind. Macro treasure.',
    },
    {
      name: 'Ojo Salino',
      cls: 'Espejo del cielo',
      quote: '«El desierto parpadea.»',
      formato: 'Salinas',
      subjectEn:
        'Salt flat reflecting sky but distorted into iris rings like a giant eye, subtle figure-eight horizon. Surreal landscape portrait.',
    },
    {
      name: 'Boca Geoda',
      cls: 'Cueva cristalina',
      quote: '«Dientes de cuarzo.»',
      formato: 'Cueva',
      subjectEn:
        'Cave entrance framed like a mouth of purple amethyst “teeth”, glowing crystals inside throat darkness. Earth dragon mouth without dragon body.',
    },
    {
      name: 'Rebaño de Rolas',
      cls: 'Rocas con musgo',
      quote: '«Pastamos lentitud.»',
      formato: 'Rocas animadas',
      subjectEn:
        'Mossy round boulders on a slope with trails like sheep paths, one boulder mid-roll kicking dust. Gentle earth spirits implied by motion, not human.',
    },
    {
      name: 'Fragmento Moai',
      cls: 'Cabeza de piedra',
      quote: '«Medio rostro, memoria entera.»',
      formato: 'Estatua rota',
      subjectEn:
        'Giant weathered stone head half buried in river mud, vines on cheek, water lapping. Monument fragment, not a living character.',
    },
    {
      name: 'Catedral de Hormigas',
      cls: 'Torres de cuarzo',
      quote: '«Granito en grano.»',
      formato: 'Insectos constructores',
      subjectEn:
        'Ants building spires from stacked quartz shards at desert edge, some towers already shin-high to viewer macro. Industrious wonder.',
    },
    {
      name: 'Setas de Hierro',
      cls: 'Óxido y vida',
      quote: '«Comemos clavos viejos.»',
      formato: 'Hongos',
      subjectEn:
        'Massive rust-colored bracket fungi growing from iron cliff scrap, oil-slick sheen, orange spores. Industrial nature fusion.',
    },
    {
      name: 'Caparazón Continental',
      cls: 'Colinas curvas',
      quote: '«El mundo es escudo viejo.»',
      formato: 'Paisaje textura',
      subjectEn:
        'Rolling hills that read as overlapping turtle shell scutes, grass in seams, distant mist. Landscape-as-creature pattern.',
    },
  ],

  metal: [
    {
      name: 'Escarabajo Latón',
      cls: 'Engranaje vivo',
      quote: '«Cada placa es rezo.»',
      formato: 'Insecto mecánico',
      subjectEn:
        'Large brass scarab with visible gear segments, steam hiss from joints, ruby eyes. Steampunk jewel bug, hero macro.',
    },
    {
      name: 'Pájaros de Cobre',
      cls: 'Autómatas menores',
      quote: '«Volamos con tic-tac.»',
      formato: 'Mini robots',
      subjectEn:
        'Flock of small copper leaf-shaped automatons with bird silhouettes, perched on iron branch, delicate clockwork. Cute mechanical wildlife.',
    },
    {
      name: 'Serpiente Eslabón',
      cls: 'Cadena consciente',
      quote: '«Aprieto sin prisa.»',
      formato: 'Bestia metal',
      subjectEn:
        'Serpent made of interlocking chainmail rings and razor scales, coiled around a rusty anchor, tongue a strip of heated steel.',
    },
    {
      name: 'Tortuga Yunque',
      cls: 'Bestia forjada',
      quote: '«Llevo el golpe en el lomo.»',
      formato: 'Bestia objeto',
      subjectEn:
        'Tortoise whose shell is a blacksmith anvil with hammer resting on it, legs iron plates, sparks when it moves. Hybrid creature-tool.',
    },
    {
      name: 'Charco Mercurio',
      cls: 'Hoja líquida',
      quote: '«Reflejo que corta.»',
      formato: 'Metal líquido',
      subjectEn:
        'Pool of liquid mercury slowly rising into a hovering blade shape, mirror reflections distorted, cool silver palette. Abstract metal spirit.',
    },
    {
      name: 'Bosque de Clavos',
      cls: 'Catedral chatarra',
      quote: '«Oramos oxidación.»',
      formato: 'Chatarra monumental',
      subjectEn:
        'Forest of giant rusted nails driven upward like stalagmites, fog, crow silhouettes optional. Post-industrial fantasy shrine, no human.',
    },
    {
      name: 'Almeja Navaja',
      cls: 'Concha de acero',
      quote: '«Abrir es peligro.»',
      formato: 'Bivalvo metálico',
      subjectEn:
        'Giant steel razor clam half open, pearl inside is a ball bearing reflecting firefly LEDs. Still-life metal shell.',
    },
    {
      name: 'Cangrejo Muelle',
      cls: 'Mecanismo pinza',
      quote: '«Salto y aprieto.»',
      formato: 'Crustáceo mecánico',
      subjectEn:
        'Crab built from copper springs, cog claws, glass dome eyes with gears inside, on wet factory floor. Mechanical crustacean.',
    },
    {
      name: 'Lobo Damasco',
      cls: 'Estatua filigrana',
      quote: '«Cada pelo es patrón.»',
      formato: 'Escultura',
      subjectEn:
        'Wolf statue of folded damascus steel patterns, edge glow along muscle lines, museum pedestal optional. Metal art creature.',
    },
    {
      name: 'Núcleo Anillo',
      cls: 'Gólem orbital',
      quote: '«Cuchillas me orbitan.»',
      formato: 'Gólem abstracto',
      subjectEn:
        'Central armored core sphere with several floating sword-blades orbiting like rings, violet energy. Sci-fantasy construct, no human face.',
    },
  ],

  love: [
    {
      name: 'Zorros del Lazo',
      cls: 'Pareja de bosque',
      quote: '«Compartimos bufanda y huida.»',
      formato: 'Animales',
      subjectEn:
        'Two red foxes with shared knitted scarf knot between them, snow softly falling, warm eyes. Emotional animals, zero humans.',
    },
    {
      name: 'Nido Corazón',
      cls: 'Cuna de ramas',
      quote: '«Latimos en huevo.»',
      formato: 'Nido simbólico',
      subjectEn:
        'Heart-shaped nest woven from twigs with three speckled eggs glowing faintly inside, morning light. Gentle symbol of care.',
    },
    {
      name: 'Hilo Entre Robles',
      cls: 'Vínculo visible',
      quote: '«Dos troncos, un suspiro.»',
      formato: 'Bosque encantado',
      subjectEn:
        'Two ancient oaks with crimson thread woven taut between trunks like a bridge, fireflies along the string. Romantic landscape magic.',
    },
    {
      name: 'Cisnes de Arco',
      cls: 'Pareja acuática',
      quote: '«Nuestros cuellos dibujan puerta.»',
      formato: 'Aves',
      subjectEn:
        'Two swans on mirror lake forming almost a heart with necks, sunset ripples. Classic nature love image, painterly.',
    },
    {
      name: 'Puerta Rosa',
      cls: 'Ruina cubierta',
      quote: '«El amor también es muro roto.»',
      formato: 'Arquitectura floral',
      subjectEn:
        'Stone chapel arch completely swallowed by climbing roses, bell visible above, petals falling. Romantic ruin, no wedding people.',
    },
    {
      name: 'Elefantes Luna',
      cls: 'Familia de tacto',
      quote: '«Nuestras trompas se saludan.»',
      formato: 'Animales',
      subjectEn:
        'Adult elephant and calf touching trunks under huge moon, savanna grass silver, dust motes. Tender animal portrait.',
    },
    {
      name: 'Barco Farol',
      cls: 'Papel y luz',
      quote: '«Dos asientos, un río.»',
      formato: 'Objeto romántico',
      subjectEn:
        'Tiny paper lantern boat with two candle hearts inside drifting on canal, reflections, old stone bridge blur. Object story, implied couple without showing humans.',
    },
    {
      name: 'Granada Estrella',
      cls: 'Fruta de promesa',
      quote: '«Cada semilla es voto.»',
      formato: 'Bodegón mágico',
      subjectEn:
        'Split pomegranate on marble with seeds like tiny glowing rubies arranged in spiral, soft rose light. Still-life symbol.',
    },
    {
      name: 'Anillos del Roble',
      cls: 'Tiempo crecido',
      quote: '«La corteza absorbió el juramento.»',
      formato: 'Árbol + objeto',
      subjectEn:
        'Old oak bark grown around two wedding rings embedded in wood, moss, fairy light specks. Time-love metaphor, no faces.',
    },
    {
      name: 'Aurora Cordial',
      cls: 'Cielo emocional',
      quote: '«El horizonte nos abraza.»',
      formato: 'Cielo',
      subjectEn:
        'Night sky aurora shaped subtly like two overlapping hearts, stars glitter, lake reflection. Skyscape emotion, abstract.',
    },
  ],

  energy: [
    {
      name: 'Margaritas Tesla',
      cls: 'Flores de bobina',
      quote: '«Pétalos que zumban.»',
      formato: 'Plantas eléctricas',
      subjectEn:
        'Meadow where daisy centers are tiny Tesla coils with safe cute arcs, green stems, stormcloud far away. Whimsical electric nature.',
    },
    {
      name: 'Escarabajos Pila',
      cls: 'Enjambre cargado',
      quote: '«Brillamos con porcentaje.»',
      formato: 'Insectos',
      subjectEn:
        'Beetles with glowing battery-shell backs marching in circuit-board patterns on concrete, neon trails. Tech-insect swarm.',
    },
    {
      name: 'Anguila Neón',
      cls: 'Cable vivo',
      quote: '«Nado en línea recta imposible.»',
      formato: 'Pez eléctrico',
      subjectEn:
        'Glowing neon eel weaving through suspended power lines like abstract sculpture, sparks, cyberpunk palette but fantasy tone.',
    },
    {
      name: 'Rebaño Relámpago',
      cls: 'Esferas errantes',
      quote: '«Pastoreamos el cielo.»',
      formato: 'Fenómeno',
      subjectEn:
        'Herd of ball lightning spheres bouncing across salt flat leaving forked afterimages, violet and yellow. Weather-energy creatures.',
    },
    {
      name: 'Hongo Condensador',
      cls: 'Seta de circuito',
      quote: '«Guardo el golpe para después.»',
      formato: 'Hongo tech',
      subjectEn:
        'Giant mushroom cap patterned like circuit traces, LED veins, roots into old server junk pile. Biotech still-life.',
    },
    {
      name: 'Flor Parabólica',
      cls: 'Antena orgánica',
      quote: '«Escuchamos estrellas baratas.»',
      formato: 'Planta antena',
      subjectEn:
        'Flower like satellite dish petal array rotating slightly, hummingbirds as static sparks optional. Garden sci-fantasy.',
    },
    {
      name: 'Medusa Soldadura',
      cls: 'Chispas gelatinosas',
      quote: '«Abrazo corto, marca larga.»',
      formato: 'Medusa industrial',
      subjectEn:
        'Jellyfish of molten sparks and wire tentacles in dark workshop, welding flicker light. Industrial magic beast.',
    },
    {
      name: 'Colibrí Tormenta',
      cls: 'Ave de voltaje',
      quote: '«Bato alas y hay trueno.»',
      formato: 'Ave eléctrica',
      subjectEn:
        'Hummingbird with feathers like blue lightning bolts, motion blur rings, storm cloud backdrop. Small epic creature.',
    },
    {
      name: 'Ciervo Bobina',
      cls: 'Esqueleto magnético',
      quote: '«Mis astas son espirales.»',
      formato: 'Bestia robótica',
      subjectEn:
        'Deer silhouette formed from copper coils and glass insulators, arcs between antler tines, dark lab background. Construct animal.',
    },
    {
      name: 'Semilla Dyson',
      cls: 'Fractal energético',
      quote: '«Crecemos hacia el sol dos veces.»',
      formato: 'Objeto fractal',
      subjectEn:
        'Floating fractal seed-shell with micro ring segments harvesting light, golden rays bending inward. Cosmic energy artifact.',
    },
  ],

  light: [
    {
      name: 'Caracol Prisma',
      cls: 'Molusco arcoíris',
      quote: '«Lento pero espectro.»',
      formato: 'Animal luz',
      subjectEn:
        'Giant snail shell made of faceted prism glass, slow rainbow caustics on moss rock. Crystal mollusk still-life.',
    },
    {
      name: 'Escarabajos Espejo',
      cls: 'Enjambre brillante',
      quote: '«Reflejamos todo menos miedo.»',
      formato: 'Insectos',
      subjectEn:
        'Swarm of mirror beetles exploding into glitter cloud, sunbeam, each beetle a tiny sharp reflection. Dazzling insect burst.',
    },
    {
      name: 'Polilla Halo',
      cls: 'Gigante sagrada',
      quote: '«Mi cabeza es anillo de luz.»',
      formato: 'Insecto luz',
      subjectEn:
        'Huge moth with circular halo through its head pattern (negative space trick), stained-glass wing eyes, cathedral window light.',
    },
    {
      name: 'Mariposa Vitral',
      cls: 'Fragmentos sagrados',
      quote: '«Vuelo con pedazos de iglesia.»',
      formato: 'Mariposa cristal',
      subjectEn:
        'Butterfly wings of broken stained glass held together by gold foil, flying through ruined nave sunbeams. Object-creature beauty.',
    },
    {
      name: 'Ramo Lente',
      cls: 'Flores de flare',
      quote: '«Pétalos queman suave.»',
      formato: 'Flores luz',
      subjectEn:
        'Bouquet where petals are soft lens-flare shapes and thin glass, stems chrome, pastel bloom. Abstract light flora.',
    },
    {
      name: 'Catedral Cera',
      cls: 'Velas monumentales',
      quote: '«Goteamos oración caliente.»',
      formato: 'Cera y llama',
      subjectEn:
        'Forest of giant melting candles forming column shapes, warm glow, wax rivers. Indoor temple mood without people.',
    },
    {
      name: 'Pez Abismo Dulce',
      cls: 'Señuelo corazón',
      quote: '«Traigo luz a quien me mira.»',
      formato: 'Pez profundo',
      subjectEn:
        'Deep-sea anglerfish but adorable, lure is glowing heart silhouette, soft pink biolum on black water. Light in darkness metaphor.',
    },
    {
      name: 'Vela Solar',
      cls: 'Semilla de vela',
      quote: '«Navego fotones.»',
      formato: 'Planta nave',
      subjectEn:
        'Seed pod that opens into golden solar sail membranes, floating on clear sky gradient, minimalist epic. Plant spaceship.',
    },
    {
      name: 'Ojo de Tormenta',
      cls: 'Claridad circular',
      quote: '«En el centro todo es quieto.»',
      formato: 'Cielo',
      subjectEn:
        'Storm with perfect round eye of clear golden sunlight, clouds like dark petals around calm center. Sky mandala.',
    },
    {
      name: 'Ciervo Cuarzo',
      cls: 'Hueso de luz',
      quote: '«Transparente por dentro.»',
      formato: 'Bestia cristal',
      subjectEn:
        'Deer made of translucent quartz with inner filament glow, antlers like branching fiber optics, mist forest. Crystal beast finale.',
    },
  ],
};
